from tastypie import fields
from tastypie.authorization import DjangoAuthorization
from tastypie.constants import ALL, ALL_WITH_RELATIONS
from tastypie.exceptions import Unauthorized
from tastypie.resources import ModelResource
from django_images.models import Thumbnail

from .models import Pin, Image, PinComment
from ..users.models import User
from django.contrib.comments.models import Comment
from main.models.userbuild_models import SavedLists, Workbook

class PinryAuthorization(DjangoAuthorization):
    """
    Pinry-specific Authorization backend with object-level permission checking.
    """
    def update_detail(self, object_list, bundle):
        klass = self.base_checks(bundle.request, bundle.obj.__class__)

        if klass is False:
	    print("pinry authorization 1")
            raise Unauthorized("You are not allowed to access that resource.")

        permission = '%s.change_%s' % (klass._meta.app_label, klass._meta.module_name)
        
        if not bundle.request.user.has_perm(permission, bundle.obj):
	    print("pinry authorization 2") 
            raise Unauthorized("You are not allowed to access that resource.")

        return True

    def delete_detail(self, object_list, bundle):
        klass = self.base_checks(bundle.request, bundle.obj.__class__)

        if klass is False:
            raise Unauthorized("You are not allowed to access that resource.")

        permission = '%s.delete_%s' % (klass._meta.app_label, klass._meta.module_name)

        if not bundle.request.user.has_perm(permission, bundle.obj):
            raise Unauthorized("You are not allowed to access that resource.")

        return True


class UserResource(ModelResource):
    print(" userresource")
    gravatar = fields.CharField(readonly=True)

    print("userresource")
    def dehydrate_gravatar(self, bundle):
        return bundle.obj.gravatar

    class Meta:
        list_allowed_methods = ['get']
        filtering = {
            'username': ALL
        }
        queryset = User.objects.all()
        resource_name = 'user'
        fields = ['username']
        include_resource_uri = False
      


def filter_generator_for(size):
    def wrapped_func(bundle, **kwargs):
        return bundle.obj.get_by_size(size)
    return wrapped_func


class ThumbnailResource(ModelResource):
    class Meta:
        list_allowed_methods = ['get']
        fields = ['image', 'width', 'height']
        queryset = Thumbnail.objects.all()
        resource_name = 'thumbnail'
        include_resource_uri = False

class CommentResource(ModelResource):
    class Meta:
        list_allowed_methods = ['get']
        fields = ['comment','user_name','submit_date']
        queryset = Comment.objects.all()
        resource_name = 'comment'
        include_resource_uri = False


class ImageResource(ModelResource):
    standard = fields.ToOneField(ThumbnailResource, full=True,
                                 attribute=lambda bundle: filter_generator_for('standard')(bundle))
    thumbnail = fields.ToOneField(ThumbnailResource, full=True,
                                  attribute=lambda bundle: filter_generator_for('thumbnail')(bundle))
    square = fields.ToOneField(ThumbnailResource, full=True,
                               attribute=lambda bundle: filter_generator_for('square')(bundle))

    class Meta:
        fields = ['image', 'width', 'height']
        include_resource_uri = False
        resource_name = 'image'
        queryset = Image.objects.all()
        authorization = DjangoAuthorization()

# pin submit method
class PinResource(ModelResource):
    print("*** inside api.py PinResource ***")
    submitter = fields.ToOneField(UserResource, 'submitter', full=True)
    image = fields.ToOneField(ImageResource, 'image', full=True)
    tags = fields.ListField()
    comments = fields.ToManyField(CommentResource, lambda bundle: Comment.objects.filter(object_pk=bundle.obj.id), full=True, null=True)
    def hydrate_image(self, bundle):
	print("*** inside api.py hydrate_image")
        url = bundle.data.get('url', None)
        if url:
            image = Image.objects.create_for_url(url)
            bundle.data['image'] = '/app/api/v1/image/{}/'.format(image.pk)
        return bundle

    def hydrate(self, bundle):
        print("*** inside api.py hydrate ***")
        """Run some early/generic processing

        Make sure that user is authorized to create Pins first, before
        we hydrate the Image resource, creating the Image object in process
        """
        submitter = bundle.data.get('submitter', None)
	print(submitter)
        if not submitter:
            bundle.data['submitter'] = '/app/api/v1/user/{}/'.format(bundle.request.user.pk)
        else:
            if not '/app/api/v1/user/{}/'.format(bundle.request.user.pk) == submitter:
                raise Unauthorized("You are not authorized to create Pins for other users")
        return bundle

    def dehydrate_tags(self, bundle):
        return map(str, bundle.obj.tags.all())

   

    def build_filters(self, filters=None):
        orm_filters = super(PinResource, self).build_filters(filters)
        if filters and 'tag' in filters:
            orm_filters['tags__name__in'] = filters['tag'].split(',')
        return orm_filters

    def save_m2m(self, bundle):
        tags = bundle.data.get('tags', None)
        if tags:
            bundle.obj.tags.set(*tags)
        return super(PinResource, self).save_m2m(bundle)

    class Meta:
        fields = ['id', 'url', 'origin', 'description','published']
        ordering = ['id']
        filtering = {
            'submitter': ALL_WITH_RELATIONS
        }
        queryset = Pin.objects.all()
        resource_name = 'pin'
        include_resource_uri = False
        always_return_data = True
        authorization = PinryAuthorization()



class SavedListResource(ModelResource):
    user_id = fields.IntegerField('user_id')
    class Meta:
        fields = ['id', 'list_name', 'list_desc', 'list_data_url']
        ordering = ['id']
        filtering = {
            'user_id': ALL
        }
        queryset = SavedLists.objects.all()
        resource_name = 'savedlist'
        include_resource_uri = False
        always_return_data = True

class WorkBookListResource(ModelResource):
    user_id = fields.IntegerField('user_id')
    class Meta:
        fields = ['id', 'workbook_name', 'workbook_url']
        ordering = ['id']
        filtering = {
            'user_id': ALL
        }
        queryset = Workbook.objects.all()
        resource_name = 'workbooklist'
        include_resource_uri = False
        always_return_data = True
