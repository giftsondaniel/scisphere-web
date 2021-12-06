from django.http import HttpResponseRedirect, HttpResponse
from django.conf import settings
from django.core.urlresolvers import reverse
from django.views.generic import CreateView
from django_images.models import Image as DjangoImage


from braces.views import JSONResponseMixin, LoginRequiredMixin
from django_images.models import Thumbnail

from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.template.context import RequestContext

from .forms import ImageForm
import urllib
import re

from io import BytesIO
from django.utils.importlib import import_module
from django_images import utils
from django_images.settings import IMAGE_SIZES, IMAGE_PATH
from PIL import ImageColor,Image
from cStringIO import StringIO
from django.core.files.uploadedfile import SimpleUploadedFile, InMemoryUploadedFile
import os.path
from uuid import uuid4 as uuid
from taggit.managers import TaggableManager

import psycopg2
#import MySQLdb
#import _mysql
import sys,json
from django import http
from django.views.decorators.http import require_POST, require_GET
from django.template.loader import render_to_string
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import models
from django.utils.html import escape
from django.contrib.contenttypes.models import ContentType
from .models import Pin
from django.shortcuts import render_to_response, get_object_or_404
from django.shortcuts import redirect
from main.models.userbuild_models import SavedLists
#from django.core.urlresolvers import reverse
#from django.views.generic import DateDetailView
#from simple.articles.models import Article


# save pin from upload image.
class CreateImage(JSONResponseMixin, LoginRequiredMixin, CreateView):
    template_name = None  # JavaScript-only view
    model = Image
    form_class = ImageForm
    def get(self, request, *args, **kwargs):
        if not request.is_ajax():
            return HttpResponseRedirect(reverse('core:recent-pins'))
        return super(CreateImage, self).get(request, *args, **kwargs)

    def form_valid(self, form):
        image = form.save()
        for size in settings.IMAGE_SIZES.keys():
            Thumbnail.objects.get_or_create_at_size(image.pk, size)
        return self.render_json_response({
            'success': {
                'id': image.id
            }
        })

    def form_invalid(self, form):
        return self.render_json_response({'error': form.errors})


def getdata(request):
    print("*** getdata ***")
    image=request.GET['image']
    desc=request.GET['description']
    tags=request.GET['tags']
    print(image)
    print(desc)
    print(tags)

    imgstr = re.search(r'base64,(.*)', image).group(1)
    output = open('output1.png', 'wb')
    output.write(imgstr.decode('base64'))
    output.close()

    context = RequestContext(request)
    print(" ********** pins.html")
    # for any other user -> profile
    return render_to_response("pins.html", context_instance=context)


def saved_list_view(request,id):
    try:
       savedList = SavedLists.objects.filter(id = id)
       url = None
       if len(savedList)>0:
          url = savedList[0].list_data_url
       return HttpResponseRedirect(url)
    except Exception as e:
       print "Exception inside pinry views.py in saved list view %s" %e
       return HttpResponseRedirect(url)


@require_POST
def post_image_pins(request):
    print(" post_image_pins ")
    imgData = json.loads(request.body)
    try:
       #url=request.POST['image']
       #desc=request.POST['description']
       #tags=request.POST['tags']
       #height = request.POST['height']
       #width = request.POST['width']
       url=imgData['image']
       desc=imgData['description']
       tags=imgData['tags']
       height = imgData['height']
       width = imgData['width']
       ##pathName = request.POST['pathName']
       userid = request.user.id
       username = request.user.username
       #Random number generation
       randomRef = uuid().hex 
       imgstr = re.search(r'base64,(.*)', url).group(1)
       imagepath='pinimages/1/'+randomRef+'.png'
       output = open(settings.MEDIA_PATH+'/'+imagepath, 'wb')
       output.write(imgstr.decode('base64'))
       output.close()
       con = None
       imgid = 0
       pinid = 0
 
       try:
       	  #con = MySQLdb.connect(host='198.199.87.81',user='v4alpha', passwd='v3beta', db='v4release')
          #con = MySQLdb.connect(user='root', passwd='root', db='v2_b')
          con = psycopg2.connect(host=settings.DATABASES['default']['HOST'],user=settings.DATABASES['default']['USER'], password=settings.DATABASES['default']['PASSWORD'], database=settings.DATABASES['default']['NAME'])
    	  cursor = con.cursor()
    	  val=(imagepath,height,width)
    	  sqlquery="INSERT INTO django_images_image(image,height,width) VALUES(%s,%s,%s) RETURNING id"
    	  #sqlquery="INSERT INTO django_images_image(image,height,width) VALUES(%s,%s,%s)"
    	  cursor.execute(sqlquery, val)
          imgid = cursor.fetchone()[0]
          #imgid = cursor.lastrowid
    	  con.commit()
       except psycopg2.DatabaseError, e:
       #except MySQLdb.DatabaseError, e:
    	  if con:
		con.rollback()
    	  print 'Error %s' % e    
    	  sys.exit(1)
       #finally:
    	  #if con:
		#con.close()
       #con = MySQLdb.connect(user='map70', passwd='map70', db='map70')
       for size in settings.IMAGE_SIZES.keys():
	    THUMBNAIL_SIZE = (50, 50)
	    image = Image.open(settings.MEDIA_PATH+'/'+imagepath)
	    if image.mode not in ("L", "RGB"):
	        image = image.convert("RGB")
            if size == 'square':
	    	image.thumbnail((125,125), Image.ANTIALIAS)
                width = image.size[0]
                height = image.size[1]
	    elif size == 'thumbnail':
	    	image.thumbnail((240,240), Image.ANTIALIAS)
                width = image.size[0]
                height = image.size[1]
	    elif size == 'standard':
	    	image.thumbnail((600,600), Image.ANTIALIAS)
                width = image.size[0]
                height = image.size[1]

	    thumpath='thum/1/'+randomRef+'_'+size+'.png'
            image.save(settings.MEDIA_PATH+'/'+thumpath, 'PNG', quality=95)
	    #DB
    	    cursor = con.cursor()
    	    val=(imgid,thumpath,size,height,width)
    	    sqlquery="INSERT INTO django_images_thumbnail(original_id,image,size,height,width) VALUES(%s,%s,%s,%s,%s)"
    	    cursor.execute(sqlquery, val)
    	    con.commit()
    
       val=(userid,desc,imgid)
       sqlquery1="INSERT INTO core_pin(submitter_id,url,origin,description,image_id,published,comment_id) VALUES(%s,NULL,NULL,%s,%s,CURRENT_TIMESTAMP,NULL) RETURNING id"
       #sqlquery1="INSERT INTO core_pin(submitter_id,url,origin,description,image_id,published,comment_id) VALUES(%s,NULL,NULL,%s,%s,CURRENT_TIMESTAMP,NULL)"
       cursor.execute(sqlquery1, val)
       pinid = cursor.fetchone()[0]
       #pinid = cursor.lastrowid
       con.commit()
       tagid = 0
       cursor = con.cursor()
       cursor.execute(""" select id from taggit_tag where name='"""+tags+"""'""")
       for row in cursor.fetchall():
          print(" for tagid ** ")   
    	  tagid = row[0]

       if tagid == 0:
    	  val = (tags,tags)
	  sqlquery2="INSERT INTO taggit_tag(name,slug) VALUES(%s,lower(%s)) RETURNING id"
	  #sqlquery2="INSERT INTO taggit_tag(name,slug) VALUES(%s,lower(%s))"
	  cursor.execute(sqlquery2, val)
          tagid = cursor.fetchone()[0]
          #tagid = cursor.lastrowid
	  con.commit()

       if tagid != 0:
          val = (tagid,pinid)
	  sqlquery2="INSERT INTO taggit_taggeditem(tag_id,object_id,content_type_id) VALUES(%s,%s,14)"
	  cursor.execute(sqlquery2, val)
	  con.commit()
 
       if con:
	  con.close()
      
       context = RequestContext(request)
       #return HttpResponse('success')
       return  HttpResponse(json.dumps({'responseText':'success'}))
    #else:
    except Exception as e:
       print "Exception inside post_image_pins :: %s" %e
       #return HttpResponse('failed')
       return  HttpResponse(json.dumps({'responseText':'failed'}))
            


@csrf_exempt
@require_POST
def pin_post_comment(request):
	print("*******pin comment ")
	pinid = request.POST['pin-id']
	comments = request.POST['pin-comment']
	userid = request.user.id
	username = request.user.username
	
	con = None
	try:
	    #con = MySQLdb.connect(host='198.199.87.81',user='v3alpha', passwd='v3beta', db='v3alpha')
            #con = MySQLdb.connect(user='root', passwd='root', db='v2_b')
	    #con = psycopg2.connect(database='scisphere', user='postgres') 
            con = psycopg2.connect(host=settings.DATABASES['default']['HOST'],user=settings.DATABASES['default']['USER'], password=settings.DATABASES['default']['PASSWORD'], database=settings.DATABASES['default']['NAME'])
	    cursor = con.cursor()
	    val=(pinid,userid,username,comments)
	    
	    sqlquery="INSERT INTO django_comments(content_type_id,object_pk,site_id,user_id,user_name,user_email,user_url,comment,submit_date,ip_address,is_public,is_removed) VALUES(21,%s,1, %s,%s,'','', %s,CURRENT_TIMESTAMP,'127.0.0.1',TRUE,FALSE)"
	    cursor.execute(sqlquery, val)
	    con.commit()

 	except psycopg2.DatabaseError, e:
	#except MySQLdb.DatabaseError, e:
	    if con:
		con.rollback()
	    
	    print 'Error %s' % e    
	    sys.exit(1)
	    
	finally:
	    if con:
		con.close()

	context = RequestContext(request)
	#return render_to_response("core/pins.html", context_instance=context)
	return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


