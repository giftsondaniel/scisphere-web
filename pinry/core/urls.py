from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from tastypie.api import Api

from .api import ImageResource, ThumbnailResource, PinResource, UserResource, CommentResource, SavedListResource, WorkBookListResource
from .feeds import LatestPins, LatestUserPins, LatestTagPins
from .views import CreateImage, getdata
#from pinry.core.views import ArticleDetailView
#from simple.articles.views import ArticleDetailView

v1_api = Api(api_name='v1')
v1_api.register(ImageResource())
v1_api.register(ThumbnailResource())
v1_api.register(PinResource())
v1_api.register(UserResource())
v1_api.register(CommentResource())
v1_api.register(SavedListResource())
v1_api.register(WorkBookListResource())

print(" **** pinry url1 ")
urlpatterns = patterns('',
    url(r'^app/api/', include(v1_api.urls, namespace='api')),
    
    url(r'app/feeds/latest-pins/tag/(?P<tag>(\w|-)+)/', LatestTagPins()),
    url(r'app/feeds/latest-pins/user/(?P<user>(\w|-)+)/', LatestUserPins()),
    url(r'app/feeds/latest-pins/', LatestPins()),

    url(r'^app/pins/pin-form/$', TemplateView.as_view(template_name='core/pin_form.html'),
        name='pin-form'),

    #url(r'^pins/create-image/$', 'pinry.views.create_image'),
    url(r'^app/pins/create-image/$', CreateImage.as_view(), name='create-image'),

    #url(r'^pins/tag/(?P<tag>(\w|-)+)/$', 'pinry.views.tag_pins'),
    url(r'^app/pins/tag/(?P<tag>(\w|-)+)/$', TemplateView.as_view(template_name='core/pins.html'),
        name='tag-pins'),

    #url(r'^pins/user/(?P<user>(\w|-)+)/$', 'pinry.views.userwise_pins'),
    url(r'^app/pins/user/(?P<user>(\w|-)+)/$', TemplateView.as_view(template_name='core/pins.html'),
        name='user-pins'),
    url(r'^(?P<pin>\d+)/$', 'pinry.views.recent_pins'),

    url(r'^(?P<pin>\d+)/$','pinry.views.recent_pins'),
    url(r'^app/mysphere$','pinry.views.recent_pins'),
    url(r'^app/pin_cmt_post/$','pinry.core.views.pin_post_comment', name="pin_cmt"),
    url(r'^app/post_image_pins/$','pinry.core.views.post_image_pins', name="insert_pins"),
    url(r'^app/savedimage$','pinry.views.savedimage'),
    url(r'^app/saved_list_view/(?P<id>[^/]+)$', 'pinry.core.views.saved_list_view'),
)
