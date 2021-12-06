from django.core.mail import send_mail, EmailMessage
import os
import urllib2
from django.http import HttpResponse
import json, ast
from django_rq import job

os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

@job('low')
def mail_urlshare(toaddress,subject,message,longUrl):
    ACCESS_TOKEN = "0d085228d8b7feeb498ccf136e852ff167204f58"
    url = 'https://api-ssl.bitly.com/v3/shorten?access_token='+ACCESS_TOKEN+'&longUrl='+longUrl
    serialized_data = urllib2.urlopen(url).read()
    #response = HttpResponse(serialized_data, content_type='text/plain')
    #response['Content-Length'] = len(serialized_data)
    data = json.loads(serialized_data)
    shorturl = data['data']['url']
    if toaddress and shorturl:
       try:
          email = EmailMessage(subject, message+" - "+shorturl, to=[toaddress])
          email.send()
       except Exception as e:
	  print e
          return HttpResponse('Invalid Form name.')
    else:
       return HttpResponse('Make sure fields are entered and valid.')
    return HttpResponse('success.')



