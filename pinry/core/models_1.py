import requests
from cStringIO import StringIO

from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models, transaction

from django_images.models import Image as BaseImage, Thumbnail
from taggit.managers import TaggableManager

from ..users.models import User


class ImageManager(models.Manager):
    # FIXME: Move this into an asynchronous task
    print("*** inside core.models.py ImageManager *")
    def create_for_url(self, url):
        print("* 1 *")
        file_name = url.split("/")[-1]
        print("* 2 *")
        buf = StringIO()
        print("* 3 *")
        response = requests.get(url)
        print("* 4 *")
        buf.write(response.content)
        print("* 5 *")
        obj = InMemoryUploadedFile(buf, 'image', file_name,
                                   None, buf.tell(), None)
	print(obj)
        # create the image and its thumbnails in one transaction, removing
        # a chance of getting Database into a inconsistent state when we
        # try to create thumbnails one by one later
        print("image create")
        print(obj)
        image = self.create(image=obj)
	print("image create")
	print(image)
        for size in settings.IMAGE_SIZES.keys():
	    print("*** inside image size ***")
            print(image.pk)
            Thumbnail.objects.get_or_create_at_size(image.pk, size)
	    print("*** inside image size ***")
	    print(image)
        return image


class Image(BaseImage):
    objects = ImageManager()

    class Meta:
        proxy = True


class Pin(models.Model):
    print("*** insode core.models.py Pin ***")
    submitter = models.ForeignKey(User)
    url = models.URLField(null=True)
    origin = models.URLField(null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ForeignKey(Image, related_name='pin')
    published = models.DateTimeField(auto_now_add=True)
    tags = TaggableManager()
    def __unicode__(self):
        print(self.url)
        return self.url

