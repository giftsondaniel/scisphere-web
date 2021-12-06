#!/usr/bin/env python3

#from datetime import datetime
import datetime
from django.contrib.contenttypes.models import ContentType
import os
import json, ast
from django import forms
from django.db import IntegrityError
from django.db.models import Count
from django.core.urlresolvers import reverse
from django.core.files.storage import default_storage, get_storage_class
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import HttpResponse, HttpResponseBadRequest, \
    HttpResponseRedirect, HttpResponseForbidden, HttpResponseNotFound,\
    HttpResponseServerError
from django.shortcuts import render_to_response, get_object_or_404, render
from django.template import loader, RequestContext
from django.utils import simplejson
from django.core import serializers
from django.utils.translation import ugettext as _
from django.views.decorators.http import require_GET, require_POST
from google_doc import GoogleDoc
from guardian.shortcuts import assign, remove_perm, get_users_with_perms

from main.forms import UserProfileForm, FormLicenseForm, DataLicenseForm,\
    SupportDocForm, QuickConverterFile, QuickConverterURL, QuickConverter,\
    SourceForm, PermissionForm, MediaForm, MapboxLayerForm, \
    ActivateSMSSupportFom, contactUsForm, inviteForm
from main.models import UserProfile


from stats.models import StatsCount
from stats.tasks import stat_log
from utils.decorators import is_owner
from utils.logger_tools import response_with_mimetype_and_name, publish_form
from utils.user_auth import check_and_set_user, set_profile_data,\
    has_permission, helper_auth_helper, get_xform_and_perms,\
    check_and_set_user_and_form
from utils.log import audit_log, Actions
#from main.models import AuditLog
from settings import ENKETO_PREVIEW_URL

from utils.viewer_tools import enketo_url
from utils.qrcode import generate_qrcode

from sms_support.tools import check_form_sms_compatibility, is_sms_related
from sms_support.autodoc import get_autodoc_for
from sms_support.providers import providers_doc

import urllib
import urllib2
import subprocess
from django.core.mail import send_mail, EmailMessage
from uuid import uuid4 as uuid
#import MySQLdb
import django.core.handlers.wsgi
#from django.views.decorators.csrf import csrf_protect, csrf_exempt
import requests
import mimetypes
#add
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId

import socket
import sys
import string
import time
import oauth2 as oauth
import urlparse
from urlparse import parse_qsl, urlparse
from django.core.urlresolvers import reverse
from doac.models import AuthorizationCode, Client, RedirectUri, Scope
import httplib, urllib
import re
from django_images.settings import IMAGE_SIZES, IMAGE_PATH
from django.conf import settings
from django_images.models import Image
from PIL import Image, ImageColor
from django.utils import timezone

#dani added
from main.models.userbuild_models import MySphere, MyBuild ,SavedLists,order,Workbook,UserTransaction
from main.models.subscription import Subscription,Dataset,Pricing,KeysTable
from main.models import SubDivision,Country,UserProfile
from main.models.explore_plus import Unit,Template,MyTemplate,Variable,VariableProduct,CustomerDatasetUpload,UploadLog,ModelMaster,UserModel,ModelJob
from organizations.models import Organization,OrganizationUser
import csv
from hashids import Hashids
import psycopg2
from bson import json_util
import difflib

#for Contact
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


#Import for Pandas
import pandas as pd
import numpy as np
import matplotlib
#matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy import stats


#import common.json

#from django_plans.plans.views import get_user_or_orgid

#added
#import MySQLdb
#from pymongo import Connection
#server="localhost"
#port = 27017
#Establish a connection with mongo instance.
#conn = Connection(server,port)

from django.template import loader, Context
#from rq import Connection, Queue
#from redis import Redis
#for Ip
from geoip import geolite2 #added
from ipware.ip import get_ip
from geoip import open_database
from rq.myjobs import *
import rq.myjobs as jobfile
from rq.mailjobs import *
import django_rq
from pymongo import MongoClient#,Connection
import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile
from pandas import DataFrame
import xlrd
import math

#currentUser=None


#Share html creation on render:
from django.template.loader import render_to_string


def home(request):
    if request.user.username:
        return HttpResponseRedirect(
            reverse(profile, kwargs={'username': request.user.username}))
    context = RequestContext(request)
    submission_count = StatsCount.stats.count(GLOBAL_SUBMISSION_STATS)
    if not submission_count:
        submission_count = Instance.objects.count()
        stat_log(GLOBAL_SUBMISSION_STATS, submission_count)
    context.num_forms = submission_count
    context.num_users = User.objects.count()
    context.num_shared_forms = XForm.objects.filter(shared__exact=1).count()
    return render_to_response('xp70.html', context_instance=context)


@login_required
def login_redirect(request):
    return HttpResponseRedirect(reverse(scisphere_home,
                                kwargs={'username': request.user.username}))


@login_required
def scisphere_home(request, username):
    context = RequestContext(request)
    #content_user = get_object_or_404(User, username=username)
    # for any other user -> profile
    set_profile_data(context, content_user)
    return render_to_response("region_explorer.html", context_instance=context)


@login_required
def region_explorer_old(request):
    context = RequestContext(request)
    username=request.user
    orgID = OrganizationUser.objects.get(user=request.user.id).organization_id
    context.orgID = orgID
    #content_user = get_object_or_404(User, username=username)
    return render_to_response("region_explorer.html", context_instance=context)

@login_required
def region_explorer(request):
    context = RequestContext(request)
    username=request.user
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    context.orgID = org_id
    customerDatasetList=None
    myTemplateList=None
    try:
       myTemplateList = MyTemplate.objects.filter(org_id=org_id).values('id','mytemplate_name').order_by('-id')
       customerDatasetList = CustomerDatasetUpload.objects.filter(org_id=org_id).values('mytemplate_id').order_by('-id')[:1]
    except Exception as e:
       print e
    templatename = None

    if len(customerDatasetList) > 0:   	
       for mytmplist in myTemplateList:
          if(customerDatasetList[0]['mytemplate_id'] == mytmplist['id']):
             templatename = mytmplist['mytemplate_name']	
    context.templatename = templatename
    subscriptionList = get_subscription_list(org_id)
    context.subscriptionList = subscriptionList
    context.domainName = settings.OAUTH_REDIRECT_IP
    #content_user = get_object_or_404(User, username=username)
    return render_to_response("region_explorer.html", context_instance=context)


@login_required
def filters_layers(request):
    context = RequestContext(request)
    username=request.user
    try:
       orgID = OrganizationUser.objects.get(user=request.user.id).organization_id
       myTemplateList = MyTemplate.objects.filter(org_id=orgID).values('id', 'org_id', 'mytemplate_name')
       #templateFormDateList = CustomerDatasetUpload.objects.filter(org_id=orgID).values( 'mytemplate_id', 'uploaded_date') 
       workBookList = Workbook.objects.filter(user_id = request.user.id).values('id', 'workbook_name', 'workbook_jsonlocation')
       tempArr = []	
       for details in myTemplateList:
          obj = {}
          obj['id'] = details['id']
          obj['org_id'] = details['org_id']
          obj['mytemplate_name'] = details['mytemplate_name']

          CustomerDatasetUploadDetails = CustomerDatasetUpload.objects.filter(mytemplate_id = details['id'], org_id=orgID).values( 'mytemplate_id', 'uploaded_date').order_by('-id')[:1]		
          for details1 in CustomerDatasetUploadDetails:
             obj['mytemplate_id'] = details1['mytemplate_id']	
             obj['uploaded_date'] = details1['uploaded_date']	
          tempArr.append(obj)	
	 
       context.orgID = orgID
       context.myTemplateForm = tempArr
       subscriptionList = get_subscription_list(orgID)
       context.subscriptionList = subscriptionList
       context.workBookData = workBookList
    except Exception as e:
       print "Exception Filters_layers :: %s" %e
    #content_user = get_object_or_404(User, username=username)
    return render_to_response("filters_layers.html", context_instance=context)


@login_required
def snapshot(request):
    context = RequestContext(request)
    username=request.user
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    subscriptionList = get_subscription_list(org_id)
    context.subscriptionList = subscriptionList
    #content_user = get_object_or_404(User, username=username)
    return render_to_response("snapshot.html", context_instance=context)


def contact(request):
    context = RequestContext(request) 	
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = contactUsForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            try:
		validate_email(form.cleaned_data['email'])
	    except forms.ValidationError:
		print 'error'
	    #print "form.yourname"
	    #print form.cleaned_data['email']
	    email = EmailMessage('Contact us form SciSphere', 
				'\nName :'+form.cleaned_data['yourname'].title()+
				',\n Mail :'+form.cleaned_data['email']+
				',\nPhone Number :'+form.cleaned_data['phonenum']+
				',\nMessage :'+form.cleaned_data['message'],
				'',['sales@scisphere.com'],['elango.sakthivel@scisphere.com'],'','','',['giftson.daniel@scisphere.com'])
            ##email.send()
	    #queue = django_rq.get_queue('low')
	    #queue.enqueue(send_mail1, email)

	    context.name = 'Thanks for contacting us.'#+form.cleaned_data['yourname'].title()	
	    return render_to_response("thankyou.html", context_instance=context)
	else:
	    return render(request, 'contact.html', {'form': form})
    # if a GET (or any other method) we'll create a blank form
    else:
        form = contactUsForm()
    return render(request, 'contact.html', {'form': form})


def invite(request):
    context = RequestContext(request) 	
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = inviteForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
	    country = "IN"
            state = "TN"
            try:
              ip = get_ip(request)
              db = open_database(settings.GEODB_PATH)
              match = db.lookup(ip)
              if match is not None:
                 country = match.country
                 if match.subdivisions:
                     state = match.subdivisions
                     state = list(state)[0]
            except Exception as e:
                print e 
                country = "IN"
                state = "TN"
            try:
		validate_email(form.cleaned_data['email'])
	    except forms.ValidationError:
		print 'error'

	    email = EmailMessage('SciSphere Invite', 
				'\n First Name :'+form.cleaned_data['first_name'].title()+
				',\n Last Name :'+form.cleaned_data['last_name'].title()+
				',\n Job Title :'+form.cleaned_data['job_title']+
				',\n Company :'+form.cleaned_data['company']+
				',\n Mail :'+form.cleaned_data['email']+
				',\n Sector :'+form.cleaned_data['sector']+
				',\n Country :'+country+
				',\n Level1 :'+state,
				'',['sales@scisphere.com'],['elango.sakthivel@scisphere.com'],'','','',['giftson.daniel@scisphere.com'])
	    ##email.send()
	    #queue = django_rq.get_queue('low')
	    #queue.enqueue(send_mail1, email)
	
	    context.name = 'We will invite you soon.'#+form.cleaned_data['yourname'].title()	
	    return render_to_response("inviteSoon.html", context_instance=context)
	else:
	    return render(request, 'invite.html', {'form': form})
    # if a GET (or any other method) we'll create a blank form
    else:
        form = inviteForm()
    return render(request, 'invite.html', {'form': form})

def analyzebeta(request):
    context = RequestContext(request) 	
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = contactUsForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            try:
		validate_email(form.cleaned_data['email'])
	    except forms.ValidationError:
		print 'error'
	    #print "form.yourname"
	    #print form.cleaned_data['email']
	    email = EmailMessage('Contact us form SciSphere', 
				'\nName :'+form.cleaned_data['yourname'].title()+
				',\n Mail :'+form.cleaned_data['email']+
				',\nPhone Number :'+form.cleaned_data['phonenum']+
				',\nMessage :'+form.cleaned_data['message'],
				'',['sales@scisphere.com'],['elango.sakthivel@scisphere.com'],'','','',['giftson.daniel@scisphere.com'])
            #email.send()
	    queue = django_rq.get_queue('low')
	    queue.enqueue(send_mail1, email)

	    context.name = 'Thanks for contacting us.'#+form.cleaned_data['yourname'].title()	
	    return render_to_response("thankyou.html", context_instance=context)
	else:
	    return render(request, 'analyse-beta.html', {'form': form})
    # if a GET (or any other method) we'll create a blank form
    else:
        form = contactUsForm()
    return render(request, 'analyse-beta.html', {'form': form})



@require_POST
def urlshare(request):
    if request.is_ajax():
       #redis_conn = Redis()
       #q = Queue(connection=redis_conn)
       toaddress = request.POST['toAddress']
       subject = request.POST['subject']
       message = request.POST['message']
       longUrl = request.POST['longUrl']
       longUrl = urllib2.quote(longUrl.encode("utf8"))
       if toaddress and longUrl:
	  queue = django_rq.get_queue('low')
	  queue.enqueue(mail_urlshare, toaddress, subject, message, longUrl)
          #job = django_rq.enqueue(mail_urlshare, toaddress, subject, message, longUrl)
       return HttpResponse('success.')
    else:
       return HttpResponse('failed to submit.')
    return HttpResponse('success.')

@require_POST
def mail_urlshare1(request):
    context = RequestContext(request)
    if request.is_ajax():
       print(request)
       toaddress = request.POST['toAddress']
       subject = request.POST['subject']
       message = request.POST['message']
       longUrl = request.POST['longUrl']
       #longUrl = "http://192.168.1.114:8000/region_explorer#field=population_density&level=2&level0=356&level1=33&year=2011"
       longUrl = urllib2.quote(longUrl.encode("utf8"))
       ACCESS_TOKEN = "0d085228d8b7feeb498ccf136e852ff167204f58"
       url = 'https://api-ssl.bitly.com/v3/shorten?access_token='+ACCESS_TOKEN+'&longUrl='+longUrl
       serialized_data = urllib2.urlopen(url).read()
       response = HttpResponse(serialized_data, content_type='text/plain')
       response['Content-Length'] = len(serialized_data)
       data = json.loads(serialized_data)
       shorturl = data['data']['url']
       if toaddress and shorturl:
	  print("if")
          try:
	     email = EmailMessage(subject, message+" - "+shorturl, to=[toaddress])
             email.send()
          except BadHeaderError:
             return HttpResponse('Invalid Form name.')
       else:
          return HttpResponse('Make sure fields are entered and valid.')
       return HttpResponse('success.')
    else:
       return HttpResponse('failed.')



@login_required
def shorturl(request):
    context = RequestContext(request)
    username=request.user
    content_user = get_object_or_404(User, username=username)
    ACCESS_TOKEN = "0d085228d8b7feeb498ccf136e852ff167204f58"
    #longUrl = "http://192.168.1.114:8000/region_explorer#field=population_density&level=2&level0=356&level1=33&year=2011"
    longUrl="http://192.168.1.114:8000/filters_layers#ac-1.1=true&ac-2.1=false&key_0=agricultural_worker&key_0checked=false&key_0val=0.0%3B100.0&key_1=decadal_industrialization&key_1checked=false&key_1val=-6.65%3B6.52&key_2=decadal_migration&key_2checked=false&key_2val=-15.01%3B9.65&key_3=household&key_3checked=false&key_3val=1.0%3B8628.0+&key_4=industrial_worker&key_4checked=false&key_4val=0.0%3B100.0&key_5=literacy_rate&key_5checked=false&key_5val=0.0%3B100.0+&key_6=population&key_6checked=true&key_6val=+25226%3B37819&level=4.0&level0=356&level1=33&year=2011"
    longUrl = urllib2.quote(longUrl.encode("utf8"))
    url = 'https://api-ssl.bitly.com/v3/shorten?access_token='+ACCESS_TOKEN+'&longUrl='+longUrl
    #print(url)
    serialized_data = urllib2.urlopen(url).read()
    print("serialized_data")
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    data = json.loads(serialized_data)
    print(data['data']['url'])
    return response


@login_required
def client_create(request):
    context = RequestContext(request)
    username=request.user
    msg=''

    user_list  = User.objects.filter(is_active = 1)
    context.user_list = user_list

    if request.method == 'POST':
	print("client Create")
	clientName = request.POST['clientName']
	userName = request.POST['userName']
	print(clientName)
        url = 'http://'+settings.API_IP+'/clients/create'
	print(url)
        data = json.dumps({
           "name":clientName,
	   "username":userName
        })
        req = urllib2.Request(url, data, {'Content-Type': 'application/json'})
        f = urllib2.urlopen(req)
        response = f.read()
	print("response")
	print(response)
	data = json.loads(response)
	# key and secret update to auth_user table
	new_user = User.objects.get(username = data[0]['username'])
	new_user.client_key = data[0]['clientKey']
	new_user.client_secret = data[0]['clientSecret']
	new_user.client_created = timezone.now()
        new_user.save()
	msg = "Successfully saved."


    context.msg = msg
    content_user = get_object_or_404(User, username=username)
    return render_to_response("client_create.html", context_instance=context)

@login_required
def client_list(request):
    context = RequestContext(request)
    username = request.user
    url = 'http://'+settings.API_IP+'/clients'
    print(url)
    serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    print(serialized_data)
    data = json.loads(serialized_data)
    context.client_list = data
    content_user = get_object_or_404(User, username=username)
    return render_to_response("client_list.html", context_instance=context)


#oauth call
@login_required
def oauthcall(request):
    print(" oauthcall ")
    context = RequestContext(request)
    username = request.user._wrapped if hasattr(request.user,'_wrapped') else request.user
    content_user = get_object_or_404(User, username=username)
    token_request_uri = 'http://'+settings.API_IP+'/oauth/authorize'
    response_type = "code"
    client_id = request.user.client_key
    redirect_method=None
    #apiKey="012345678"
    # redirect method
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        redirect_method = valuelist[0].strip()
    #
    redirect_uri = 'http://'+settings.OAUTH_REDIRECT_IP+'/'+redirect_method
    scope = "*"
    url = "{token_request_uri}?api_key={api_key}&response_type={response_type}&client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}".format(
	api_key = client_id,
        token_request_uri = token_request_uri,
        response_type = response_type,
        client_id = client_id,
        redirect_uri = redirect_uri,
        scope = scope)
    print url
    #try:
    #   r = requests.get(url)
    #except Exception as ex:
    #   print "error"
    #   template = "An exception of type {0} occured. Arguments:\n{1!r}"
    #   message = template.format(type(ex).__name__, ex.args)
    #   print message
    return HttpResponseRedirect(url)


#@login_required
def oauth_redirect(request):
    print(" oauth_redirect ****")
    context = RequestContext(request)
    username = request.user
    simple = request.GET['code']
    response_text = simple.split(':')	
    #content_user = get_object_or_404(User, username=username)
    user  = User.objects.get(username = response_text[1])
    redirect_uri = 'http://'+settings.OAUTH_REDIRECT_IP+'/app/oauth_redirect'
    #apiKey="012345678"

    params = urllib.urlencode({
        'code':response_text[0],
        'redirect_uri':redirect_uri,
        'client_id':user.client_key, #user.client_key,
        'client_secret':user.client_secret, #user.client_secret,
        'grant_type':'authorization_code',
        'api_key':user.client_key
    })
    headers={'content-type':'application/x-www-form-urlencoded'}
    conn = httplib.HTTPConnection(settings.OAUTH_IP)#, 2100
    conn.request("POST", "/oauth/token", params, headers)
    #conn.request("POST", "/token", params, headers)
    response = conn.getresponse()
    data = response.read()
    accessToken = json.loads(data)
    accessToken = accessToken['access_token']['token']
    request.session['access_tk'] = accessToken
    request.session['api_key'] = user.client_key
    #return response
    return HttpResponseRedirect('region_explorer')

def oauth_redirect_welcome(request):
    print(" oauth_redirect_welcome ****")
    context = RequestContext(request)
    username = request.user
    simple = request.GET['code']
    response_text = simple.split(':')	
    user  = User.objects.get(username = response_text[1])
    #added 
    user_profile = UserProfile.objects.get(username = response_text[1])
    country=356
    state=33
    try:
       country = Country.objects.get(country_a2_code = user_profile.country)
       state = SubDivision.objects.get(subdivision_code = user_profile.state)
       country = country.country_id
       state = state.subdivision_id
    except Exception as e:
       print "exception"
       print e
       country=356
       state=33
 
    context.country = country
    context.state = state
    #
    redirect_uri = 'http://'+settings.OAUTH_REDIRECT_IP+'/app/oauth_redirect_welcome'
    params = urllib.urlencode({
        'code':response_text[0],
        'redirect_uri':redirect_uri,
        'client_id':user.client_key, #user.client_key,
        'client_secret':user.client_secret, #user.client_secret,
        'grant_type':'authorization_code',
        'api_key':user.client_key
    })
    headers={'content-type':'application/x-www-form-urlencoded'}
    conn = httplib.HTTPConnection(settings.OAUTH_IP)#, 2100
    conn.request("POST", "/oauth/token", params, headers)
    #conn.request("POST", "/token", params, headers)
    response = conn.getresponse()
    data = response.read()
    accessToken = json.loads(data)
    accessToken = accessToken['access_token']['token']

    request.session['access_tk'] = accessToken
    request.session['api_key'] = user.client_key
    #return HttpResponseRedirect('/region_explorer')
    return render_to_response("registration/welcome.html", context_instance=context)


@login_required
def location_analyser(request):
    context = RequestContext(request)
    username=request.user
    content_user = get_object_or_404(User, username=username)
    return render_to_response("location_analyser.html", context_instance=context)

@login_required
def contextual_influencers(request):
    context = RequestContext(request)
    username=request.user
    #content_user = get_object_or_404(User, username=username)
    return render_to_response("contextual_influencers.html", context_instance=context)

@login_required
def context_variables(request):
    context = RequestContext(request)
    username=request.user
    #content_user = get_object_or_404(User, username=username)
    return render_to_response("context_variables.html", context_instance=context)


@login_required
def analyze(request):
    context = RequestContext(request)
    username=request.user
    #content_user = get_object_or_404(User, username=username)
    return render_to_response("analyze.html", context_instance=context)


#load countries
def countries(request):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    response = ''
    accessToken=None
    apiKey=None
    print "------------------"
    print request.session.get('access_tk')
    print request.session.get('api_key')
    print "-------------------000"
    ##oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')
    url = 'http://'+settings.API_IP+'/scisphere/places/countries?api_key='+apiKey
    print url
    request1 = urllib2.Request(url)
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()
    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    return response

#load countrydetails
def countrydetail(request):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    orgID=None
    try:
       orgID = OrganizationUser.objects.get(user=request.user.id).organization_id
    except Exception as e:
       print e
    querystr=[]
    accessToken=None
    apiKey=None
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)

    # oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')
    url = 'http://'+settings.API_IP+'/scisphere/places/countrydetail?'+query+'&api_key='+apiKey+'&orgid='+str(orgID)
    print url
    request1 = urllib2.Request(url)
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()
    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    return response


def userTransaction(api,postData,page,user_id,org_id,state_id):
    try:
        userTransactionForm = UserTransaction()
        userTransactionForm.url = api
        userTransactionForm.data = json.loads(postData)
        userTransactionForm.page = page
        userTransactionForm.user_id = user_id
        userTransactionForm.org_id = org_id
        userTransactionForm.state_id = state_id
        userTransactionForm.created_date = datetime.datetime.now()
        userTransactionForm.save()
    except Exception as e:
        print "Exception inside User Transaction :: %s"%e


#Load Trend
@login_required
def trend(request):
    context = RequestContext(request)
    username=request.user
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    context.orgID = org_id
    customerDatasetList=None
    myTemplateList=None
    try:
       myTemplateList = MyTemplate.objects.filter(org_id=org_id).values('id','mytemplate_name').order_by('-id')
       customerDatasetList = CustomerDatasetUpload.objects.filter(org_id=org_id).values('mytemplate_id').order_by('-id')[:1]
    except Exception as e:
       print e
    templatename = ""
    if len(customerDatasetList)>0:
       for mytmplist in myTemplateList:
          if(customerDatasetList[0]['mytemplate_id'] == mytmplist['id']):
             templatename = mytmplist['mytemplate_name']	
    context.templatename = templatename
    subscriptionList = get_subscription_list(org_id)
    context.subscriptionList = subscriptionList
    #content_user = get_object_or_404(User, username=username)
    return render_to_response("trend.html", context_instance=context)

#load trend_data
def trend_data(request, id):
    if not request.user.is_authenticated():
       return checkUserSession()
    print "trend_data"
    context = RequestContext(request)
    response = ''
    accessToken=None
    apiKey=None
    querystr=[]

    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)

    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')
    url = 'http://'+settings.API_IP+'/scisphere/places/trend/'+id+'?'+query+'&api_key='+apiKey
    print url
    request1 = urllib2.Request(url)
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()
    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    return response



#load snapshot data
def snapshot_data(request, stid, id):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    placeid = id
    stateid = stid
    querystr=[]
    accessToken=None
    apiKey=None
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)

    orgID=None
    try:
       orgID = OrganizationUser.objects.get(user=request.user.id).organization_id
    except Exception as e:
       print e

    # oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')
    url = 'http://'+settings.API_IP+'/scisphere/places/'+stateid+'/'+placeid+'/snapshot?'+query+'&api_key='+apiKey+'&orgid='+str(orgID)

    print "url"
    print url
    request1 = urllib2.Request(url)
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()

    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    return response

def checkUserSession():
    try:
       result={}
       result['1001']="Concurrent login is detected from same user id. Please login again."
       result = json.dumps(result)
       response = HttpResponse(result, content_type='json/plain')
       response['Content-Length'] = len(result)
       return response
    except Exception as e:
       print "Exception inside checkUserSession in views.py :: %s"%e


#regionexplorer levels data call
def region(request, id):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    placeid = id
    querystr=[]
    keyName=None
    accessToken=None
    apiKey=None
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        if key == "regionkey":
           keyName=valuelist[0].strip()
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
        
    query = '&'.join(querystr)

    #oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')

    # Subscription Check
    try:
       check = subscription_check(keyName,placeid,request.user.id)
       if check != True:
          result={}
          result['subscription']=check
          result = json.dumps(result)
          response = HttpResponse(result, content_type='json/plain')
          response['Content-Length'] = len(result)
          return response
    except Exception as e:
       print "Exception inside region - subscription check : %s" %e

    #query = urllib.quote(query, '')
    query = query.replace(' ','%20')
    url = 'http://'+settings.API_IP+'/scisphere/places/'+placeid+'/region?'+query+'&api_key='+apiKey+'&keytype=snapshot_pca'
    print url

    # User Transaction entry
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    userTransaction(url,request.body,"Region",request.user.id,org_id,placeid)

    #request1 = urllib2.Request(url)
    request1 = urllib2.Request(url,request.body, headers={'Content-Type': 'application/json'})
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()

    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    return response



@login_required
@require_POST
def sharemap(request,level0Id, level1Id, level, fieldId, leveltype, type, indexname, category, color , size, uniquekey):

    context = RequestContext(request)
    keyName=None
    accessToken=None
    apiKey=None
    randomRef = uuid().hex 
    uniquekey = randomRef
    keyName=fieldId

    #oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')

    try:
       check = subscription_check(keyName,level1Id,request.user.id)
       if check != True:
          result={}
          result['subscription']=check
          result = json.dumps(result)
          response = HttpResponse(result, content_type='json/plain')
          response['Content-Length'] = len(result)
          return response
    except Exception as e:
       print "Exception inside region - subscription check : %s" %e

    try:
       query = 'category='+category+'&index='+indexname+'&level='+level+'&regionkey='+fieldId+'&level0='+level0Id+'&leveltype='+leveltype+''
       query = query.replace(' ','%20')

       url = 'http://'+settings.API_IP+'/scisphere/places/'+level1Id+'/region?'+query+'&api_key='+apiKey+'&keytype=snapshot_pca'
       print url   
       variableArr = '{"keys":["'+str(fieldId).lower()+'"]}'

       request1 = urllib2.Request(url, variableArr, headers={'Content-Type': 'application/json'})
       #request1.add_header("Authorization", "Bearer "+ accessToken)
       #result1 = urllib2.urlopen(request1)
       #serialized_data = result1.read()
       #request1 = urllib2.Request(url)
       request1.add_header("Authorization", "Bearer "+ accessToken)
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()


       context.level_0 = level0Id
       context.level_1 = level1Id
       context.level_Id = level
       context.field_Id = fieldId
       context.level_type = leveltype
       context.type = type
       context.data = serialized_data

       as_file = request.GET.get('as_file')
       context_to_write = {
				'level_0': level0Id,
				'level_1': level1Id,
				'level_Id': level,
				'field_Id': fieldId,
				'level_type': leveltype,
				'type': type,
				'color': color,
				'size': size,
				'data': serialized_data,
				'title': request.body,
		  	  }

       content = render_to_string('region_explorer_iframe.html', context_to_write)                
       	
       with open(settings.EMBED_PATH+'/'+uniquekey+'.html', 'w') as static_file:
                 static_file.write(content)

       try:

          queue = django_rq.get_queue('low')
          queue.enqueue(post_image_pins_phantom,size,size, str(uniquekey), request.user.id, request.body )

       except Exception as e:
          print "Exception in Share-Embed  :: %s" %e
	
       return HttpResponse(''+uniquekey+'')

    except Exception as e:
       print "Exception inside share Embed -  region - api call : %s" %e
       return False

def embedShare(request):
    context = RequestContext(request)
    return render_to_response("region_explorer_iframe1.html", context_instance=context)


def subscription_check(keyName,level1Id,userid):
    print "subscription check"
    keyId=None
    datasetId=None
    orgID=None
    try:
       orgID = OrganizationUser.objects.get(user=userid).organization_id
    except Exception as e:
       print "Exception inside subscription check - organization :: %s" %e

    try:
       keysTableList = list(KeysTable.objects.filter(keys=keyName.upper(),ds_type="Commercial").values('id','title').order_by('-id')[:1])
       if len(keysTableList) > 0:
          keyId = keysTableList[0]['id']
          datasetList = list(Dataset.objects.filter(ds_state_code=level1Id,ds_variables__contains=keyId,ds_type="Commercial").values('id'))
          if len(datasetList) > 0:
	     print "print 2"
             datasetId = datasetList[0]['id']
             subscriptionList = list(Subscription.objects.filter(dataset_id_id=datasetId,org_id=orgID))
             if len(subscriptionList) > 0:
                return True
             else:
                message = "You are not subscribed to this variable - "+str(keysTableList[0]['title'].encode('utf8'))
                return message
          else:
             message = "You are not subscribed to this variable - "+str(keysTableList[0]['title'].encode('utf8'))
             return message
       else:
          return True
    except Exception as e:
       print "Exception inside subscription_check :: %s" %e
    return True

#regionexplorer levels data call
def region_ec(request, id):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    placeid = id
    querystr=[]
    ec_key = ''
    accessToken=None
    apiKey=None
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
	if key == "ec_key":
	    ec_key = valuelist[0]
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)

    #oauth
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')
    url = 'http://'+settings.API_IP+'/scisphere/places/'+placeid+'/region_ec?'+query+'&api_key='+apiKey
    request1 = urllib2.Request(url)
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()

    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    return response




@login_required
def correlate(request):
    context = RequestContext(request)
    username=request.user
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    context.orgID = org_id
    customerDatasetList=None
    myTemplateList=None
    try:
       myTemplateList = MyTemplate.objects.filter(org_id=org_id).values('id','mytemplate_name').order_by('-id')
       customerDatasetList = CustomerDatasetUpload.objects.filter(org_id=org_id).values('mytemplate_id').order_by('-id')[:1]
    except Exception as e:
       print e
    templatename = None

    if len(customerDatasetList) > 0:   	
       for mytmplist in myTemplateList:
          if(customerDatasetList[0]['mytemplate_id'] == mytmplist['id']):
             templatename = mytmplist['mytemplate_name']	
    context.templatename = templatename
    subscriptionList = get_subscription_list(org_id)
    context.subscriptionList = subscriptionList
    #content_user = get_object_or_404(User, username=username)
    return render_to_response("correlate.html", context_instance=context)


def correlate_data_old(request,id):
    if not request.user.is_authenticated():
       return checkUserSession()
    try:
       orgID = OrganizationUser.objects.get(user=request.user.id).organization_id
       querystr=[]
       accessToken=None
       apiKey=None
       fieldsArr = None	
       fieldNamesArr = None	
       for key in request.GET.iterkeys():
          valuelist = request.GET.getlist(key)
	  if key =="fields":
		fieldsArr =valuelist
	  if key =="fieldNames":
		fieldNamesArr =valuelist		
          querystr.extend(['%s=%s' % (key, val) for val in valuelist])
       query = '&'.join(querystr)


       name1 = None
       name2 = None	
       id1 = None
       id2 = None	
	
       value = fieldsArr[0].split(',')
       id2 = value[1].lower()
       id1 = value[0].lower()		
	
       value1 = fieldNamesArr[0].split(',')
       name2 = value1[1]
       name1 = value1[0]

       # Subscription check:
       try:
          for key in range(len(fieldsArr)):
             check = subscription_check(fieldsArr[key],id,request.user.id)
             if check != True:
                result={}
                result['subscription']=check
                result = json.dumps(result)
                response = HttpResponse(result, content_type='json/plain')
                response['Content-Length'] = len(result)
                return response
       except Exception as e:
          print "Exception inside region - subscription check : %s" %e

       #oauth accesstoken
       if request.session.get('access_tk'):
          accessToken = request.session.get('access_tk')
          apiKey = request.session.get('api_key')
       url = 'http://'+settings.API_IP+'/scisphere/places/correlate/'+id+'/?api_key='+apiKey+'&orgid='+str(orgID) #'+query+'&
       print url

       myvarkey = 'myvar'+str(orgID)+''	

       request1 = urllib2.Request(url,request.body,headers={'Content-Type': 'application/json'})
       #request1 = urllib2.Request(url,  body_data, headers={'Content-Type': 'application/json'})
       request1.add_header("Authorization", "Bearer "+ accessToken)
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()

       #print "serialized_data"
       #print serialized_data
    	
       data = json.loads(serialized_data)
	
       if not 'Message' in data:

	       #Import for Pandas
	       import pandas as pd
	       import numpy as np
	       import numpy
	       import matplotlib

	       #matplotlib.use('Agg')
	       import matplotlib.pyplot as plt
	       from scipy import stats
	       import uuid

	       #Text Wrap:
	       import textwrap

	       #Delete all the Images present in that folder	
	       import glob
	       import os
	       directory=settings.MEDIA_PATH+'/correlate/'

	       os.chdir(directory)
	       files=glob.glob('*.png')

	       correlationCoefficient = ""
	       rSquared	= ""

              #delete   files
	       #for filename in files:
		   #print filename	
		   #os.unlink(filename)

	       uniqueId= str(uuid.uuid4())	


	       try:       
			plt.rc('xtick', labelsize=6)
			plt.rc('ytick', labelsize=6)
	       except Exception as e:
			print "plt fail::"
			print "Exception inside correlate_data in views.py :: %s" %e
			return None

	       try:
			df = pd.DataFrame( data , columns = [ id1, id2])
	
			#finding Correlation and Rsquared Value:
		        correlationCoefficient =  numpy.corrcoef(df[id1], df[id2] )[0, 1]
			slope, intercept, r_value, p_value, std_err = stats.linregress(df[id1], df[id2])
			rSquared = r_value**2
	       except:
			print "Data Frame creation Fail"

	       try:
			# Test plot 1
			#to Create a chart in Python pandas:
			plt.scatter( df[id1], df[id2] , c="red", s=7, edgecolors='none' )

			#Axis names, Title and Grid view :
			plt.xlabel(textwrap.fill(name1, 100) ,fontsize=6)
			plt.ylabel(textwrap.fill(name2, 60)  , fontsize=6)
			#plt.grid(True)

			#Remove Automatic scientific calculation of X axis:
			ax = plt.gca()
			ax.get_xaxis().get_major_formatter().set_scientific(False)
			ax.get_yaxis().get_major_formatter().set_scientific(False)
			ax.spines['bottom'].set_color('#7F7F7F')
			ax.spines['top'].set_color('#7F7F7F') 
			ax.spines['right'].set_color('#7F7F7F')
			ax.spines['left'].set_color('#7F7F7F')
			ax.tick_params(axis='x', colors='#7F7F7F')
			ax.tick_params(axis='y', colors='#7F7F7F')

			fig = plt.gcf()
			fig.set_size_inches(5.5, 3.5)

			fig.savefig(settings.MEDIA_PATH+'/correlate/testplot1'+uniqueId+'.png')# ,, dpi=100)
	
			#Close chart or it would still hold the current data for the next chart also:
			plt.close()

	       except Exception as ex:
			print "Scatter plot 1 Fails"
		    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
			message = template.format(type(ex).__name__, ex.args)
		    	print message
		    	print ex
			print "Scatter plot 1 Fails"

	       #Second Transpose Chart Created Here:	
	       try:
			# Test plot 2
			#to Create a chart in Python pandas:
			plt.scatter(df[id2], df[id1], c="blue", s=7, edgecolors='none')

			#Axis names and Grid view :
			plt.xlabel(textwrap.fill(name2, 100) ,fontsize=6)
			plt.ylabel(textwrap.fill(name1, 60)  , fontsize=6)
			#plt.grid(True)

			#Remove Automatic scientific calculation of X axis:
			ax = plt.gca()
			ax.get_xaxis().get_major_formatter().set_scientific(False)
			ax.get_yaxis().get_major_formatter().set_scientific(False)
			ax.spines['bottom'].set_color('#7F7F7F')
			ax.spines['top'].set_color('#7F7F7F') 
			ax.spines['right'].set_color('#7F7F7F')
			ax.spines['left'].set_color('#7F7F7F')
			ax.tick_params(axis='x', colors='#7F7F7F')
			ax.tick_params(axis='y', colors='#7F7F7F')

			#Save image in a name
			fig = plt.gcf()
			fig.set_size_inches(5.5, 3.5)
			fig.savefig(settings.MEDIA_PATH+'/correlate/testplot2'+uniqueId+'.png')# , dpi = 800)
			plt.close()

	       except Exception as ex:
			print "Scatter plot 2 Fails"
		    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
			message = template.format(type(ex).__name__, ex.args)
		    	print message
		    	print ex

	       #Create a Json with	
	       serialized_data = json.dumps({ 'id' : uniqueId, 'rsquare':rSquared , 'corcoef': correlationCoefficient })
	      	
       else: 
	       serialized_data = ''

	
       response = HttpResponse(serialized_data, content_type='text/plain')
       response['Content-Length'] = len(serialized_data)
       return response
    except Exception as e:
       print "Exception inside correlate_data in views.py :: %s" %e
       return None

def correlate_data_od(request,id):
    if not request.user.is_authenticated():
       return checkUserSession()

    try:
       orgID = OrganizationUser.objects.get(user=request.user.id).organization_id
       querystr=[]
       accessToken=None
       apiKey=None
       contextKeyIdArr=None
       contextKeyNameArr=None
       myvarKeyIdArr=None
       myvarKeyNameArr=None
       for key in request.GET.iterkeys():
          valuelist = request.GET.getlist(key)
	  if key =="contextKeyId":
		contextKeyIdArr =valuelist
	  if key =="contextKeyName":
		contextKeyNameArr =valuelist
	  if key =="myvarKeyId":
		myvarKeyIdArr =valuelist
	  if key =="myvarKeyName":
		myvarKeyNameArr =valuelist
          querystr.extend(['%s=%s' % (key, val) for val in valuelist])
       query = '&'.join(querystr)


       contextKeyIdArr = contextKeyIdArr[0].split(",")
       contextKeyNameArr = contextKeyNameArr[0].split(",")
       myvarKeyIdArr = myvarKeyIdArr[0].split(",")
       myvarKeyNameArr = myvarKeyNameArr[0].split(",")

       # Subscription check:
       try:
          for key in range(len(contextKeyIdArr)):
             check = subscription_check(contextKeyIdArr[key],id,request.user.id)
             if check != True:
                result={}
                result['subscription']=check
                result = json.dumps(result)
                response = HttpResponse(result, content_type='json/plain')
                response['Content-Length'] = len(result)
                return response
       except Exception as e:
          print "Exception inside region - subscription check : %s" %e

       #oauth accesstoken
       if request.session.get('access_tk'):
          accessToken = request.session.get('access_tk')
          apiKey = request.session.get('api_key')
       url = 'http://'+settings.API_IP+'/scisphere/places/correlate/'+id+'/?api_key='+apiKey+'&orgid='+str(orgID) #'+query+'&
       print url

       myvarkey = 'myvar'+str(orgID)+''	

       request1 = urllib2.Request(url,request.body,headers={'Content-Type': 'application/json'})
       #request1 = urllib2.Request(url,  body_data, headers={'Content-Type': 'application/json'})
       request1.add_header("Authorization", "Bearer "+ accessToken)
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()
       data = json.loads(serialized_data)

       if not 'Message' in data:
	       #Import for Pandas
	       import pandas as pd
	       import numpy as np
	       import numpy
	       import matplotlib
	       matplotlib.use('Agg')
               matplotlib.matplotlib_fname()

	       import matplotlib.pyplot as plt
	       from scipy import stats
	       import uuid

	       #Text Wrap:
	       import textwrap

	       #Delete all the Images present in that folder	
	       import glob
	       import os
	       directory=settings.MEDIA_PATH+'/correlate/'

	       os.chdir(directory)
	       files=glob.glob('*.png')

	       correlationCoefficient = ""
	       rSquared	= ""
	       uniqueId= str(uuid.uuid4())

	       try:       
			plt.rc('xtick', labelsize=6)
			plt.rc('ytick', labelsize=6)
	       except Exception as e:
			print "plt fail::"
			print "Exception inside correlate_data in views.py :: %s" %e
			return None

	       try:
			dfKeyId = []
			for key in contextKeyIdArr:
				dfKeyId.append(key)
			for key in myvarKeyIdArr:
				dfKeyId.append(key)
			df = pd.DataFrame( data , columns = dfKeyId)
			correlateValue={}
			for key1 in range(len(contextKeyIdArr)):
				for key2 in range(len(myvarKeyIdArr)):
					try:
						#finding Correlation and Rsquared Value:
						correlationCoefficient =  numpy.corrcoef(df[contextKeyIdArr[key1]], df[myvarKeyIdArr[key2]] )[0, 1]
						slope, intercept, r_value, p_value, std_err = stats.linregress(df[contextKeyIdArr[key1]], df[myvarKeyIdArr[key2]])
						rSquared = r_value**2
						correlateValue[contextKeyIdArr[key1]]={"corcoef":correlationCoefficient,"rsquare":rSquared}
						#correlateValue[contextKeyIdArr[key1]]={"corcoef":0,"rsquare":0}
					except Exception as e:
						correlateValue[contextKeyIdArr[key1]]={"corcoef":0,"rsquare":0}
						print "Exception as correlation coefficent and rsquare value :: %s" %e
	       except Exception as e:
			print "Data Frame creation Fail %s"%e

	       try:
			for key1 in range(len(contextKeyIdArr)):
				for key2 in range(len(myvarKeyIdArr)):
					# Test plot 1
					#to Create a chart in Python pandas:
					plt.scatter( df[contextKeyIdArr[key1]], df[myvarKeyIdArr[key2]] , c="red", s=7, edgecolors='none' )
					#Axis names, Title and Grid view :
					plt.xlabel(textwrap.fill(contextKeyNameArr[key1], 100) ,fontsize=6)
					plt.ylabel(textwrap.fill(myvarKeyNameArr[key2], 60)  , fontsize=6)
					#plt.grid(True)

					#Remove Automatic scientific calculation of X axis:
					ax = plt.gca()
					ax.get_xaxis().get_major_formatter().set_scientific(False)
					ax.get_yaxis().get_major_formatter().set_scientific(False)
					ax.spines['bottom'].set_color('#7F7F7F')
					ax.spines['top'].set_color('#7F7F7F') 
					ax.spines['right'].set_color('#7F7F7F')
					ax.spines['left'].set_color('#7F7F7F')
					ax.tick_params(axis='x', colors='#7F7F7F')
					ax.tick_params(axis='y', colors='#7F7F7F')

					fig = plt.gcf()
					fig.set_size_inches(5.5, 3.5)

					fig.savefig(settings.MEDIA_PATH+'/correlate/'+contextKeyIdArr[key1]+'_1_'+uniqueId+'.png')# ,, dpi=100)
	
					#Close chart or it would still hold the current data for the next chart also:
					plt.close()

	       except Exception as ex:
			print "Exception Plot 1 :: %s"%ex

	       try:
			for key1 in range(len(myvarKeyIdArr)):
				for key2 in range(len(contextKeyIdArr)):
					# Test plot 2
					#to Create a chart in Python pandas:
					plt.scatter(df[myvarKeyIdArr[key1]], df[contextKeyIdArr[key2]], c="blue", s=7, edgecolors='none')

					#Axis names and Grid view :
					plt.xlabel(textwrap.fill(myvarKeyNameArr[key1], 100) ,fontsize=6)
					plt.ylabel(textwrap.fill(contextKeyNameArr[key2], 60)  , fontsize=6)
					#plt.grid(True)

					#Remove Automatic scientific calculation of X axis:
					ax = plt.gca()
					ax.get_xaxis().get_major_formatter().set_scientific(False)
					ax.get_yaxis().get_major_formatter().set_scientific(False)
					ax.spines['bottom'].set_color('#7F7F7F')
					ax.spines['top'].set_color('#7F7F7F') 
					ax.spines['right'].set_color('#7F7F7F')
					ax.spines['left'].set_color('#7F7F7F')
					ax.tick_params(axis='x', colors='#7F7F7F')
					ax.tick_params(axis='y', colors='#7F7F7F')

					#Save image in a name
					fig = plt.gcf()
					fig.set_size_inches(5.5, 3.5)
					fig.savefig(settings.MEDIA_PATH+'/correlate/'+contextKeyIdArr[key2]+'_2_'+uniqueId+'.png')# , dpi = 800)
					plt.close()

	       except Exception as ex:
			print "Exception Plot 2 :: %s"%ex

	       #Create a Json with	
	       serialized_data = json.dumps({ 'id' : uniqueId, 'correlatedata':correlateValue })
	      	
       else: 
	       serialized_data = ''

	
       response = HttpResponse(serialized_data, content_type='text/plain')
       response['Content-Length'] = len(serialized_data)
       print "response"
       print response
       return response
    except Exception as e:
       print "Exception inside correlate_data in views.py :: %s" %e
       return None


def correlate_data(request,id):
    if not request.user.is_authenticated():
       return checkUserSession()

    try:
       orgID = OrganizationUser.objects.get(user=request.user.id).organization_id
       querystr=[]
       accessToken=None
       apiKey=None
       contextKeyIdArr=None
       contextKeyNameArr=None
       myvarKeyIdArr=None
       myvarKeyNameArr=None
       for key in request.GET.iterkeys():
          valuelist = request.GET.getlist(key)
	  if key =="contextKeyId":
		contextKeyIdArr =valuelist
	  if key =="contextKeyName":
		contextKeyNameArr =valuelist
	  if key =="myvarKeyId":
		myvarKeyIdArr =valuelist
	  if key =="myvarKeyName":
		myvarKeyNameArr =valuelist
          querystr.extend(['%s=%s' % (key, val) for val in valuelist])
       query = '&'.join(querystr)


       contextKeyIdArr = contextKeyIdArr[0].split(",")
       contextKeyNameArr = contextKeyNameArr[0].split(",")
       myvarKeyIdArr = myvarKeyIdArr[0].split(",")
       myvarKeyNameArr = myvarKeyNameArr[0].split(",")

       # Subscription check:
       try:
          for key in range(len(contextKeyIdArr)):
             check = subscription_check(contextKeyIdArr[key],id,request.user.id)
             if check != True:
                result={}
                result['subscription']=check
                result = json.dumps(result)
                response = HttpResponse(result, content_type='json/plain')
                response['Content-Length'] = len(result)
                return response
       except Exception as e:
          print "Exception inside region - subscription check : %s" %e

       #oauth accesstoken
       if request.session.get('access_tk'):
          accessToken = request.session.get('access_tk')
          apiKey = request.session.get('api_key')
       url = 'http://'+settings.API_IP+'/scisphere/places/correlate/'+id+'/?api_key='+apiKey+'&orgid='+str(orgID) #'+query+'&
       print url

       myvarkey = 'myvar'+str(orgID)+''	

       request1 = urllib2.Request(url,request.body,headers={'Content-Type': 'application/json'})
       #request1 = urllib2.Request(url,  body_data, headers={'Content-Type': 'application/json'})
       request1.add_header("Authorization", "Bearer "+ accessToken)
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()
       data = json.loads(serialized_data)
       print "data"
       print data

       if not 'Message' in data:
	       #Import for Pandas
	       import pandas as pd
	       import numpy as np
	       import numpy
	       import matplotlib
	       matplotlib.use('Agg')
               matplotlib.matplotlib_fname()

	       import matplotlib.pyplot as plt
	       from scipy import stats
	       import uuid

	       #Text Wrap:
	       import textwrap

	       #Delete all the Images present in that folder	
	       import glob
	       import os
	       directory=settings.MEDIA_PATH+'/correlate/'

	       os.chdir(directory)
	       files=glob.glob('*.png')

	       correlationCoefficient = ""
	       rSquared	= ""
	       uniqueId= str(uuid.uuid4())

	       try:       
			plt.rc('xtick', labelsize=6)
			plt.rc('ytick', labelsize=6)
	       except Exception as e:
			print "plt fail::"
			print "Exception inside correlate_data in views.py :: %s" %e
			return None

	       try:
			dfKeyId = []
			for key in contextKeyIdArr:
				dfKeyId.append(key)
			for key in myvarKeyIdArr:
				dfKeyId.append(key)
			df = pd.DataFrame( data , columns = dfKeyId)
			correlateValue={}

			if len(myvarKeyIdArr)==2:
				try:
					#finding Correlation and Rsquared Value:
					correlationCoefficient =  numpy.corrcoef(df[myvarKeyIdArr[0]], df[myvarKeyIdArr[1]] )[0, 1]
					slope, intercept, r_value, p_value, std_err = stats.linregress(df[myvarKeyIdArr[0]], df[myvarKeyIdArr[1]])
					rSquared = r_value**2
					correlateValue[myvarKeyIdArr[0]]={"corcoef":correlationCoefficient,"rsquare":rSquared}
					#correlateValue[contextKeyIdArr[key1]]={"corcoef":0,"rsquare":0}
				except Exception as e:
					correlateValue[myvarKeyIdArr[0]]={"corcoef":0,"rsquare":0}
					print "Exception as correlation coefficent and rsquare value :: %s" %e
			else:
				for key1 in range(len(contextKeyIdArr)):
					for key2 in range(len(myvarKeyIdArr)):
						try:
							#finding Correlation and Rsquared Value:
							correlationCoefficient =  numpy.corrcoef(df[contextKeyIdArr[key1]], df[myvarKeyIdArr[key2]] )[0, 1]
							slope, intercept, r_value, p_value, std_err = stats.linregress(df[contextKeyIdArr[key1]], df[myvarKeyIdArr[key2]])
							rSquared = r_value**2
							correlateValue[contextKeyIdArr[key1]]={"corcoef":correlationCoefficient,"rsquare":rSquared}
							#correlateValue[contextKeyIdArr[key1]]={"corcoef":0,"rsquare":0}
						except Exception as e:
							correlateValue[contextKeyIdArr[key1]]={"corcoef":0,"rsquare":0}
							print "Exception as correlation coefficent and rsquare value :: %s" %e
	       except Exception as e:
			print "Data Frame creation Fail %s"%e

	       try:
		    if len(myvarKeyIdArr)==2:
			# Test plot 1
			#to Create a chart in Python pandas:
			plt.scatter( df[myvarKeyIdArr[0]], df[myvarKeyIdArr[1]] , c="red", s=7, edgecolors='none' )
			#Axis names, Title and Grid view :
			plt.xlabel(textwrap.fill(myvarKeyNameArr[0], 100) ,fontsize=6)
			plt.ylabel(textwrap.fill(myvarKeyNameArr[1], 60)  , fontsize=6)
			#plt.grid(True)

			#Remove Automatic scientific calculation of X axis:
			ax = plt.gca()
			ax.get_xaxis().get_major_formatter().set_scientific(False)
			ax.get_yaxis().get_major_formatter().set_scientific(False)
			ax.spines['bottom'].set_color('#7F7F7F')
			ax.spines['top'].set_color('#7F7F7F') 
			ax.spines['right'].set_color('#7F7F7F')
			ax.spines['left'].set_color('#7F7F7F')
			ax.tick_params(axis='x', colors='#7F7F7F')
			ax.tick_params(axis='y', colors='#7F7F7F')

			fig = plt.gcf()
			fig.set_size_inches(5.5, 3.5)

			fig.savefig(settings.MEDIA_PATH+'/correlate/'+myvarKeyIdArr[0]+'_1_'+uniqueId+'.png')# ,, dpi=100)

			#Close chart or it would still hold the current data for the next chart also:
			plt.close()

		    else:
			for key1 in range(len(contextKeyIdArr)):
				for key2 in range(len(myvarKeyIdArr)):
					# Test plot 1
					#to Create a chart in Python pandas:
					plt.scatter( df[contextKeyIdArr[key1]], df[myvarKeyIdArr[key2]] , c="red", s=7, edgecolors='none' )
					#Axis names, Title and Grid view :
					plt.xlabel(textwrap.fill(contextKeyNameArr[key1], 100) ,fontsize=6)
					plt.ylabel(textwrap.fill(myvarKeyNameArr[key2], 60)  , fontsize=6)
					#plt.grid(True)

					#Remove Automatic scientific calculation of X axis:
					ax = plt.gca()
					ax.get_xaxis().get_major_formatter().set_scientific(False)
					ax.get_yaxis().get_major_formatter().set_scientific(False)
					ax.spines['bottom'].set_color('#7F7F7F')
					ax.spines['top'].set_color('#7F7F7F') 
					ax.spines['right'].set_color('#7F7F7F')
					ax.spines['left'].set_color('#7F7F7F')
					ax.tick_params(axis='x', colors='#7F7F7F')
					ax.tick_params(axis='y', colors='#7F7F7F')

					fig = plt.gcf()
					fig.set_size_inches(5.5, 3.5)

					fig.savefig(settings.MEDIA_PATH+'/correlate/'+contextKeyIdArr[key1]+'_1_'+uniqueId+'.png')# ,, dpi=100)
	
					#Close chart or it would still hold the current data for the next chart also:
					plt.close()

	       except Exception as ex:
			print "Exception Plot 1 :: %s"%ex

	       try:
		    if len(myvarKeyIdArr)==2:
			# Test plot 2
			#to Create a chart in Python pandas:
			plt.scatter(df[myvarKeyIdArr[1]], df[myvarKeyIdArr[0]], c="blue", s=7, edgecolors='none')

			#Axis names and Grid view :
			plt.xlabel(textwrap.fill(myvarKeyNameArr[1], 100) ,fontsize=6)
			plt.ylabel(textwrap.fill(myvarKeyNameArr[0], 60)  , fontsize=6)
			#plt.grid(True)

			#Remove Automatic scientific calculation of X axis:
			ax = plt.gca()
			ax.get_xaxis().get_major_formatter().set_scientific(False)
			ax.get_yaxis().get_major_formatter().set_scientific(False)
			ax.spines['bottom'].set_color('#7F7F7F')
			ax.spines['top'].set_color('#7F7F7F') 
			ax.spines['right'].set_color('#7F7F7F')
			ax.spines['left'].set_color('#7F7F7F')
			ax.tick_params(axis='x', colors='#7F7F7F')
			ax.tick_params(axis='y', colors='#7F7F7F')

			#Save image in a name
			fig = plt.gcf()
			fig.set_size_inches(5.5, 3.5)
			fig.savefig(settings.MEDIA_PATH+'/correlate/'+myvarKeyIdArr[0]+'_2_'+uniqueId+'.png')# , dpi = 800)
			plt.close()
		    else:
			for key1 in range(len(myvarKeyIdArr)):
				for key2 in range(len(contextKeyIdArr)):
					# Test plot 2
					#to Create a chart in Python pandas:
					plt.scatter(df[myvarKeyIdArr[key1]], df[contextKeyIdArr[key2]], c="blue", s=7, edgecolors='none')

					#Axis names and Grid view :
					plt.xlabel(textwrap.fill(myvarKeyNameArr[key1], 100) ,fontsize=6)
					plt.ylabel(textwrap.fill(contextKeyNameArr[key2], 60)  , fontsize=6)
					#plt.grid(True)

					#Remove Automatic scientific calculation of X axis:
					ax = plt.gca()
					ax.get_xaxis().get_major_formatter().set_scientific(False)
					ax.get_yaxis().get_major_formatter().set_scientific(False)
					ax.spines['bottom'].set_color('#7F7F7F')
					ax.spines['top'].set_color('#7F7F7F') 
					ax.spines['right'].set_color('#7F7F7F')
					ax.spines['left'].set_color('#7F7F7F')
					ax.tick_params(axis='x', colors='#7F7F7F')
					ax.tick_params(axis='y', colors='#7F7F7F')

					#Save image in a name
					fig = plt.gcf()
					fig.set_size_inches(5.5, 3.5)
					fig.savefig(settings.MEDIA_PATH+'/correlate/'+contextKeyIdArr[key2]+'_2_'+uniqueId+'.png')# , dpi = 800)
					plt.close()

	       except Exception as ex:
			print "Exception Plot 2 :: %s"%ex

	       #Create a Json with	
	       serialized_data = json.dumps({ 'id' : uniqueId, 'correlatedata':correlateValue })
	      	
       else: 
	       serialized_data = ''

	
       response = HttpResponse(serialized_data, content_type='text/plain')
       response['Content-Length'] = len(serialized_data)
       print "response"
       print response
       return response
    except Exception as e:
       print "Exception inside correlate_data in views.py :: %s" %e
       return None

#key data call
def keydetail(request):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    orgID = OrganizationUser.objects.get(user=request.user.id).organization_id
    querystr=[]
    accessToken=None
    apiKey=None
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)

    #oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')
    url = 'http://'+settings.API_IP+'/scisphere/places/keydetail?'+query+'&api_key='+apiKey+'&orgid='+str(orgID)
    print url
    request1 = urllib2.Request(url)
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()
    
    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    return response

#dataexplorer filter data call
def filter_data(request, id):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    stateid = id
    querystr=[]
    filtersArrayQuery = ''
    ecArrayQuery = ''
    rangeArr = []
    rangeArr_ec= []
    termArr = []
    mylocation = []
    body = ''
    ec_dt = 0
    pca_dt = 0
    templateName=None
    selectedvariables=None

    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)

       if key == "mylocation":
          mylocation.append(valuelist[0].strip())
       if key == "selectedvariables":
          selectedvariables = valuelist[0].strip()

       querystr.extend(['%s=%s' % (key, val) for val in valuelist])

       """if key == "templateName":
          templateName=valuelist[0].strip()

       if key == "filter":
	  for val in valuelist[0].split(','):
	     filters_key  = re.compile('eq(.*?)year', re.DOTALL |  re.IGNORECASE).findall(val)
	     if len(valuelist[0]) > 2:
	        filters_key1 = filters_key[0].replace("$","").lower()

	        range_of_key  = re.compile('btw(.*?)}', re.DOTALL |  re.IGNORECASE).findall(val)
 	        range_of_keys = range_of_key[0].split('~')
	        if len(filtersArrayQuery) == 0:
		   ranges = '{"range":{"'+filters_key1.strip()+'":{"gte":'+range_of_keys[0].strip()+',"lte":'+range_of_keys[1].strip()+'}}}'
	        else:		
		   ranges =',{"range":{"'+filters_key1.strip()+'":{"gte":'+range_of_keys[0].strip()+',"lte":'+range_of_keys[1].strip()+'}}}'
	        rangeArr.append(ranges)
	        filtersArrayQuery += ranges
	     else:
		pca_dt = 1  	

       elif key == "mylocation":
	  mylocation.append(valuelist[0].strip())

       elif key == "ec":
	  for val in valuelist[0].split(','):
	     ec_key  = re.compile('eq(.*?)year', re.DOTALL |  re.IGNORECASE).findall(val)
             ec_var_name = ''
	     if len(valuelist[0]) < 3:
	  	ec_dt = 1 		
		
	     if ec_key:	
	     	ec_key1 = ec_key[0].replace("$","")
	        ec_key2 = ec_key1.split('-')		
	        if len(ec_key2) > 2:
	           ec_var_name = ec_key2[1]+'.'+ ec_key2[2]	
		else:
		   ec_var_name = ec_key2[0] 	

	        range_of_key  = re.compile('btw(.*?)}', re.DOTALL |  re.IGNORECASE).findall(val)
	        range_of_keys = range_of_key[0].split('~')
	        if len(ecArrayQuery) == 0:
		    ranges_ec = '{"range":{"value.Economic_Census_2005.'+ec_var_name.strip()+'":{"gte":'+range_of_keys[0].strip()+',"lte":'+range_of_keys[1].strip()+'}}}'
	        else:		
		    ranges_ec =',{"range":{"value.Economic_Census_2005.'+ec_var_name.strip()+'":{"gte":'+range_of_keys[0].strip()+',"lte":'+range_of_keys[1].strip()+'}}}'
	        rangeArr_ec.append(ranges_ec)
	        ecArrayQuery += ranges_ec

       else:
	  if len(filtersArrayQuery)  == 0 and len(ecArrayQuery) == 0:
	     term =""
	     if key == 'level0':
	        term = '{"term":{"id_0": "'+valuelist[0].strip()+'"}}'
		term += ',{"term":{"id_1": "'+stateid+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	     if key == 'level2':
		term += ',{"term":{"id_2": "'+valuelist[0].strip()+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	     if key == 'leveltype':
		term = '{"term":{ "leveltype":'+valuelist[0].strip()+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	  else:
	     term =""
	     if key == 'level0':
	        term += ',{"term":{"id_0": "'+valuelist[0].strip()+'"}}'
		term += ',{"term":{"id_1": "'+stateid+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	     if key == 'level2':
		term += ',{"term":{"id_2": "'+valuelist[0].strip()+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	     if key == 'leveltype':
		term = ',{"term":{ "leveltype": "'+valuelist[0].strip().lower()+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term



       querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)
    query = query.replace(' ','%20')


    filtersArrayQueryList = list(filtersArrayQuery)
    if(filtersArrayQueryList[0]==','):
	filtersArrayQueryList[0]=''
	filtersArrayQuery = "".join(filtersArrayQueryList)
    ecArrayQueryList = list(ecArrayQuery)
    if(ecArrayQueryList[0]==','):
	ecArrayQueryList[0]=''
	ecArrayQuery = "".join(ecArrayQueryList)"""

    query = '&'.join(querystr)
    query = query.replace(' ','%20')

    try:
       selectedvariables = json.loads(selectedvariables)
       for keyName in selectedvariables:
          check = subscription_check(keyName,stateid,request.user.id)
          if check != True:
             result={}
             result['subscription']=check
             result = json.dumps(result)
             response = HttpResponse(result, content_type='json/plain')
             response['Content-Length'] = len(result)
             return response
    except Exception as e:
       print "Exception inside filter_data - subscription check : %s" %e


    uploadedDate=''
    try:
       org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
       myTemplateList = MyTemplate.objects.filter(org_id=org_id,mytemplate_name=templateName)
       customerDatasetList = CustomerDatasetUpload.objects.filter(org_id=org_id,mytemplate_id=myTemplateList[0].id).order_by('-uploaded_date')[:1]
       uploadedDate=customerDatasetList[0].uploaded_date
    except Exception as e:
       print 'Exception inside filter_data (getting uploaded date) :: %s' % e


    #url = 'http://'+settings.API_IP+'/scisphere/places/'+stateid+'?api_key='+request.session.get('api_key')+'&'+query
    #url = 'http://'+settings.API_IP+'/scisphere/places/'+stateid+'/myvarfilter?api_key='+request.session.get('api_key')+'&'+query
    url = 'http://'+settings.API_IP+'/scisphere/places/'+stateid+'?api_key='+request.session.get('api_key')+'&'+query+'&date='+str(uploadedDate)
    print url
    """body = filtersArrayQuery
    if(len(rangeArr) == 0):
       body = ''
    #data1 = '{"from": 0,"size": 100000,"query": {"match_all": {}},"filter" :{"query" :{"bool" :{"must": [ '+body+']}}},"_source": {"include": ["id_0","name_0","id_1","name_1","id_2","name_2","id_3","name_3","id_4","name_4","latitude","longitude"]}}'
    #data2 = '{"from": 0,"size": 100000,"query": {"match_all": {}},"filter" :{"query" :{"bool" :{"must": [ '+ecArrayQuery+']}}},"_source": {"include": ["id_0","name_0","id_1","name_1","id_2","name_2","id_3","name_3","id_4","name_4","latitude","longitude"]}}'
    # new version 
    data1 = '{"from": 0,"size": 100000, "index": "pca_beta_v4", "body":{ "query": {"match_all": {}},"filter" :{"query" :{"bool" :{"must": [ '+body+']}}},"_source": {"include": ["id_0","name_0","id_1","name_1","id_2","name_2","id_3","name_3","id_4","name_4","latitude","longitude","geolocation"]}}}'
    data2 = '{"from": 0,"size": 100000,"index": "ec_beta_v3", "body":{ "query": {"match_all": {}},"filter" :{"query" :{"bool" :{"must": [ '+ecArrayQuery+']}}},"_source": {"include": ["id_0","name_0","id_1","name_1","id_2","name_2","id_3","name_3","id_4","name_4","latitude","longitude"]}}}'#]}}'
    data3 = '{"from": 0,"size": 10000, "index": "'+mylocation[0]+'","body":{"query": {"match_all": {}}}}'
    if len(mylocation[0])==0:
       data3 = ''

    if (pca_dt == 0 and ec_dt == 0):
	data = '{"pca": ['+data1+'],"economiccensus":  ['+data2+'], "mylocation":['+data3+'] ,"check":['+request.body+']}'
    elif (pca_dt == 0 and  ec_dt == 1):
	data = '{"pca": ['+data1+'],"economiccensus":  [], "mylocation":['+data3+'],"check":['+request.body+']}'
    elif (pca_dt == 1 and  ec_dt == 0):
	data = '{"pca": [],"economiccensus":  ['+data2+'], "mylocation":['+data3+'],"check":['+request.body+']}'
    elif (pca_dt == 1 and  ec_dt == 1):
	data = '{"pca": [],"economiccensus":  [], "mylocation":['+data3+'],"check":['+request.body+']}'"""
    #ur = '/scisphere/places/'+stateid+'?api_key='+request.session.get('api_key')+'&'+query +'' 
    try:
       #if(len(rangeArr) > 0 or len(rangeArr_ec) > 0 or len(mylocation[0]) >0):
          #r = urllib2.Request(url, data, headers={'Content-Type': 'application/json'})

       # userTransaction entry
       userTransaction(url,request.body,"Filter",request.user.id,org_id,stateid)

       r = urllib2.Request(url, request.body, headers={'Content-Type': 'application/json'})
       r.add_header("Authorization", "Bearer "+ request.session.get('access_tk'))
       serialized_data = urllib2.urlopen(r).read()

       response = HttpResponse(serialized_data, content_type='text/plain')
       response['Content-Length'] = len(serialized_data)
       return response
    except urllib2.URLError, e:
       error = "Server not found"
       response = HttpResponse(error, content_type='text/plain')
       response['Content-Length'] = len(error)
       return response


@login_required
def filter_data_google_api(request, id):
    try:
       bodyJson = json.loads(request.body)
       url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ id +'&radius='+bodyJson['radius']+'000&types='+bodyJson['layer_needed']+'&name='+bodyJson['layer_needed']+'&key=AIzaSyA0KxkjGsrSKfAd-JHKf841xVRP_WCuwe8'

       if len(bodyJson['nxt_token']) > 0:
	   #url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ id +'&radius='+bodyJson['radius']+'000&types=bank&name=bank&key=AIzaSyA0KxkjGsrSKfAd-JHKf841xVRP_WCuwe8&&pagetoken='+bodyJson['nxt_token']+''		
	   url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ id +'&radius='+bodyJson['radius']+'000&types='+bodyJson['layer_needed']+'&name='+bodyJson['layer_needed']+'&key=AIzaSyA0KxkjGsrSKfAd-JHKf841xVRP_WCuwe8&&pagetoken='+bodyJson['nxt_token']+''		
       print url          	

       querystr=[]
       keyName=None
       accessToken=None
       apiKey=None

       #oauth accesstoken
       if request.session.get('access_tk'):
          accessToken = request.session.get('access_tk')
          apiKey = request.session.get('api_key')

       request1 = urllib2.Request( url, headers={'Content-Type': 'application/json'} )
       request1.add_header("Authorization", "Bearer"+ accessToken)
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()

       response = HttpResponse(serialized_data, content_type='json/plain')
       response['Content-Length'] = len(serialized_data)
       return response	
    except Exception as e:
	print "Exception in filters data google api  :: %s" %e

@login_required
def layers_data(request):
    print "layers_data"
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)


    querystr=[]
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)

    accessToken = request.session.get('access_tk')
    apiKey = request.session.get('api_key')
    url = 'http://'+settings.API_IP+'/scisphere/places/layers?api_key='+apiKey+'&'+query
    print url
    try:
       request1 = urllib2.Request(url, headers={'Content-Type': 'application/json'})
       request1.add_header("Authorization", "Bearer "+ accessToken)
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()
       print "serialized_data"
       response = HttpResponse(serialized_data, content_type='text/plain')
       response['Content-Length'] = len(serialized_data)
       return response
    except urllib2.URLError, e:
       error = "Server not found"
       response = HttpResponse(error, content_type='text/plain')
       response['Content-Length'] = len(error)
       return response


@login_required
def filter_listofvillages(request):
    print "layers_data"
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)

    querystr=[]
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)

    #AccessToken
    accessToken = request.session.get('access_tk')
    apiKey = request.session.get('api_key')

    orgID = OrganizationUser.objects.get(user=request.user.id).organization_id

    url = 'http://'+settings.API_IP+'/scisphere/places/villagelist?api_key='+apiKey+'&orgid='+str(orgID)+'&'+query
    print url

    try:
       request1 = urllib2.Request(url, request.body, headers={'Content-Type': 'application/json'})
       request1.add_header("Authorization", "Bearer "+ accessToken)
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()

       response = HttpResponse(serialized_data, content_type='text/plain')
       response['Content-Length'] = len(serialized_data)
       return response
    except urllib2.URLError, e:
       error = "Server not found"
       response = HttpResponse(error, content_type='text/plain')
       response['Content-Length'] = len(error)
       return response

def get_workbook_list(request):
    context = RequestContext(request)
    workBookData=""
    try:
       wbName=None
       for key in request.GET.iterkeys():
          valuelist = request.GET.getlist(key)

          if key == "wbname":
             wbName = valuelist[0].strip()

       workBookList = list(Workbook.objects.filter(user_id = request.user.id,workbook_name=wbName))

       if len(workBookList)>0:
          workBookData = serializers.serialize('json', workBookList)
       else:
          workBookData = "No Result Found"

    except Exception as e:
       print "Exception inside get_workbook_list in views.py :: %s" % e

    return HttpResponse(workBookData, mimetype='application/json')


def filter_data_old(request, id):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    stateid = id
    querystr=[]
    filtersArrayQuery = ''
    ecArrayQuery = ''
    rangeArr = []
    rangeArr_ec= []
    termArr = []
    mylocation = []
    body = ''
    ec_dt = 0
    pca_dt = 0
    templateName=None
    selectedvariables=None

    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)

       if key == "templateName":
          templateName=valuelist[0].strip()

       if key == "filter":
	  for val in valuelist[0].split(','):
	     filters_key  = re.compile('eq(.*?)year', re.DOTALL |  re.IGNORECASE).findall(val)
	     if len(valuelist[0]) > 2:
	        filters_key1 = filters_key[0].replace("$","").lower()

	        range_of_key  = re.compile('btw(.*?)}', re.DOTALL |  re.IGNORECASE).findall(val)
 	        range_of_keys = range_of_key[0].split('~')
	        if len(filtersArrayQuery) == 0:
		   ranges = '{"range":{"'+filters_key1.strip()+'":{"gte":'+range_of_keys[0].strip()+',"lte":'+range_of_keys[1].strip()+'}}}'
	        else:		
		   ranges =',{"range":{"'+filters_key1.strip()+'":{"gte":'+range_of_keys[0].strip()+',"lte":'+range_of_keys[1].strip()+'}}}'
	        rangeArr.append(ranges)
	        filtersArrayQuery += ranges
	     else:
		pca_dt = 1  	

       elif key == "mylocation":
	  mylocation.append(valuelist[0].strip())

       elif key == "ec":
	  for val in valuelist[0].split(','):
	     ec_key  = re.compile('eq(.*?)year', re.DOTALL |  re.IGNORECASE).findall(val)
             ec_var_name = ''
	     if len(valuelist[0]) < 3:
	  	ec_dt = 1 		
		
	     if ec_key:	
	     	ec_key1 = ec_key[0].replace("$","")
	        ec_key2 = ec_key1.split('-')		
	        if len(ec_key2) > 2:
	           ec_var_name = ec_key2[1]+'.'+ ec_key2[2]	
		else:
		   ec_var_name = ec_key2[0] 	

	        range_of_key  = re.compile('btw(.*?)}', re.DOTALL |  re.IGNORECASE).findall(val)
	        range_of_keys = range_of_key[0].split('~')
	        if len(ecArrayQuery) == 0:
		    ranges_ec = '{"range":{"value.Economic_Census_2005.'+ec_var_name.strip()+'":{"gte":'+range_of_keys[0].strip()+',"lte":'+range_of_keys[1].strip()+'}}}'
	        else:		
		    ranges_ec =',{"range":{"value.Economic_Census_2005.'+ec_var_name.strip()+'":{"gte":'+range_of_keys[0].strip()+',"lte":'+range_of_keys[1].strip()+'}}}'
	        rangeArr_ec.append(ranges_ec)
	        ecArrayQuery += ranges_ec

       else:
	  if len(filtersArrayQuery)  == 0 and len(ecArrayQuery) == 0:
	     term =""
	     if key == 'level0':
	        term = '{"term":{"id_0": "'+valuelist[0].strip()+'"}}'
		term += ',{"term":{"id_1": "'+stateid+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	     if key == 'level2':
		term += ',{"term":{"id_2": "'+valuelist[0].strip()+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	     if key == 'leveltype':
		term = '{"term":{ "leveltype":'+valuelist[0].strip()+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	  else:
	     term =""
	     if key == 'level0':
	        term += ',{"term":{"id_0": "'+valuelist[0].strip()+'"}}'
		term += ',{"term":{"id_1": "'+stateid+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	     if key == 'level2':
		term += ',{"term":{"id_2": "'+valuelist[0].strip()+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term

	     if key == 'leveltype':
		term = ',{"term":{ "leveltype": "'+valuelist[0].strip().lower()+'"}}'
		filtersArrayQuery += term
		ecArrayQuery += term



       querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)
    query = query.replace(' ','%20')


    filtersArrayQueryList = list(filtersArrayQuery)
    if(filtersArrayQueryList[0]==','):
	filtersArrayQueryList[0]=''
	filtersArrayQuery = "".join(filtersArrayQueryList)
    ecArrayQueryList = list(ecArrayQuery)
    if(ecArrayQueryList[0]==','):
	ecArrayQueryList[0]=''
	ecArrayQuery = "".join(ecArrayQueryList)


    uploadedDate=''
    try:
       org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
       myTemplateList = MyTemplate.objects.filter(org_id=org_id,mytemplate_name=templateName)
       customerDatasetList = CustomerDatasetUpload.objects.filter(org_id=org_id,mytemplate_id=myTemplateList[0].id).order_by('-uploaded_date')[:1]
       uploadedDate=customerDatasetList[0].uploaded_date
    except Exception as e:
       print 'Exception inside filter_data (getting uploaded date) :: %s' % e


    #url = 'http://'+settings.API_IP+'/scisphere/places/'+stateid+'?api_key='+request.session.get('api_key')+'&'+query
    #url = 'http://'+settings.API_IP+'/scisphere/places/'+stateid+'/myvarfilter?api_key='+request.session.get('api_key')+'&'+query
    url = 'http://'+settings.API_IP+'/scisphere/places/'+stateid+'?api_key='+request.session.get('api_key')+'&'+query+'&date='+str(uploadedDate)
    print url
    body = filtersArrayQuery
    if(len(rangeArr) == 0):
       body = ''

    #data1 = '{"from": 0,"size": 100000,"query": {"match_all": {}},"filter" :{"query" :{"bool" :{"must": [ '+body+']}}},"_source": {"include": ["id_0","name_0","id_1","name_1","id_2","name_2","id_3","name_3","id_4","name_4","latitude","longitude"]}}'
    #data2 = '{"from": 0,"size": 100000,"query": {"match_all": {}},"filter" :{"query" :{"bool" :{"must": [ '+ecArrayQuery+']}}},"_source": {"include": ["id_0","name_0","id_1","name_1","id_2","name_2","id_3","name_3","id_4","name_4","latitude","longitude"]}}'
    # new version 
    data1 = '{"from": 0,"size": 100000, "index": "pca_beta_v4", "body":{ "query": {"match_all": {}},"filter" :{"query" :{"bool" :{"must": [ '+body+']}}},"_source": {"include": ["id_0","name_0","id_1","name_1","id_2","name_2","id_3","name_3","id_4","name_4","latitude","longitude","geolocation"]}}}'
    data2 = '{"from": 0,"size": 100000,"index": "ec_beta_v3", "body":{ "query": {"match_all": {}},"filter" :{"query" :{"bool" :{"must": [ '+ecArrayQuery+']}}},"_source": {"include": ["id_0","name_0","id_1","name_1","id_2","name_2","id_3","name_3","id_4","name_4","latitude","longitude"]}}}'#]}}'
    data3 = '{"from": 0,"size": 10000, "index": "'+mylocation[0]+'","body":{"query": {"match_all": {}}}}'
    if len(mylocation[0])==0:
       data3 = ''

    if (pca_dt == 0 and ec_dt == 0):
	data = '{"pca": ['+data1+'],"economiccensus":  ['+data2+'], "mylocation":['+data3+'] ,"check":['+request.body+']}'
    elif (pca_dt == 0 and  ec_dt == 1):
	data = '{"pca": ['+data1+'],"economiccensus":  [], "mylocation":['+data3+'],"check":['+request.body+']}'
    elif (pca_dt == 1 and  ec_dt == 0):
	data = '{"pca": [],"economiccensus":  ['+data2+'], "mylocation":['+data3+'],"check":['+request.body+']}'
    elif (pca_dt == 1 and  ec_dt == 1):
	data = '{"pca": [],"economiccensus":  [], "mylocation":['+data3+'],"check":['+request.body+']}'
    #ur = '/scisphere/places/'+stateid+'?api_key='+request.session.get('api_key')+'&'+query +'' 
   
    try:
       if(len(rangeArr) > 0 or len(rangeArr_ec) > 0 or len(mylocation[0]) >0):
	  #r = urllib2.Request(url, data, headers={'Content-Type': 'application/json'})
	  r = urllib2.Request(url, request.body, headers={'Content-Type': 'application/json'})
          r.add_header("Authorization", "Bearer "+ request.session.get('access_tk'))
	  serialized_data = urllib2.urlopen(r).read()

       response = HttpResponse(serialized_data, content_type='text/plain')
       response['Content-Length'] = len(serialized_data)
       return response
    except urllib2.URLError, e:
       error = "Server not found"
       response = HttpResponse(error, content_type='text/plain')
       response['Content-Length'] = len(error)
       return response


def level3data(request, level1Id, level2Id):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    querystr=[]
    accessToken=None
    apiKey=None
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
    query = '&'.join(querystr)

    #oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')
    url = 'http://'+settings.API_IP+'/scisphere/places/'+level1Id+'/'+level2Id+'?'+query+'&api_key='+apiKey
    request1 = urllib2.Request(url)
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()

    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    return response



### my build
####  snapshot ###

### my build
####  snapshot ###

# List for the snapshot page to add details that the user browsed in snapshot
# This is saved by user id:
@login_required
def mysphere_mybuilds_for_snapshot(request, id):

    context = RequestContext(request)
    context.content_user = request.user.id
    stateid = id
    rangeObj = {}

    #Initialize the variable to set values:
    level =''
    levels =''
    level_id =''
    region_key=''
    level_0_id =''
    level_1_id =''
    level_2_id =''
    level_type =''
    snapshot_id=''
    mybuilds_id = ''
    selectedVariables = ''
    selectedMyVariable =""
    region_from_filter = ''
    filter_from_not_snapshot = ''
    region_from_not_snapshot = ''
    trend_from_not_snapshot = ''

    #Get the last details of region and filters to save along with the present snapshot to keep history:
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:1]
    myBuild_for_filters_limit_1 = []

    #Append the last detail in to mybuild variable:
    for detail in details:
	mybuilds_id = detail.mybuild_id.id	
	myBuild_for_filters_limit_1.append(detail.mybuild_id.build_conf)

    #Assign the values of filters and regions into a variable to set in the database:
    if(len(myBuild_for_filters_limit_1) > 0):	
        jvalue = json.loads(myBuild_for_filters_limit_1[0])
	if jvalue.has_key("filters"):
	     filter_from_not_snapshot = jvalue["filters"]
	if jvalue.has_key("region"):
	     region_from_not_snapshot = jvalue["region"]
	if jvalue.has_key("trend"):
	     trend_from_not_snapshot = jvalue["trend"]
	if jvalue.has_key("selectedMyVariable"):
	     #selectedMyVariable = jvalue["selectedMyVariable"]
	     selectedMyVariable = simplejson.dumps(jvalue["selectedMyVariable"])

    #Getting values from the url query string and assigning to a varaible:    
    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)
       if key == "filter":
	  for val in	valuelist[0].split(','):
	     filters_key  = re.compile('eq(.*?)year', re.DOTALL |  re.IGNORECASE).findall(val)
	     filters_key1 = filters_key[0].replace("$","")
	     range_of_key  = re.compile('btw(.*?)}', re.DOTALL |  re.IGNORECASE).findall(val)
	     rangeObj[filters_key1.strip()] = range_of_key[0].strip()	
       else:
	     if key == 'level0':
		level_0_id = valuelist[0].strip()
		level_1_id = stateid
	     if key == 'level2':
		level_2_id = valuelist[0].strip()
	     if key == 'leveltype':
		level_type = valuelist[0].strip()
	     if key == 'level':
		level = valuelist[0]
	     if key == 'levels':
		levels = valuelist[0]
	     if key == 'levelid':
		level_id = valuelist[0]	
	     if key == 'selectedvariables':
		selectedVariables = valuelist[0]
	     if key == 'selectedMyVariable':
		selectedMyVariable = valuelist[0]
	     if key == 'snapshot_id':
		snapshot_id = valuelist[0].strip()
	     if key == 'region_key':
		region_key = valuelist[0].strip()

    #Create an object of the MODELS of mybuilds:    
    mybuild_form = ''	
    if mybuilds_id:	 
        mybuild_form = MyBuild.objects.filter(id = mybuilds_id)#pk=kwargs['id']
    SavedLists_form = SavedLists()	
	  
    #Convert array variable into a json for filters and regions :    
    rangeObj_text = simplejson.dumps(rangeObj)
    rangeObj_filter_from_not_snapshot = simplejson.dumps(filter_from_not_snapshot)
    rangeObj_region_from_not_snapshot = simplejson.dumps(region_from_not_snapshot)
    rangeObj_trend_from_not_snapshot = simplejson.dumps(trend_from_not_snapshot)
    #selectedMyVariable = json.dumps(selectedMyVariable)	 

    if not selectedMyVariable:
	selectedMyVariable = '""'
    selectedMyVariable = str(selectedMyVariable) 

    #Building a variable to set inside MYBUILDS with region,snapshot and filters data:    
    if(level_2_id):	
        build_json = '{ "level":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'"}, "variable":'+selectedVariables+', "selectedMyVariable":'+selectedMyVariable+', "snapshot": { "level_0":"'+level_0_id+'", "level_1":"'+level_1_id+'","levels":"'+levels+'","level_id":"'+level_id+'" } , "trend":'+rangeObj_trend_from_not_snapshot+' ,"region":'+rangeObj_region_from_not_snapshot+', "filters":'+ rangeObj_filter_from_not_snapshot +' }'	
    else:
        build_json = '{ "level":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'"}, "variable":'+selectedVariables+', "selectedMyVariable":'+selectedMyVariable+', "snapshot": { "level_0":"'+level_0_id+'", "level_1":"'+level_1_id+'","levels":"'+levels+'","level_id":"'+level_id+'" } , "trend":'+rangeObj_trend_from_not_snapshot+'  , "region":'+rangeObj_region_from_not_snapshot+', "filters":'+  rangeObj_filter_from_not_snapshot +' }'	


    #My Builds:
    try:
	if mybuild_form:
	        mybuild_form = mybuild_form[0]
		mybuild_form.build_name = 'New name'
		mybuild_form.build_conf = build_json
		mybuild_form.save()
	else:
		mybuild_form = MyBuild()
		mybuild_form.build_name = 'New name'
		mybuild_form.build_conf = build_json
		mybuild_form.save()

    except Exception as ex:
    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
	message = template.format(type(ex).__name__, ex.args)
    	print message
	print "Not saved in mybuild of main models.userbuild_models:"


    #MySphere	
    try:  
	mysphere_form = MySphere.objects.filter(user_id = request.user.id)						
	if mysphere_form:
		mysphere_form = mysphere_form[0]
		mysphere_form.user_id = request.user.id	
		mysphere_form.mybuild_id = MyBuild(id=mybuild_form.id)
		mysphere_form.save()
	else:
		mysphere_form = MySphere()
		mysphere_form.user_id = request.user.id	
		mysphere_form.mybuild_id = MyBuild(id=mybuild_form.id)
		mysphere_form.save()

    except Exception as ex:
    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
	message = template.format(type(ex).__name__, ex.args)
    	print message
	print "Not saved in mysphere of main models.userbuild_models:"

    #After saving. Get the details of the last ten historys of the user:    
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:10]
   	
    #Assign the last 10 history to a variable:
    myBuild_limit_10 = []
    for detail in details:
	myBuild_limit_10.append(detail.mybuild_id.build_conf)

    #Construct a variable with the user details and history:
    exports = {'username': request.user.username,
		'user_id': request.user.id,
		'MyBuild': myBuild_limit_10,
               }
    response_text = simplejson.dumps(exports)
    return HttpResponse(response_text, mimetype='application/json')



# List for the snapshot page to view details of previously browsed in snapshot
# This is filtered by user:
@login_required
def mysphere_mybuilds_for_region_snapshot_list(request, id):
    context = RequestContext(request)
    context.content_user = request.user.id

    #last ten changes list:
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:10]
    myBuild_limit_10 = []
    for detail in details:
	myBuild_limit_10.append(detail.mybuild_id.build_conf)

    #construct the list:
    exports = {'username': request.user.username,
		'user_id': request.user.id,
		'MyBuild': myBuild_limit_10,
               }
    #Convert into json:
    response_text = simplejson.dumps(exports)
    return HttpResponse(response_text, mimetype='application/json')



# List for the Regions page to add details that the user browsed in snapshot
# This is saved by user id:
@login_required
def mysphere_mybuilds_for_region_snapshot(request, id):
    	
    context = RequestContext(request)
    context.content_user = request.user.id

    #Initialize the variable to set values:
    level =''
    region_key=''
    stateid = id
    rangeObj = {}
    level_0_id =''
    level_1_id =''
    level_2_id =''
    level_type =''
    snapshot_id=''
    mybuilds_id = ''
    selectedVariables = ''
    selectedMyVariable = ""
    region_from_filter = ''
    filter_from_not_region = ''
    snapshot_from_not_region =''
    trend_from_not_region =''

    #Get the last details of region and filters to save along with the present snapshot to keep history:
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:1]
    myBuild_for_filters_limit_1 = []

    #Append the last detail in to mybuild variable:
    for detail in details:	
	mybuilds_id = detail.mybuild_id.id
	myBuild_for_filters_limit_1.append(detail.mybuild_id.build_conf)

    #Assign the values of filters and regions into a variable to set in the database:
    if(len(myBuild_for_filters_limit_1) > 0):	
        jvalue = json.loads(myBuild_for_filters_limit_1[0])
	if jvalue.has_key("filters"):
	     filter_from_not_region = jvalue["filters"]
	if jvalue.has_key("snapshot"):
	     snapshot_from_not_region = jvalue["snapshot"]
	if jvalue.has_key("trend"):
	     trend_from_not_region = jvalue["trend"]
	if jvalue.has_key("selectedMyVariable"):
	     selectedMyVariable = simplejson.dumps(jvalue["selectedMyVariable"])


    #Getting values from the url query string and assigning to a varaible:     
    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)
       if key == "filter":
	  for val in	valuelist[0].split(','):
	     filters_key  = re.compile('eq(.*?)year', re.DOTALL |  re.IGNORECASE).findall(val)
	     filters_key1 = filters_key[0].replace("$","")
	     range_of_key  = re.compile('btw(.*?)}', re.DOTALL |  re.IGNORECASE).findall(val)
	     rangeObj[filters_key1.strip()] = range_of_key[0].strip()	
       else:
	     if key == 'level0':
		level_0_id = valuelist[0].strip()
		level_1_id = stateid
	     if key == 'level2':
		level_2_id = valuelist[0].strip()
	     if key == 'leveltype':
		level_type = valuelist[0].strip()
	     if key == 'level':
		level = valuelist[0]
	     if key == 'selectedvariables':
		selectedVariables = valuelist[0]
	     if key == 'selectedMyVariable':
		selectedMyVariable = valuelist[0]
	     if key == 'snapshot_id':
		snapshot_id = valuelist[0].strip()
	     if key == 'region_key':
		region_key = valuelist[0].strip()

    #Create an object of the MODELS of mybuilds: 
    mybuild_form = ''	
    if mybuilds_id:	 
        mybuild_form = MyBuild.objects.filter(id = mybuilds_id)#pk=kwargs['id']
    SavedLists_form = SavedLists()	
	  
    #Convert array variable into a json for filters and regions : 
    rangeObj_text = simplejson.dumps(rangeObj)
    rangeObj_filter_from_not_region = simplejson.dumps(filter_from_not_region)
    rangeObj_snapshot_from_not_region = simplejson.dumps(snapshot_from_not_region)
    rangeObj_trend_from_not_region = simplejson.dumps(trend_from_not_region)
    #selectedMyVariable = json.dumps(selectedMyVariable)

    if not selectedMyVariable:
	selectedMyVariable = '""'
    selectedMyVariable = str(selectedMyVariable) 

    #Building a variable to set inside MYBUILDS with region,snapshot and filters data:  
    if(level_2_id):	
        build_json = '{ "level":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'"}, "variable":'+selectedVariables+', "selectedMyVariable": '+selectedMyVariable+', "snapshot": '+ rangeObj_snapshot_from_not_region +', "region":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'","snapshot_id":"'+snapshot_id+'","region_key":"'+region_key+'","level":"'+level+'"}, "filters":'+ rangeObj_filter_from_not_region +' }'	
    else:
        build_json = '{ "level":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'"}, "variable":'+selectedVariables+', "selectedMyVariable": '+selectedMyVariable+', "trend": '+ rangeObj_trend_from_not_region+', "snapshot": '+ rangeObj_snapshot_from_not_region +', "region":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'","snapshot_id":"'+snapshot_id+'","region_key":"'+region_key+'","level":"'+level+'"}, "filters":'+ rangeObj_filter_from_not_region +' }'	

    #My Builds:
    try:
	if mybuild_form:
	        mybuild_form = mybuild_form[0]
		mybuild_form.build_name = 'New name'
		mybuild_form.build_conf = build_json
		mybuild_form.save()
	else:
		mybuild_form = MyBuild()
		mybuild_form.build_name = 'New name'
		mybuild_form.build_conf = build_json
		mybuild_form.save()
    except Exception as ex:
    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
	message = template.format(type(ex).__name__, ex.args)
    	print message
	print "Not saved in mybuild of main models.userbuild_models:"

    #MySphere	
    try:  
	mysphere_form = MySphere.objects.filter(user_id = request.user.id)						
	if mysphere_form:
		mysphere_form = mysphere_form[0]
		mysphere_form.user_id = request.user.id	
		mysphere_form.mybuild_id = MyBuild(id=mybuild_form.id)
		mysphere_form.save()
	else:
		mysphere_form = MySphere()
		mysphere_form.user_id = request.user.id	
		mysphere_form.mybuild_id = MyBuild(id=mybuild_form.id)
		mysphere_form.save()
    except Exception as ex:
    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
	message = template.format(type(ex).__name__, ex.args)
    	print message
	print "Not saved in mysphere of main models.userbuild_models:"

    #After saving. Get the details of the last ten historys of the user:    
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:10]
   	
    #Assign the last 10 history to a variable:
    myBuild_limit_10 = []
    for detail in details:
	myBuild_limit_10.append(detail.mybuild_id.build_conf)

    #Construct a variable with the user details and history:
    exports = {'username': request.user.username,
		'user_id': request.user.id,
		'MyBuild': myBuild_limit_10,
               }
    response_text = simplejson.dumps(exports)
    return HttpResponse(response_text, mimetype='application/json')



### filters ###
# List for the filters page to view details of previously browsed in snapshot
# This is filtered by user:
@login_required
def mysphere_mybuilds_for_filters_list(request, id):
    context = RequestContext(request)
    context.content_user = request.user.id

    #last ten changes list:
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:10]
    myBuild_limit_10 = []
    for detail in details:
	myBuild_limit_10.append(detail.mybuild_id.build_conf)

    #construct the list:
    exports = {'username': request.user.username,
		'user_id': request.user.id,
		'MyBuild': myBuild_limit_10,
               }

    #Convert into json:
    response_text = simplejson.dumps(exports)
    return HttpResponse(response_text, mimetype='application/json')



# List for the filters page to add details that the user browsed in snapshot
# This is saved by user id:
@login_required
def mysphere_mybuilds_for_filters(request, id):
    context = RequestContext(request)
    context.content_user = request.user.id

    #Initialize the variable to set values:
    level =''
    stateid = id
    rangeObj = {}
    myVarRangeObj = {}
    level_0_id =''
    level_1_id =''
    level_2_id =''
    level_type =''
    mybuilds_id = ''
    selectedVariables = ''
    selectedMyVariable =""
    region_from_not_filter = ''
    snapshot_from_not_filter = ''
    trend_from_not_filter = ''
    mylocation_checked = 'false'
 	

    #Get the last details of region and filters to save along with the present snapshot to keep history:
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:1]
    myBuild_for_filters_limit_1 = []

    #Append the last detail in to mybuild variable:   	
    for detail in details:	
	mybuilds_id = detail.mybuild_id.id
	myBuild_for_filters_limit_1.append(detail.mybuild_id.build_conf)

    #Assign the values of filters and regions into a variable to set in the database:
    if(len(myBuild_for_filters_limit_1) > 0):	
        jvalue = json.loads(myBuild_for_filters_limit_1[0])
	if jvalue.has_key("region"): 
	     region_from_not_filter = jvalue["region"]
	if jvalue.has_key("snapshot"):
	     snapshot_from_not_filter = jvalue["snapshot"]
	if jvalue.has_key("trend"):
	     trend_from_not_filter = jvalue["trend"]

    #Getting values from the url query string and assigning to a varaible:         
    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)
       if key == "filter" or key == "ec":
	  for val in	valuelist[0].split(','):
	     filters_key  = re.compile('eq(.*?)year', re.DOTALL |  re.IGNORECASE).findall(val)
	     if filters_key:
	        filters_key1 = filters_key[0].replace("$","")
	        range_of_key  = re.compile('btw(.*?)}', re.DOTALL |  re.IGNORECASE).findall(val)
	        rangeObj[filters_key1.strip()] = range_of_key[0].strip()
	
       elif key == "myVariableQ":	
	  for val in	valuelist[0].split(','):
	     myVariableQ_key  = re.compile('eq(.*?)year', re.DOTALL |  re.IGNORECASE).findall(val)
	     if myVariableQ_key:
	        myVariableQ_key1 = myVariableQ_key[0].replace("$","")
	        range_of_key  = re.compile('btw(.*?)}', re.DOTALL |  re.IGNORECASE).findall(val)
	        myVarRangeObj[myVariableQ_key1.strip()] = range_of_key[0].strip()  
     
       else:
	     if key == 'level0':
		level_0_id = valuelist[0].strip()
		level_1_id = stateid
	     if key == 'level2':
		level_2_id = valuelist[0].strip()
	     if key == 'leveltype':
		level_type = valuelist[0].strip()
	     if key == 'level':
		level = valuelist[0]
	     if key == 'selectedvariables':
		selectedVariables = valuelist[0]
	     if key == 'selectedMyVariable':
		selectedMyVariable = valuelist[0]
	     if key == 'mylocationcheck':
		mylocation_checked = valuelist[0]

    #Create an object of the MODELS of mybuilds: 
    mybuild_form = ''	
    if mybuilds_id:	 
        mybuild_form = MyBuild.objects.filter(id = mybuilds_id)#pk=kwargs['id']
    SavedLists_form = SavedLists()	
	  
    #Convert array variable into a json for snapshot and regions : 
    rangeObj_text = simplejson.dumps(rangeObj)
    rangeObj_region_from_not_filter = simplejson.dumps(region_from_not_filter)
    rangeObj_snapshot_from_not_filter = simplejson.dumps(snapshot_from_not_filter)
    rangeObj_trend_from_not_filter = simplejson.dumps(trend_from_not_filter)

    #Building a variable to set inside MYBUILDS with region,snapshot and filters data:  
    if(level_2_id):	
        build_json = '{ "level":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'"}, "variable":'+selectedVariables+', "selectedMyVariable":'+selectedMyVariable+',"trend": '+ rangeObj_trend_from_not_filter+', "snapshot": '+ rangeObj_snapshot_from_not_filter +', "region": '+ rangeObj_region_from_not_filter +' , "filters":{  "region":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'","level_2":"'+level_2_id+'","level_type":"'+level_type+'","level":"'+level+'"},"range":'+rangeObj_text+', "myVarRangeObj":'+simplejson.dumps(myVarRangeObj)+', "selectedMyVariable":'+selectedMyVariable+', "mylocation_checked": "'+mylocation_checked +'" }}'	
    else:
	build_json = '{ "level":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'"}, "variable":'+selectedVariables+', "selectedMyVariable":'+selectedMyVariable+', "trend": '+ rangeObj_trend_from_not_filter+', "snapshot": '+ rangeObj_snapshot_from_not_filter +',  "region": '+ rangeObj_region_from_not_filter +', "filters":{  "region":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'","level_2":"'+level_2_id+'","level_type":"'+level_type+'","level":"'+level+'"}, "range":'+rangeObj_text+', "myVarRangeObj":'+simplejson.dumps(myVarRangeObj)+', "selectedMyVariable":'+selectedMyVariable+', "mylocation_checked":"'+mylocation_checked +'"  }}'

    #My Builds:
    try:
	if mybuild_form:
	        mybuild_form = mybuild_form[0]
		mybuild_form.build_name = 'New name'
		mybuild_form.build_conf = build_json
		mybuild_form.save()
	else:
		mybuild_form = MyBuild()
		mybuild_form.build_name = 'New name'
		mybuild_form.build_conf = build_json
		mybuild_form.save()
    except Exception as ex:
    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
	message = template.format(type(ex).__name__, ex.args)
    	print message
	print "Not saved in mybuild of main models.userbuild_models:"

    #MySphere	
    try:  
	mysphere_form = MySphere.objects.filter(user_id = request.user.id)						
	if mysphere_form:
		mysphere_form = mysphere_form[0]
		mysphere_form.user_id = request.user.id	
		mysphere_form.mybuild_id = MyBuild(id=mybuild_form.id)
		mysphere_form.save()
	else:
		mysphere_form = MySphere()
		mysphere_form.user_id = request.user.id	
		mysphere_form.mybuild_id = MyBuild(id=mybuild_form.id)
		mysphere_form.save()
    except Exception as ex:
    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
	message = template.format(type(ex).__name__, ex.args)
    	print message
	print "Not saved in mysphere of main models.userbuild_models:"

    #After saving. Get the details of the last ten historys of the user:    
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:10]
   	
    #Assign the last 10 history to a variable:
    myBuild_limit_10 = []
    for detail in details:
	myBuild_limit_10.append(detail.mybuild_id.build_conf)

    #Construct a variable with the user details and history:
    exports = {'username': request.user.username,
		'user_id': request.user.id,
		'MyBuild': myBuild_limit_10,
               }
    response_text = simplejson.dumps(exports)
    return HttpResponse(response_text, mimetype='application/json')


# List for the snapshot page to add details that the user browsed in snapshot
# This is saved by user id:
@login_required
def mysphere_mybuilds_for_trend(request, id):

    context = RequestContext(request)
    context.content_user = request.user.id
    stateid = id
    rangeObj = {}

    #Initialize the variable to set values:
    level =''
    date_type = ''
    region_key = ''
    level_0_id = ''
    level_1_id = ''
    trend_key = '' 
    trend_product = ''
    snapshot_id= ''
    mybuilds_id = ''
    selectedVariables = ''
    selectedMyVariable =""
    region_from_filter = ''
    filter_from_not_snapshot = ''
    region_from_not_snapshot = ''
    snapshot = ''

    #Get the last details of region and filters to save along with the present snapshot to keep history:
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:1]
    myBuild_for_filters_limit_1 = []

    #Append the last detail in to mybuild variable:
    for detail in details:
	mybuilds_id = detail.mybuild_id.id	
	myBuild_for_filters_limit_1.append(detail.mybuild_id.build_conf)

    #Assign the values of filters and regions into a variable to set in the database:
    if(len(myBuild_for_filters_limit_1) > 0):
	print "myBuild_for_filters_limit_1[0]"
	print myBuild_for_filters_limit_1[0]	
        jvalue = json.loads(myBuild_for_filters_limit_1[0])
	if jvalue.has_key("filters"):
	     filter_from_not_snapshot = jvalue["filters"]
	if jvalue.has_key("region"):
	     region_from_not_snapshot = jvalue["region"]
	if jvalue.has_key("snapshot"):
	     snapshot = jvalue["snapshot"]
	if jvalue.has_key("selectedMyVariable"):
	     #selectedMyVariable = jvalue["selectedMyVariable"]
	     selectedMyVariable = simplejson.dumps(jvalue["selectedMyVariable"])

    #Getting values from the url query string and assigning to a varaible:    
    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)
       if key == "filter":
	  for val in	valuelist[0].split(','):
	     filters_key  = re.compile('eq(.*?)year', re.DOTALL |  re.IGNORECASE).findall(val)
	     filters_key1 = filters_key[0].replace("$","")
	     range_of_key  = re.compile('btw(.*?)}', re.DOTALL |  re.IGNORECASE).findall(val)
	     rangeObj[filters_key1.strip()] = range_of_key[0].strip()	
       else:
	     if key == 'level0':
		level_0_id = valuelist[0].strip()
		level_1_id = stateid
	     if key == 'type':
		date_type = valuelist[0].strip()
	     if key == 'level':
		level = valuelist[0]
	     if key == 'trend_key':
		trend_key = valuelist[0]
	     if key == 'trend_product':
		trend_product = valuelist[0]
	     if key == 'from_date':
		from_date = valuelist[0]
	     if key == 'to_date':
		to_date = valuelist[0]
	     if key == 'selectedvariables':
		selectedVariables = valuelist[0]
	     if key == 'selectedMyVariable':
		selectedMyVariable = valuelist[0]

    #Create an object of the MODELS of mybuilds:    
    mybuild_form = ''	
    if mybuilds_id:	 
        mybuild_form = MyBuild.objects.filter(id = mybuilds_id)#pk=kwargs['id']
    SavedLists_form = SavedLists()	
	  
    #Convert array variable into a json for filters and regions :    
    rangeObj_text = simplejson.dumps(rangeObj)
    rangeObj_filter_from_not_snapshot = simplejson.dumps(filter_from_not_snapshot)
    rangeObj_region_from_not_snapshot = simplejson.dumps(region_from_not_snapshot)
    rangeObj_snapshot = simplejson.dumps(snapshot)
    #selectedMyVariable = json.dumps(selectedMyVariable)	 

    if not selectedMyVariable:
	selectedMyVariable = '""'
    selectedMyVariable = str(selectedMyVariable) 

    #Building a variable to set inside MYBUILDS with region,snapshot and filters data:    
    build_json = '{ "level":{ "level_0": "'+level_0_id+'","level_1":"'+level_1_id+'"}, "variable":'+selectedVariables+', "selectedMyVariable":'+selectedMyVariable+', "trend": { "level_0":"'+level_0_id+'", "level_1":"'+level_1_id+'","level":"'+level+'","trend_key":"'+trend_key+'","trend_product":"'+trend_product+'","from_date":"'+from_date+'","to_date":"'+to_date+'","date_type":"'+date_type+'" } , "snapshot":'+rangeObj_snapshot+', "region":'+rangeObj_region_from_not_snapshot+', "filters":'+ rangeObj_filter_from_not_snapshot +' }'	

    #My Builds:
    try:
	if mybuild_form:
	        mybuild_form = mybuild_form[0]
		mybuild_form.build_name = 'New name'
		mybuild_form.build_conf = build_json
		mybuild_form.save()
	else:
		mybuild_form = MyBuild()
		mybuild_form.build_name = 'New name'
		mybuild_form.build_conf = build_json
		mybuild_form.save()

    except Exception as ex:
    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
	message = template.format(type(ex).__name__, ex.args)
    	print message
	print "Not saved in mybuild of main models.userbuild_models:"


    #MySphere	
    try:  
	mysphere_form = MySphere.objects.filter(user_id = request.user.id)						
	if mysphere_form:
		mysphere_form = mysphere_form[0]
		mysphere_form.user_id = request.user.id	
		mysphere_form.mybuild_id = MyBuild(id=mybuild_form.id)
		mysphere_form.save()
	else:
		mysphere_form = MySphere()
		mysphere_form.user_id = request.user.id	
		mysphere_form.mybuild_id = MyBuild(id=mybuild_form.id)
		mysphere_form.save()

    except Exception as ex:
    	template = "An exception of type {0} occured. Arguments:\n{1!r}"
	message = template.format(type(ex).__name__, ex.args)
    	print message
	print "Not saved in mysphere of main models.userbuild_models:"

    #After saving. Get the details of the last ten historys of the user:    
    details = MySphere.objects.filter(user_id = request.user.id).order_by('-id')[:10]
   	
    #Assign the last 10 history to a variable:
    myBuild_limit_10 = []
    for detail in details:
	myBuild_limit_10.append(detail.mybuild_id.build_conf)

    #Construct a variable with the user details and history:
    exports = {'username': request.user.username,
		'user_id': request.user.id,
		'MyBuild': myBuild_limit_10,
               }
    response_text = simplejson.dumps(exports)
    return HttpResponse(response_text, mimetype='application/json')


@login_required
def mysphere_workbook(request):
    try:
        print "mysphere workbook"
        exports=""
        workBookName=""
        workBookURL=""
        wbJsonData=""
        wbJsonLocation=""
        if request.body:
	    workBookJson = json.loads(request.body)
	    wbJsonData = workBookJson['jsonData']
	    wbJsonLocation = workBookJson['locationData']
	    workBookName = workBookJson['wbName']
	    workBookURL = workBookJson['wbUrl']

        workBookForm = Workbook.objects.filter(user_id = request.user.id,workbook_name=workBookName).order_by('-id')[:1]
        if(len(workBookForm)>0):
            workBookForm = workBookForm[0]
            workBookForm.workbook_jsondata=wbJsonData
            workBookForm.workbook_jsonlocation=wbJsonLocation
            workBookForm.workbook_url=workBookURL
            workBookForm.updated_date=datetime.datetime.now()
            workBookForm.save()
            exports = {'status': "Successfully Updated."}
        else:
            newWorkBookForm = Workbook()
            newWorkBookForm.workbook_name=workBookName
            newWorkBookForm.workbook_jsondata=wbJsonData
            newWorkBookForm.workbook_jsonlocation=wbJsonLocation
            newWorkBookForm.workbook_url=workBookURL
            newWorkBookForm.user_id=request.user.id
            newWorkBookForm.created_date=datetime.datetime.now()
            newWorkBookForm.save()
            exports = {'status': "Successfully Saved."}

        response_text = simplejson.dumps(exports)
        return HttpResponse(response_text, mimetype='application/json')
    except Exception as e:
        print "Exception inside mysphere workbook :: %s"%e
        exports = {'status': "Failed to save."}
        response_text = simplejson.dumps(exports)
        return HttpResponse(response_text, mimetype='application/json')

###
@login_required
def profile_settings(request, username):
    context = RequestContext(request)
    content_user = check_and_set_user(request, username)
    context.content_user = content_user
    profile, created = UserProfile.objects.get_or_create(user=content_user)
    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            # get user
            # user.email = cleaned_email
            form.instance.user.email = form.cleaned_data['email']
            form.instance.user.save()
            form.save()
            # todo: add string rep. of settings to see what changed
            audit = {}
            audit_log(
                Actions.PROFILE_SETTINGS_UPDATED, request.user, content_user,
                _("Profile settings updated."), audit, request)
            return HttpResponseRedirect(reverse(
                public_profile, kwargs={'username': request.user.username}
            ))
    else:
        form = UserProfileForm(
            instance=profile, initial={"email": content_user.email})
    return render_to_response("settings.html", {'form': form},
                              context_instance=context)


@require_GET
def public_profile(request, username):
    context = RequestContext(request)
    content_user = check_and_set_user(request, username)
    context.content_user = content_user
    profile, created = UserProfile.objects.get_or_create(user=content_user)
    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            # get user
            # user.email = cleaned_email
            form.instance.user.email = form.cleaned_data['email']
            form.instance.user.save()
            form.save()
            # todo: add string rep. of settings to see what changed
            audit = {}
            audit_log(
                Actions.PROFILE_SETTINGS_UPDATED, request.user, content_user,
                _("Profile settings updated."), audit, request)
            return HttpResponseRedirect(reverse(
                public_profile, kwargs={'username': request.user.username}
            ))
    else:
        form = UserProfileForm(
            instance=profile, initial={"email": content_user.email})
    return render_to_response("settings.html", {'form': form},
                              context_instance=context)


def about(request):
    context = RequestContext(request)
    return render_to_response("about.html", context_instance=context)

def home_analyze(request):
    context = RequestContext(request)
    return render_to_response("home_analyze.html", context_instance=context)

def analyze_location(request):
    context = RequestContext(request)
    return render_to_response("analyze-location.html", context_instance=context)

@login_required
def upgrade_account(request):
    context = RequestContext(request)
    username=request.user
    content_user = get_object_or_404(User, username=username)
    return render_to_response("upgrade_account.html", context_instance=context)

@login_required
def upgrade_payment(request):
    context = RequestContext(request)
    level0_Id=""
    level1_Id=[]
    level1_ids =''
    
    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)
       if key == "level0id":
	  level0_Id = valuelist[0].strip()
       if key == "level1id":
	  level1_Id = valuelist[0].split(",")


    for idx, val in enumerate(level1_Id):
       	
       try:
	  if len(level1_ids)>0:
		level1_ids += ","+ val
	  else:
		level1_ids =  val
       except Exception as e:
          print "EXCEPT"
          print e
          subscription_check=None



    context.level0_Id = level0_Id
    context.level1_Id = str(level1_ids)

    username=request.user
    
    content_user = get_object_or_404(User, username=username)
    return render_to_response("upgrade_payment.html", context_instance=context)


################## Subscription Plan ######################
@login_required
def subscription_mail(request):
    context = RequestContext(request)
    country=[]
    state=[]
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        if key == "level0id":
           country.extend(['%s' % (val) for val in valuelist])
        if key == "level1id":
           state.extend(['%s' % (val) for val in valuelist])

    email = EmailMessage('SciSphere Subscription Plans', 
			'\n Email :'+request.user.email+
			',\n Country :'+str(country)+
			',\n State :'+str(state),
			'',['giftson.daniel@scisphere.com','elango.sakthivel@scisphere.com'],'','','','','')
    #email.send()
    queue = django_rq.get_queue('low')
    queue.enqueue(send_mail1, email)
    response_text=None
    return HttpResponse(response_text, mimetype='application/json')


@login_required
def subscription_free(request):
    print  "subscription_free"
    context = RequestContext(request)
    result=None
    sub_type=None
    level0_Id=""
    level1_Id=[]
    
    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)
       if key == "level0id":
	  level0_Id = valuelist[0].strip()
       if key == "level1id":
	  level1_Id = valuelist[0].split(",")

    
    details_free = Subscription.objects.filter(user_id = request.user.id,sub_type='Free').order_by('-id')[:1]

    if len(details_free) != 1:
       for idx, val in enumerate(level1_Id):
          dataset_form = Dataset.objects.get(ds_state_code = val,ds_type="Normal")
          subscription_form = Subscription()
          try:
    	     subscription_form.user_id = request.user.id
    	     subscription_form.start_date = datetime.datetime.now()
    	     subscription_form.end_date =  datetime.datetime(datetime.datetime.now().year + 1, *datetime.datetime.now().timetuple()[1:-2])
    	     subscription_form.dataset_id_id = dataset_form.id
             subscription_form.org_id = OrganizationUser.objects.get(user=request.user.id).organization_id  
	     subscription_form.sub_type = 'Free'
    	     subscription_form.save()
	     result="Success"
          except Exception as ex:
    	     template = "An exception of type {0} occured. Arguments:\n{1!r}"
	     message = template.format(type(ex).__name__, ex.args)
	     result="Failed"
    	     print message
	     print "Not saved in subscription of main models.subscription: becos of no organization"

	     	
    elif len(details_free) == 1:
       if details_free[0].id:
          for idx, val in enumerate(level1_Id):
             try:
                dataset_form = Dataset.objects.get(ds_state_code = val,ds_type="Normal")
                subscription_form = Subscription.objects.get(pk = details_free[0].id)
	        subscription_form.org_id = OrganizationUser.objects.get(user=request.user.id).organization_id          
    	        subscription_form.user_id = request.user.id
    	        subscription_form.start_date = datetime.datetime.now()
    	        subscription_form.end_date =  datetime.datetime(datetime.datetime.now().year + 1, *datetime.datetime.now().timetuple()[1:-2])
    	        subscription_form.dataset_id_id = dataset_form.id
	        subscription_form.sub_type = 'Free'
    	        subscription_form.save()
	        result="Success"
             except Exception as ex:
    	        template = "An exception of type {0} occured. Arguments:\n{1!r}"
	        message = template.format(type(ex).__name__, ex.args)
	        result="Failed"
    	        print message
	        print "Not update in subscription of main models.subscription:"
                #result="Your free plan already subscripted..";
		

    exports = {'result': result}
    #Convert into json:
    response_text = simplejson.dumps(exports)    
    return HttpResponse(response_text, mimetype='application/json')


@login_required
def subscription_plan(request):
    print("subscription_plan")
    context = RequestContext(request)
    result=None
    sub_type=None
    level0_Id=""
    level1_Id=[]
    
    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)
       if key == "level0id":
	  level0_Id = valuelist[0].strip()
       if key == "level1id":
	  level1_Id = valuelist[0].split(",")

    #details = Subscription.objects.filter(user_id = request.user.id).order_by('-id')[:1]
    #if len(details) == 1:
    #   sub_type="Plus"
    #else:
    #   sub_type="Free"

    for idx, val in enumerate(level1_Id):
       dataset_form = Dataset.objects.get(ds_state_code = val,ds_type="Normal")
       subscription_form = Subscription()
       subscription_check=None
       try:
          print "TRY"
          subscription_check = Subscription.objects.get(dataset_id_id=dataset_form.id, user_id=request.user.id, sub_type="Plus")
       except Exception as e:
          print "EXCEPT"
          print e
          subscription_check=None

       try:
          if subscription_check==None:
             print "new subscription"
    	     subscription_form.user_id = request.user.id
    	     subscription_form.start_date = datetime.datetime.now()
    	     subscription_form.end_date =  datetime.datetime(datetime.datetime.now().year + 1, *datetime.datetime.now().timetuple()[1:-2])
    	     subscription_form.dataset_id_id = dataset_form.id
	     subscription_form.sub_type = "Plus"
    	     subscription_form.save()
	     result="Success"
       except Exception as ex:
    	  template = "An exception of type {0} occured. Arguments:\n{1!r}"
	  message = template.format(type(ex).__name__, ex.args)
	  result="Failed"
    	  print message
	  print "Not saved in subscription of main models.subscription:"

    exports = {'result': result}
    #Convert into json:
    response_text = simplejson.dumps(exports)    
    return HttpResponse(response_text, mimetype='application/json')

def subscription_plan_confirmed(order_id, userid, response_json):
    print("subscription_plan   ::::: confirmed :::::")
    #context = RequestContext(request)
    result=None
    sub_type=None
    level0_Id=""
    level1_Id=[]
    
    for key in response_json.keys():
	level0_Id = key
	level1_Id = (response_json[key])

    for idx, val in enumerate(level1_Id):
       dataset_form = Dataset.objects.get(ds_state_code = str(val),ds_type="Normal")
       subscription_form = Subscription()
       subscription_check=None
       try:
          print "TRY"
          subscription_check = Subscription.objects.get(dataset_id_id=dataset_form.id, user_id=userid, org_id=OrganizationUser.objects.get(user=userid).organization_id ,  sub_type="Plus")
       except Exception as e:
          print "EXCEPT"
          print e
          subscription_check=None

       try:
          if subscription_check==None:
             print "new subscription"
    	     subscription_form.user_id = userid
    	     subscription_form.org_id = OrganizationUser.objects.get(user=userid).organization_id
    	     subscription_form.start_date = datetime.datetime.now()
    	     subscription_form.end_date =  datetime.datetime(datetime.datetime.now().year + 1, *datetime.datetime.now().timetuple()[1:-2])
    	     subscription_form.dataset_id_id = dataset_form.id
	     subscription_form.sub_type = "Plus"
	     subscription_form.order_id = order_id
    	     subscription_form.save()
	     result="Success"
       except Exception as ex:
    	  template = "An exception of type {0} occured. Arguments:\n{1!r}"
	  message = template.format(type(ex).__name__, ex.args)
	  result="Failed"
    	  print message
	  print "Not saved in subscription of main models.subscription:"

    exports = {'result': result}
    #Convert into json:
    response_text = simplejson.dumps(exports)    
    return HttpResponse(response_text, mimetype='application/json')


#Upgrade subscription
@login_required
def subscription_upgrade(request):
    print("subscription_upgrade")
    context = RequestContext(request)
    result=None
    sub_type=None
    level0_Id=""
    level1_Id=[]
    payment_mode=''
    payment_txt_id=''
    payment_status=''
    address=''
    companyname=''
    payment_location=''
    payment_provider=''
    level1_ids=''

    hashids = Hashids(alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
    #print hashids.encrypt(int(time.time()))
    #print "SCI-"+hashids.encrypt(int(time.time()))
    #print hashids.encrypt(123456789)
    
    for key in request.GET.iterkeys():
       valuelist = request.GET.getlist(key)
       if key == "level0id":
	  level0_Id = valuelist[0].strip()
       if key == "level1id":
	  level1_Id = valuelist[0].split(",")
       if key == "payment_mode":
	  payment_mode = valuelist[0].strip()
       if key == "payment_txt_id":
	  payment_txt_id = valuelist[0].strip()
       if key == "payment_status":
	  payment_status = valuelist[0].strip()
       if key == "address":
	  address = valuelist[0].strip()
       if key == "payment_location":
	  payment_location = valuelist[0].strip()
       if key == "payment_provider":
	  payment_provider = valuelist[0].strip()
       if key == "companyname":
	  companyname = valuelist[0].strip()

    order_form = order()
    for idx, val in enumerate(level1_Id):
       subscription_form = Subscription()
       	
       try:
          print "TRY after val"
	  if len(level1_ids)>0:
		level1_ids += ","+ val
	  else:
		level1_ids =  val
       except Exception as e:
          print "EXCEPT after val"
          print e

    try:
          if level0_Id:
	     order_ids_val = '{"'+str(level0_Id)+'": ['+str(level1_ids)+']}'	
	     order_form.order_id = "SCI-"+hashids.encrypt(int(time.time()))
	     order_form.subcription_id = str(order_ids_val)
	     order_form.payment_mode =payment_mode
	     order_form.payment_transaction_id =payment_txt_id
	     order_form.payment_status = payment_status
	     order_form.address = address
	     order_form.company_name = companyname
	     order_form.payment_date = datetime.datetime.now()
	     order_form.payment_location = payment_location
	     order_form.payment_provider = payment_provider	
	     order_form.fulfillment = False	
	     order_form.user_id = request.user.id

	     #get org id by using user id
	     order_form.org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
	     order_form.save()	
	     result="Success"
    except Exception as ex:
    	  template = "An exception of type {0} occured. Arguments:\n{1!r}"
	  message = template.format(type(ex).__name__, ex.args)
	  result="Failed"
    	  print message
	  print "Not saved in subscription of main models.subscription:"
    	
    exports = {'result': result}
    response_text = simplejson.dumps(exports)    
    return HttpResponse(response_text, mimetype='application/json')


@login_required
def subscription_list(request):
    context = RequestContext(request)
    result=None
    sub_date=None
    plus_plans = []
    free_plans_country=[]
    free_plans_state=[]
    all_plans = []    

    orgID = OrganizationUser.objects.get(user=request.user.id).organization_id	

    #details = Subscription.objects.filter(user_id = request.user.id).order_by('-id')[:1]
    details = Subscription.objects.filter(org_id = orgID).order_by('-id')[:1]

    for detail in details:
	sub_date = detail.start_date
    
    try:
       #values = Subscription.objects.filter(user_id = request.user.id, sub_type = "Plus").order_by('-id') #Mapped to an user
       values = Subscription.objects.filter(org_id = orgID, sub_type = "Plus").order_by('-id') #Mapped to an org

       for value in values:
	   plus_plans.append(value.dataset_id.ds_state_code)

       #values1 = Subscription.objects.filter(user_id = request.user.id, sub_type = "Free").order_by('-id') #Mapped to an user
       values1 = Subscription.objects.filter(org_id = orgID, sub_type = "Free").order_by('-id') #Mapped to an org

       for value1 in values1:
	   free_plans_country.append(value1.dataset_id.ds_country_code)
	   free_plans_state.append(value1.dataset_id.ds_state_code)

       #values2 = Subscription.objects.filter(user_id = request.user.id).order_by('-id') #Mapped to an user
       values2 = Subscription.objects.filter(org_id = orgID).order_by('-id') #Mapped to an org

       for value2 in values2:
	   all_plans.append(value2.dataset_id.ds_state_code)

    except Exception as ex:
       template = "An exception of type {0} occured. Arguments:\n{1!r}"
       message = template.format(type(ex).__name__, ex.args)
       result="Failed"
       print message
       print "Not saved in subscription of main models.subscription:"

    free_plans_obj = {'country':free_plans_country,'state':free_plans_state}
    exports = {'plus_plans': plus_plans,'free_plans': free_plans_obj,'all_plans':all_plans}
    #Convert into json:
    response_text = simplejson.dumps(exports)    
    return HttpResponse(response_text, mimetype='application/json')

# Subscription list for common function
def get_subscription_list(orgID):
    plus_plans = []
    free_plans_country=[]
    free_plans_state=[]
    all_plans = []
    try:
       values = Subscription.objects.filter(org_id = orgID, sub_type = "Plus").order_by('-id') #Mapped to an org
       for value in values:
          plus_plans.append(value.dataset_id.ds_state_code)

       values1 = Subscription.objects.filter(org_id = orgID, sub_type = "Free").order_by('-id') #Mapped to an org
       for value1 in values1:
          free_plans_country.append(value1.dataset_id.ds_country_code)
          free_plans_state.append(value1.dataset_id.ds_state_code)

       all_plans = free_plans_state+plus_plans
    except Exception as ex:
       print "Exception inside subscription_list :: %s"%ex
    free_plans_obj = {'country':free_plans_country,'state':free_plans_state}
    exports = {'plus_plans': plus_plans,'free_plans': free_plans_obj,'all_plans':all_plans}
    return exports



@login_required
def upload(request):
    print "upload"
    context = RequestContext(request)
    customerDatasetList=None
    myTemplateList=None
    critical="no"
    try:
       org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
       myTemplateList = MyTemplate.objects.filter(org_id=org_id).values('id','mytemplate_name').order_by('-id')
       customerDatasetList = list(CustomerDatasetUpload.objects.filter(org_id=org_id,raw_status="success",processed_status="success",rank_status="success").values('id','file_name','uploaded_date').order_by('-id'))
    except Exception as e:
       print 'Exception 1 inside upload in views.py :: %s' % e
    context.customerDatasetList = customerDatasetList
    context.myTemplateList = myTemplateList

    context.dataError=""
    errorStep1=[] # columns name Mismatch - (critical)
    errorStep2=[] # Datatype Mismatch - (warning)
    errorStep3=[] # Empty Data - (warning)
    errorStep4=[] # Level name Mismatch - (critical)
    
    if request.method == 'POST':
       try:
          totalRecord = 0
          errorRow=[]
          mytemplateid = request.POST['template']
          csvfile = request.FILES['uploaded_file']

          dataframe = pd.read_excel(csvfile)#, sheetname='Sheet1'
          headers = dataframe.columns.tolist()
          #csv_reader = csv.reader(csvfile, delimiter="\t")
          #headers = csv_reader.next()
          mytemplateForm = MyTemplate.objects.get(id=mytemplateid)
          context.mytemplateid = mytemplateid
          myTemplateVariable=[]
          myTemplateVariableName=[]
          placeName=[]

          for temp in mytemplateForm.template_json:
             if temp != "derived_variable" and temp != "auto_derived_variable" and temp != "model_variable":
                for temp1 in mytemplateForm.template_json[temp]:
                   myTemplateVariable.append(mytemplateForm.template_json[temp][temp1])
                   myTemplateVariableName.append(mytemplateForm.template_json[temp][temp1]['name'])
             if temp == "place":
                for temp1 in mytemplateForm.template_json[temp]:
                   if mytemplateForm.template_json[temp][temp1]['name'] != "Pincode": #for checking empty data
                      placeName.append(mytemplateForm.template_json[temp][temp1]['name'])

          # for checking columns name.
          try:
             for columnname in myTemplateVariableName:
                if not columnname in headers:
                   matchescolumnname = difflib.get_close_matches(columnname,headers)
                   errorcolumnname=""
                   if len(matchescolumnname)>0:
       	              errorcolumnname = matchescolumnname[0]
                   errorObj1={'table':'Row 1, '+str(columnname),'description':'Column Name Mismatch, '+str(columnname)+' column is Missing.','datetime':str(datetime.datetime.now()),'status':'Critical'}
                   errorStep1.append(errorObj1)
                   errorRow.append(1)
                   print "errorStep1"
             for columnnameHead in headers:
                if not columnnameHead in myTemplateVariableName:
                   errorObj1={'table':'Row 1, '+str(columnnameHead),'description':'Column Name Mismatch, '+str(columnnameHead)+' column is not a template variable.','datetime':str(datetime.datetime.now()),'status':'Critical'}
                   errorStep1.append(errorObj1)
                   errorRow.append(1)
                   print "errorStep1"
          except Exception as e:
             print 'Exception 2 inside upload in views.py (Error Step 1 - columns name Mismatch) :: %s' % e

          # csv write into repository
          media_directory = handle_uploaded_file(csvfile,request,mytemplateid,headers)
          # pandas read csv
          #dataframe = pd.read_csv(""+settings.MEDIA_PATH+"/"+media_directory,sep="\t")

          for temp in myTemplateVariable:
             columnname = temp
             if temp["datatype"]:
                if columnname == 'date':
                   dataframe[columnname] = pd.to_datetime(dataframe[columnname])

          # check datatype and empty columns.
          try:
             for temp in myTemplateVariable:
                columnname = temp['name']
                if columnname:
                   datatype = temp['datatype']
                   pandadatatype=""
                   if datatype == "int":
                      pandadatatype = "int64"
                   elif datatype == "float":
                      pandadatatype = "float64"
                   elif datatype == "text":
                      pandadatatype = "object"
                   elif datatype == "date":
                      pandadatatype = "datetime64"

                   matchescolumnname = difflib.get_close_matches(columnname,headers)

                   if len(matchescolumnname)>0:
       	              columnname = matchescolumnname[0]
                   # check datatype
                   if columnname in headers:
                      if dataframe[columnname].dtype != pandadatatype:
                         try:
                            rNo=1
                            for cval in dataframe[columnname]:
                               rNo=rNo+1
                               if(datatype):
                                  try:
                                     if(datatype=='int'):
                                        if not math.isnan(cval):
                                           cval = int(cval)
                                     elif(datatype=='float'):
                                        if not math.isnan(cval):
                                           cval = float(cval)
                                  except Exception as e:
                                     errorObj2={'table':'Row '+str(rNo)+', '+str(columnname),'description':'Datatype Mismatch','datetime':str(datetime.datetime.now()),'status':'Critical'}
                                     errorStep2.append(errorObj2)
                                     errorRow.append(rNo)
                                     print 'Exception inside upload in views.py ( float type michmatch ) :: %s' % e
                         except Exception as e:
		            print 'Error :: %s' % e
                      # check the empty columns
                      if columnname in placeName:
                         dframe = pd.isnull(dataframe[columnname])
                         rNo=1
                         for t in dframe:
                            rNo=rNo+1
                            if t == True:
                               errorObj3={'table':'Row '+str(rNo)+', '+str(columnname),'description':'Empty Data','datetime':str(datetime.datetime.now()),'status':'Critical'}
                               errorStep3.append(errorObj3)
                               errorRow.append(rNo)
                               critical="yes"
                         totalRecord = rNo-1
                      else:
                         dframe = pd.isnull(dataframe[columnname])
                         rNo=1
                         for t in dframe:
                            rNo=rNo+1
                            if t == True:
                               errorObj3={'table':'Row '+str(rNo)+', '+str(columnname),'description':'Empty Data','datetime':str(datetime.datetime.now()),'status':'Warning'}
                               errorStep3.append(errorObj3)
                         totalRecord = rNo-1
          except Exception as e:
             print 'Exception 3 inside upload in views.py (Error Step 2&3 - Datatype Mismatch & Empty data) :: %s' % e

          # load master data and check master data and uploaded data
          try:
             accessToken = request.session.get('access_tk')
             apiKey = request.session.get('api_key')
             url = 'http://'+settings.API_IP+'/scisphere/master?api_key='+apiKey
             r = urllib2.Request(url, headers={'Content-Type': 'application/json'})
             serialized_data = urllib2.urlopen(r).read()
             master_data = json.loads(serialized_data)

             level1={}
             level2={}
             level3={}
             level1ObjArr={}
             level2ObjArr={}
             level3ObjArr={}
             level1Array=[]
             level2Array=[]
             level3Array=[]
             for i in range(len(master_data['master'])):
                level1name = ''.join(master_data['master'][i]['_source']['name_1'].split()).lower()
                level2name = ''.join(master_data['master'][i]['_source']['name_2'].split()).lower()
                level3name = ''
                if master_data['master'][i]['_source']['name_3']:
                   level3name = ''.join(master_data['master'][i]['_source']['name_3'].split()).lower()
                if level1name not in level1:
                   level1ObjArr[level1name] = master_data['master'][i]['_source']['id_1']
                   if level1name not in level2ObjArr:		
                      level2ObjArr[level1name] = {}
                   level1[level1name] = master_data['master'][i]['_source']['id_1']
                   level1Array.append(level1name)

                if level2name not in level2ObjArr[level1name] and level2name:#level2:
                   level2ObjArr[level1name][level2name] = master_data['master'][i]['_source']['id_2']
                   if level2name not in level3ObjArr:		
                      level3ObjArr[level2name] = {}
                   level2[level2name] = master_data['master'][i]['_source']['id_2']
                   level2Array.append(level2name)

                if level3name not in level3ObjArr[level2name] and level3name :#level3:
                   level3ObjArr[level2name][level3name] = master_data['master'][i]['_source']['id_3']
                   level3[level3name] = master_data['master'][i]['_source']['id_3']
                   level3Array.append(level3name)
          except Exception as e:
             print 'Exception 4 inside upload in views.py (Load master data) :: %s' % e

          try:
             #reader = csv.DictReader(csvfile,headers,delimiter='\t')
             reader = dataframe.to_json(orient="records")
             reader = json.loads(reader)
             i=0
             rNo=1
             level1Name=None
             level2Name=None
             level3Name=None
             for row in reader:
                rNo=rNo+1
                if(i!=0):
                   if row['State']:
                      level1Name = difflib.get_close_matches(''.join(str(row['State']).split()).lower(),level1Array)
                   if row['District']:
                      if(level1Name):
                         level2Name = difflib.get_close_matches(''.join(str(row['District']).split()).lower(),level2ObjArr[level1Name[0]])
                      else:
                         level2Name = []
                   if row['Taluk']:
                      if(level2Name):
                         level3Name = difflib.get_close_matches(''.join(str(row['Taluk']).split()).lower(),level3ObjArr[level2Name[0]])
                      else:
                         level3Name = []

                   if len(level1Name) == 0:
                      errorObj4={'table':'Row '+str(rNo)+', State','description':'Place name '+str(row['State'])+' does not match any of the recognized names.','datetime':str(datetime.datetime.now()),'status':'Critical'}
                      errorStep4.append(errorObj4)
                      errorRow.append(rNo)
                   if len(level2Name) == 0:
                      errorObj4={'table':'Row '+str(rNo)+', District','description':'Place name '+str(row['District'])+' does not match any of the recognized names under '+str(row['State'])+'.','datetime':str(datetime.datetime.now()),'status':'Critical'}
                      errorStep4.append(errorObj4)
                      errorRow.append(rNo)
                   if len(level3Name) == 0: 
                      errorObj4={'table':'Row '+str(rNo)+', Taluk','description':'Place name '+str(row['Taluk'])+' does not match any of the recognized names under '+str(row['District'])+'.','datetime':str(datetime.datetime.now()),'status':'Critical'}
                      errorStep4.append(errorObj4)
                      errorRow.append(rNo)
                i=i+1
          except Exception as e:
             print 'Exception 5 inside upload in views.py (Error Step 4 - Place name incorrect) :: %s' % e

          #check
          customerDatasetForm = CustomerDatasetUpload.objects.filter(mytemplate_id=mytemplateid, processed_obj_id__isnull = False).order_by('-id')[:1]
          datasetExist="no"
          if(len(errorStep1)>0 or len(errorStep2)>0 or len(errorStep3)>0 or len(errorStep4)>0):
             if(len(errorStep1)>0 or len(errorStep2)>0 or len(errorStep4)>0):
                critical="yes"
             if len(customerDatasetForm)>0:
                datasetExist="yes"
             dataError = {'columns_mismatch':errorStep1,'datatype_mismatch':errorStep2,'empty_value':errorStep3,'placename_error':errorStep4}
             context.dataError = simplejson.dumps(dataError)
             context.recordCount = simplejson.dumps({"Total":totalRecord,"ErrorRow":errorRow})
             csvfilename = os.path.basename(str(csvfile))
             context.verifyConfirm = simplejson.dumps({"mytemplateid":mytemplateid,"csvfilename":csvfilename,"media_directory":media_directory})
             context.critical = critical
             context.datasetExist = datasetExist
             status = "Error"
             uploadLogInsert(request,mytemplateid,dataError,status)
             return render_to_response("verify.html", context_instance=context)
          else:
             context.critical = "no"
             if len(customerDatasetForm)>0:
                datasetExist="yes"
             context.datasetExist = datasetExist
             dataError = {'columns_mismatch':errorStep1,'datatype_mismatch':errorStep2,'empty_value':errorStep3,'placename_error':errorStep4}
             context.dataError = simplejson.dumps(dataError)
             context.recordCount = simplejson.dumps({"Total":totalRecord,"ErrorRow":errorRow})
             csvfilename = os.path.basename(str(csvfile))
             context.verifyConfirm = simplejson.dumps({"mytemplateid":mytemplateid,"csvfilename":csvfilename,"media_directory":media_directory})
             status = "Success"
             uploadLogInsert(request,mytemplateid,dataError,status)
             return render_to_response("verify.html", context_instance=context)
       except Exception as e:
          print "Exception inside upload in views.py %s" % e
    return render_to_response("upload.html", context_instance=context)


def uploadLogInsert(request,mytemplateid,dataError,status):
    try:
       UploadLogForm = UploadLog()
       UploadLogForm.user_id = request.user.id
       UploadLogForm.mytemplate_id = mytemplateid
       UploadLogForm.log_json = dataError
       UploadLogForm.status = status
       UploadLogForm.uploaded_date = datetime.datetime.now()
       UploadLogForm.save()
    except Exception as e:
       print "Exception inside uploadLogInsert %s" % e


def uploadverify(request):
    result={}
    try:
       prms = json.loads(json.dumps(request.POST))
       insert_customer_dataset(prms['mytemplateid'],prms['csvfilename'],request,prms['media_directory'],prms['confirm_status'])
       result['result']="Successfully saved."
    except Exception as e:
       print e
       result['result']="Failed."
    result = json.dumps(result)
    response = HttpResponse(result, content_type='json/plain')
    response['Content-Length'] = len(result)
    return response


def handle_uploaded_file(csvfile,request,mytemplateid,headers):
    try:
       org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
       
       randomRef = uuid().hex
       directory = settings.MEDIA_PATH+'/dataset/'+str(org_id)
       if not os.path.exists(directory):
          os.makedirs(directory)
       media_directory ='dataset/'+str(org_id)+'/'+randomRef+'_'+str(csvfile)
       directory = settings.MEDIA_PATH+'/'+media_directory
       with open(directory, 'wb+') as destination:
          for chunk in csvfile.chunks():
             destination.write(chunk)
       #insert_customer_dataset(templateid,file,request,headers,media_directory)
    except Exception as e:
       print "Exception inside handle_uploaded_file in views.py"
       print e
    return media_directory

def insert_customer_dataset(mytemplateid,csvfilename,request,media_directory,confirm_status):
    try:
       org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
       upload_date = str(time.strftime("%Y-%m-%d"))
       #filename = os.path.basename(str(csvfile))
       fileformat = csvfilename.split('.')
       customerDatasetForm=CustomerDatasetUpload()
       customerDatasetForm.user_id=request.user.id
       customerDatasetForm.org_id=org_id
       customerDatasetForm.mytemplate_id=mytemplateid
       customerDatasetForm.file_name=csvfilename
       customerDatasetForm.file_format=fileformat[1]
       customerDatasetForm.file_path=media_directory
       customerDatasetForm.author=request.user.username
       customerDatasetForm.status=""
       customerDatasetForm.region=""
       customerDatasetForm.category=confirm_status
       customerDatasetForm.created_date=datetime.datetime.now()
       customerDatasetForm.save()
       insert_customer_dataset_mongo(request,mytemplateid,customerDatasetForm,media_directory,upload_date,confirm_status)
    except Exception as e:
       print "Exception inside insert_customer_dataset in views.py"
       print e


def insert_customer_dataset_mongo(request,mytemplateid,customerDatasetForm,media_directory,upload_date,confirm_status):
    print "insert customer dataset mongo"
    collection=None
    org_id=None
    myTemplateForm=None
    collection_name=""
    try:
       # create new collections
       org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
       myTemplateForm = MyTemplate.objects.get(id=mytemplateid)
       collection_name="orgid_"+str(org_id)
       collection = settings.MONGO_DB[collection_name]
    except Exception as e:
       print "Exception inside insert_customer_dataset_mongo in views.py (create mongo collection) :: %s" % e

    level1={}
    level2={}
    level3={}
    level1ObjArr={}
    level2ObjArr={}
    level3ObjArr={}
    level1Array=[]
    level2Array=[]
    level3Array=[]
    try:
       # load master data and check master data and uploaded data
       apiKey = request.session.get('api_key')
       url = 'http://'+settings.API_IP+'/scisphere/master?api_key='+apiKey
       r = urllib2.Request(url, headers={'Content-Type': 'application/json'})
       serialized_data = urllib2.urlopen(r).read()
       master_data = json.loads(serialized_data)

       for i in range(len(master_data['master'])):
          level1name = ''.join(master_data['master'][i]['_source']['name_1'].split()).lower()
          level2name = ''.join(master_data['master'][i]['_source']['name_2'].split()).lower()
          level3name = ''
          if master_data['master'][i]['_source']['name_3']:
             level3name = ''.join(master_data['master'][i]['_source']['name_3'].split()).lower()
          if level1name not in level1:
             level1ObjArr[level1name] = master_data['master'][i]['_source']['id_1']
             if level1name not in level2ObjArr:		
                level2ObjArr[level1name] = {}	
             level1[level1name] = master_data['master'][i]['_source']['id_1']
             level1Array.append(level1name)
          if level2name not in level2ObjArr[level1name] and level2name:#level2:
             level2ObjArr[level1name][level2name] = master_data['master'][i]['_source']['id_2']
             if level2name not in level3ObjArr:		
                level3ObjArr[level2name] = {}	
             level2[level2name] = master_data['master'][i]['_source']['id_2']
             level2Array.append(level2name)
          if level3name not in level3ObjArr[level2name] and level3name :#level3:
             level3ObjArr[level2name][level3name] = master_data['master'][i]['_source']['id_3']
             level3[level3name] = master_data['master'][i]['_source']['id_3']
             level3Array.append(level3name)
    except Exception as e:
       customerDatasetForm.raw_insert_status = "failed"
       customerDatasetForm.save()
       print "Exception inside insert_customer_dataset_mongo in views.py (load masterd data from api) :: %s" % e

    userdata=[]
    try:
       #dataframe = pd.read_csv(""+settings.MEDIA_PATH+"/"+media_directory,sep="\t")
       xl = pd.ExcelFile(""+settings.MEDIA_PATH+"/"+media_directory)
       dataframe = pd.read_excel(""+settings.MEDIA_PATH+"/"+media_directory, sheetname=xl.sheet_names[0])
       headers = dataframe.columns.tolist()
       jsonData = dataframe.to_json(orient="records")
       data = json.loads(jsonData)
       #reader = csv.DictReader(csvfile, headers)
       level1Name = None
       level2Name = None
       level3Name = None
       myTemplateVariable=[]
       if myTemplateForm.template_json:
          for temp in myTemplateForm.template_json:
             if temp == "performance_variable":
                for temp1 in myTemplateForm.template_json[temp]:
                   myTemplateVariable.append(myTemplateForm.template_json[temp][temp1])

       if myTemplateVariable:
          for value in data:
             if value['State']:
                level1Name = difflib.get_close_matches(''.join(str(value['State']).split()).lower(),level1Array)
             if value['District']:
                if(level1Name):
                   level2Name = difflib.get_close_matches(''.join(str(value['District']).split()).lower(),level2ObjArr[level1Name[0]])
                else:
                   level2Name = []
             if value['Taluk']:
                if(level2Name):
                   level3Name = difflib.get_close_matches(''.join(str(value['Taluk']).split()).lower(),level3ObjArr[level2Name[0]])
                else:
                   level3Name = []	

             if(level1Name):
                if level1Name[0] in level1:
                   value['name_1'] = level1Name[0]
                   value['id_1'] = level1[level1Name[0]] 
             if (level2Name):
                if level2Name[0] in level2ObjArr[level1Name[0]]:                   #if level2Name[0] in level2:
                   value['name_2'] = level2Name[0]
                   value['id_2'] = level2ObjArr[level1Name[0]][level2Name[0]]      #level2[level2Name[0]] 
             if (level3Name):
                if level3Name[0] in level3ObjArr[level2Name[0]]:                   #if level3Name[0] in level3:
                   value['name_3'] = level3Name[0]
                   value['id_3'] = level3ObjArr[level2Name[0]][level3Name[0]]      #level3[level3Name[0]]

             # change name to id
             for temp in myTemplateVariable:
                for key in value:
                   if temp["name"] == key:
                      #value[temp["id"]] = value.pop(temp["name"])
                      # ---------- start as data type check -------------
                      # if data type is mismatch, to change the value of null
                      columnname = temp['name']
                      if columnname:
                         datatype = temp['datatype']
                         pandadatatype=""
                         if datatype == "int":
                            pandadatatype = "int64"
                         elif datatype == "float":
                            pandadatatype = "float64"
                         elif datatype == "text":
                            pandadatatype = "object"
                         elif datatype == "date":
                            pandadatatype = "datetime64"

                      # check datatype
                      if dataframe[columnname].dtype != pandadatatype:
                         cval=value[temp["name"]]
                         try:
                            if(datatype=='int'):
                               cval = int(cval)
                            elif(datatype=='float'):
                               cval = float(cval)
                         except Exception as e:
                            value[temp["name"]] = None
                            print 'Exception inside insert_customer_dataset_mongo in views.py ( float type michmatch ) :: %s' % e
                      # ---------- end as data type check -------------

                      # change value of key name to id
                      value[temp["id"]] = value.pop(temp["name"])

             #userdata.append(value)
             if(value['Taluk']):
                if(value['Taluk'] and level3Name):
                   userdata.append(value)
                elif(value['District']):		
                   if(value['District'] and level2Name):	
                      userdata.append(value)
                elif(value['State']):	
                   if(value['State'] and level1Name):	
                      userdata.append(value)

       else:
          for value in data:
             if value['State']:
                level1Name = difflib.get_close_matches(''.join(str(value['State']).split()).lower(),level1Array)
             if value['District']:
                if(level1Name):
                   level2Name = difflib.get_close_matches(''.join(str(value['District']).split()).lower(),level2ObjArr[level1Name[0]])
                else:
                   level2Name = []
             if value['Taluk']:
                if(level2Name):
                   level3Name = difflib.get_close_matches(''.join(str(value['Taluk']).split()).lower(),level3ObjArr[level2Name[0]])
                else:
                   level3Name = []	

             if(level1Name):
                if level1Name[0] in level1:
                   value['name_1'] = level1Name[0]
                   value['id_1'] = level1[level1Name[0]] 
             if (level2Name):
                if level2Name[0] in level2:
                   value['name_2'] = level2Name[0]
                   value['id_2'] = level2[level2Name[0]] 
             if (level3Name):
                if level3Name[0] in level3:
                   value['name_3'] = level3Name[0]
                   value['id_3'] = level3[level3Name[0]]
             for key in value:
                if "id_4" == key:
                   value[key] = str(value[key])

             if(value['Taluk']):
                if(value['Taluk'] and level3Name):	
                   userdata.append(value)
             elif(value['District']):		
                if(value['District'] and level2Name):	
                   userdata.append(value)
             elif(value['State']):	
                if(value['State'] and level1Name):	
                   userdata.append(value)
    except Exception as e:
       customerDatasetForm.raw_insert_status = "failed"
       customerDatasetForm.save()
       print "Exception inside insert_customer_dataset_mongo in views.py (pandas read excel and check datatype) :: %s" % e

    try:
       obj={}
       obj["user"]=request.user.username
       obj["user_id"]=request.user.id
       obj["org_id"]=org_id
       obj["template_id"]=mytemplateid
       obj["template_name"]=myTemplateForm.mytemplate_name
       obj["customer_dataset_id"]=customerDatasetForm.id
       obj["upload_date"]=upload_date
       obj['user_data']=userdata

       obj_id = collection.insert(obj)
       customerDatasetForm.raw_obj_id = obj_id
       customerDatasetForm.raw_insert_status = "success"
       customerDatasetForm.save()
    except pymongo.errors.ConnectionFailure as e:
       print "MONGO RE CONNECT "
       #customerDatasetForm.raw_insert_status = "failed"
       #customerDatasetForm.save()
       MONGO_CONNECTION = MongoClient(settings.MONGO_CONNECTION_URL+"/"+settings.MONGO_DATABASE['NAME']+"?replicaSet=rs1", safe=True, j=True)
       MONGO_DB = MONGO_CONNECTION[settings.MONGO_DATABASE['NAME']]
       collection = MONGO_DB[collection_name]
       obj_id = collection.insert(obj)
       customerDatasetForm.raw_obj_id = obj_id
       customerDatasetForm.raw_insert_status = "success"
       customerDatasetForm.save()
       print "Exception in insert_customer_dataset_mongo (insert mongodb raw data) :: %s " %e
    except Exception as e:
       customerDatasetForm.raw_insert_status = "failed"
       customerDatasetForm.save()
       print "Exception in insert_customer_dataset_mongo (insert mongodb raw data) :: %s " %e

    try:
       jobclass = jobfile.MongoJob()
       queue = django_rq.get_queue('low')
       queue.enqueue(jobclass.mongo_job, obj_id,collection_name,myTemplateForm,customerDatasetForm,confirm_status,mytemplateid,org_id,upload_date, request.session.get('access_tk'),apiKey,timeout=600)
    except Exception as e:
       print "Exception in insert_customer_dataset_mongo (mongo job call) :: %s" %e

    return True


def get_template_list(request):
    context = RequestContext(request)
    try:
       org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
       templateList = Template.objects.filter()
       templatedata = serializers.serialize('json', templateList)
       variableList = Variable.objects.filter()
       vriabledata = serializers.serialize('json', variableList)
       variableProductList = VariableProduct.objects.filter()
       vriableProductdata = serializers.serialize('json', variableProductList)
       unitList = Unit.objects.filter()
       unitListData = serializers.serialize('json', unitList)
       myTemplateList = MyTemplate.objects.filter(org_id=org_id)

       myTemplateArr=[]
       for mytemp in myTemplateList:
          tempJson = mytemp.template_json
          myTemplateObj={}
          myTemplateObj["id"]=mytemp.id
          myTemplateObj["template_id"]=mytemp.template_id
          myTemplateObj["mytemplate_name"]=mytemp.mytemplate_name
          myTemplateObj["template_json"]=tempJson
          #myTemplateObj["levels_mapping"]=mytemp.levels_mapping
          myTemplateArr.append(myTemplateObj)
       myTemplateArr = json.dumps(myTemplateArr)

       exports = {'templateList': templatedata,'variableList': vriabledata,'variableProductList':vriableProductdata,'unitList':unitListData,'myTemplateList':myTemplateArr}
       #Convert into json:
       response_text = simplejson.dumps(exports)
    except Exception as ex:
       print "Exception inside get_template_list in views.py :: %s" % e
    return HttpResponse(response_text, mimetype='application/json')


# template save details start
@login_required
def templateform(request):
    context = RequestContext(request)
    if request.method == 'POST':
       try:
          org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
          mytemplatejson = request.POST["mytemplate-json"]
          mytemplateheaderjson = request.POST["mytemplate-header-json"]
          mytemplatename = request.POST["mytemplate-name"]
          templateid = request.POST["template"]
          levelsobj = request.POST["levels-obj"]

          json_data = json.loads(mytemplatejson)
          levelsobj = json.loads(levelsobj)

          json_header = json.loads(mytemplateheaderjson)
          #
          media_directory = handle_templatetsv(request,json_header,org_id,mytemplatename)
          #
          #ReadData=csv.reader(open(settings.MEDIA_PATH+'/'+media_directory,'rb'), delimiter=',')
          createMyTemplate(levelsobj,org_id,json_data,media_directory,mytemplatename,templateid)
          context.template_path = '/media/'+str(media_directory)
       except Exception as e:
          print "Exception inside templateform in views.py (post method) :: %s" % e
    return render_to_response("template.html", context_instance=context)



# template save details start
@login_required
def templateform_old(request):
    context = RequestContext(request)
    if request.method == 'POST':
       try:
          print "post try"
          org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
          mytemplatejson = request.POST["mytemplate-json"]
          mytemplateheaderjson = request.POST["mytemplate-header-json"]
          mytemplatename = request.POST["mytemplate-name"]
          templateid = request.POST["template"]
          levelsobj = request.POST["levels-obj"]

          json_data = json.loads(mytemplatejson)
          levelsobj = json.loads(levelsobj)

          json_header = json.loads(mytemplateheaderjson)
          #
          media_directory = handle_templatetsv(request,json_header,org_id,mytemplatename)
          #
          ReadData=csv.reader(open(settings.MEDIA_PATH+'/'+media_directory,'rb'), delimiter=',')
          createMyTemplate(levelsobj,org_id,json_data,media_directory,mytemplatename,templateid)
          context.template_path = '/media/'+str(media_directory)
       except Exception as e:
          print "Exception inside templateform in views.py (post method) :: %s" % e
    try:
       org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
       templateList = Template.objects.filter()
       templatedata = serializers.serialize('json', templateList)
       variableList = Variable.objects.filter()
       vriabledata = serializers.serialize('json', variableList)
       variableProductList = VariableProduct.objects.filter()
       vriableProductdata = serializers.serialize('json', variableProductList)
       unitList = Unit.objects.filter()
       unitListData = serializers.serialize('json', unitList)
       myTemplateList = MyTemplate.objects.filter(org_id=org_id)

       myTemplateArr=[]
       for mytemp in myTemplateList:
          myTemplateObj={}
          myTemplateObj["id"]=mytemp.id
          myTemplateObj["template_id"]=mytemp.template_id
          myTemplateObj["mytemplate_name"]=mytemp.mytemplate_name
          myTemplateObj["template_json"]=mytemp.template_json
          #myTemplateObj["levels_mapping"]=mytemp.levels_mapping
          myTemplateArr.append(myTemplateObj)
       myTemplateArr = json.dumps(myTemplateArr)
       
       customerDatasetList = CustomerDatasetUpload.objects.filter(org_id=org_id)
       context.customerDatasetList = customerDatasetList
       context.templateList = templatedata
       context.variableList = vriabledata
       context.variableProductList = vriableProductdata
       context.unitList = unitListData
       context.myTemplateList = myTemplateArr
    except Exception as e:
       print "Exception inside templateform in views.py :: %s" % e
    return render_to_response("template.html", context_instance=context)


#step 1 template csv write 
def handle_templatetsv(request,json_header,org_id,mytemplatename):
    print "handle_templatecsv"
    try:
       randomRef = uuid().hex
       directory = settings.MEDIA_PATH+'/dataset/'+str(org_id)+'/template'
       print directory
       if not os.path.exists(directory):
          os.makedirs(directory)
       media_directory ='dataset/'+str(org_id)+'/template/'+mytemplatename+'.xlsx'
       directory = settings.MEDIA_PATH+'/'+media_directory

       dfObj={}
       for key in json_header:
          dfObj[key]=[]
       
       df = DataFrame(dfObj,columns=json_header)
       writer = ExcelWriter(directory)
       df.to_excel(writer,'Sheet1',index=False)
       writer.save()
       #with open(directory, 'w') as fp:
          #a = csv.writer(fp, delimiter='	')
          #a.writerows(json_header)
    except Exception as e:
       print "Exception inside handle_templatecsv in views.py %s" % e
    return media_directory


def createMyTemplate(levelsobj,org_id,json_data,media_directory,mytemplatename,templateid):
    myTemplateDetails = MyTemplate.objects.filter(org_id = org_id,mytemplate_name=mytemplatename).order_by('-id')[:1]
    if len(myTemplateDetails) != 1:
       try:
          myTemplateForm = MyTemplate()
          myTemplateForm.template_id=templateid
          myTemplateForm.template_json=json_data
          myTemplateForm.levels_mapping=levelsobj
          myTemplateForm.template_path=media_directory
          myTemplateForm.mytemplate_name=mytemplatename
          myTemplateForm.org_id=org_id
          myTemplateForm.save()
          # replace mytemplate id in json data
          tempSerialId = myTemplateForm.id
          template_json = json.dumps(myTemplateForm.template_json)
          template_json = template_json.replace("@#",str(tempSerialId))
          template_json = json.loads(template_json)

          levels_mapping = json.dumps(myTemplateForm.levels_mapping)
          levels_mapping = levels_mapping.replace("@#",str(tempSerialId))
          levels_mapping = json.loads(levels_mapping)

          myTemplateForm.levels_mapping=levels_mapping
          myTemplateForm.template_json=template_json
          myTemplateForm.save()

       except Exception as e:
          print "Exception inside createMyTemplate in views.py (if try) :: %s" % e
       return True

    elif len(myTemplateDetails) == 1:
       print "else"
       try:
          myTemplateForm = MyTemplate.objects.get(pk = myTemplateDetails[0].id)
          # get auto derived variable
          autoDerivedVariable={};
          modelVariable={};
          if myTemplateDetails[0].template_json:
             if hasattr(myTemplateDetails[0].template_json, 'auto_derived_variable'):
                autoDerivedVariable=myTemplateDetails[0].template_json['auto_derived_variable']
             if hasattr(myTemplateDetails[0].template_json, 'model_variable'):
                modelVariable=myTemplateDetails[0].template_json['model_variable']

          # replace mytemplate id in json data
          tempSerialId = myTemplateForm.id
          template_json = json.dumps(json_data)
          template_json = template_json.replace("@#",str(tempSerialId))
          template_json = json.loads(template_json)

          levels_mapping = json.dumps(levelsobj)
          levels_mapping = levels_mapping.replace("@#",str(tempSerialId))
          levels_mapping = json.loads(levels_mapping)
          # re set auto derived variable to templatejson
          if autoDerivedVariable:
             template_json['auto_derived_variable']=autoDerivedVariable
          if modelVariable:
             template_json['model_variable']=modelVariable

          myTemplateForm.levels_mapping=levels_mapping
          myTemplateForm.template_json=template_json
          myTemplateForm.template_id=templateid
          myTemplateForm.template_path=media_directory
          myTemplateForm.mytemplate_name=mytemplatename
          myTemplateForm.org_id=org_id
          myTemplateForm.save()
       except Exception as e:
          print "Exception inside createMyTemplate in views.py (else try) :: %s" % e
       return True


@login_required
def dataset_exists(request, id):
    context = RequestContext(request)
    orgID=None
    message="No"
    response_text=None
    try:
       orgID = OrganizationUser.objects.get(user=request.user.id).organization_id
       customerDatasetForm = CustomerDatasetUpload.objects.filter(org_id=orgID,mytemplate_id=id, processed_obj_id__isnull = False).order_by('-id')[:1]
       if len(customerDatasetForm)>0:
          message="Yes"
       exports = {'result': message}
       response_text = simplejson.dumps(exports)    
    except Exception as e:
       print "Exception inside dataset_exists in views.py :: %s" % e
    return HttpResponse(response_text, mimetype='application/json')


def mysphere_saved_list(request):
    result={}
    try:
       listData = json.loads(request.body)
       #listName = request.POST['listname']
       #listDesc = request.POST['savedlist-desc']
       #urlpath = request.POST['urlpath']
       listName = listData['listname']
       listDesc = listData['savedlist-desc']
       urlpath = listData['urlpath']
       #ACCESS_TOKEN = "0d085228d8b7feeb498ccf136e852ff167204f58"
       #longUrl = urllib2.quote(urlpath.encode("utf8"))
       #url = 'https://api-ssl.bitly.com/v3/shorten?access_token='+ACCESS_TOKEN+'&longUrl='+longUrl
       #serialized_data = urllib2.urlopen(url).read()
       #response = HttpResponse(serialized_data, content_type='text/plain')
       #response['Content-Length'] = len(serialized_data)
       #data = json.loads(serialized_data)
       #shorturl = data['data']['url']
          
       savedListsForm = SavedLists()
       savedListsForm.list_name = listName
       savedListsForm.list_desc = listDesc
       savedListsForm.list_data_url = urlpath
       savedListsForm.created_date = datetime.datetime.now()
       savedListsForm.user_id = request.user.id
       savedListsForm.save()
       #result['result']="Successfully Saved."
       return  HttpResponse(json.dumps({'responseText':'success'}))
    except Exception as e:
       print "Exception inside mysphere_saved_list in views.py :: %s" % e
       #result['result']="Failed."
       return  HttpResponse(json.dumps({'responseText':'failed'}))
       #result = json.dumps(result)
       #response = HttpResponse(result, content_type='json/plain')
       #response['Content-Length'] = len(result)
       #return response



@login_required
def region_compare(request):
    context = RequestContext(request)
    username=request.user
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    context.orgID = org_id
    customerDatasetList=None
    myTemplateList=None
    try:
       myTemplateList = MyTemplate.objects.filter(org_id=org_id).values('id','mytemplate_name').order_by('-id')
       customerDatasetList = CustomerDatasetUpload.objects.filter(org_id=org_id).values('mytemplate_id').order_by('-id')[:1]
    except Exception as e:
       print e
    templatename = None

    if len(customerDatasetList) > 0:   	
       for mytmplist in myTemplateList:
          if(customerDatasetList[0]['mytemplate_id'] == mytmplist['id']):
             templatename = mytmplist['mytemplate_name']	
    context.templatename = templatename
    return render_to_response("region_compare.html", context_instance=context)


def region_compare_data(request):
    if not request.user.is_authenticated():
       return checkUserSession()
    context = RequestContext(request)
    querystr=[]
    accessToken=None
    apiKey=None
    level1Array=[]
    keyName=None
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        if key == "level1Id":
           level1Array = valuelist[0].strip()
        if key == "varkey":
           keyName = valuelist[0].strip()
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
        
    query = '&'.join(querystr)

    # subscription check for commercial data
    try:
       level1Array = level1Array.split(",")
       for level1Id in level1Array:
          check = subscription_check(keyName,level1Id,request.user.id)
          if check != True:
             result={}
             result['subscription']=check
             result = json.dumps(result)
             response = HttpResponse(result, content_type='json/plain')
             response['Content-Length'] = len(result)
             return response
    except Exception as e:
       print "Exception inside region_compare_data - subscription check : %s" %e

    #oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')

    #query = urllib.quote(query, '')
    query = query.replace(' ','%20')
    url = 'http://'+settings.API_IP+'/scisphere/places/compare?'+query+'&api_key='+apiKey+'&keytype=snapshot_pca'
    print url
   
    request1 = urllib2.Request(url)
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()

    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(serialized_data, content_type='text/plain')
    response['Content-Length'] = len(serialized_data)
    return response



@login_required
def master_data(request):
    print "master_data"
    context = RequestContext(request)
    accessToken=None
    apiKey=None
    orgId = OrganizationUser.objects.get(user=request.user.id).organization_id
    #oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')
    url = 'http://'+settings.API_IP+'/scisphere/master?api_key='+apiKey
    print url
    request1 = urllib2.Request(url)
    request1.add_header("Authorization", "Bearer "+ accessToken)
    result1 = urllib2.urlopen(request1)
    serialized_data = result1.read()
    serialized_data = json.loads(serialized_data)
    #subscriptionList = get_subscription_list(orgId)

    #for data in serialized_data["master"]:
       #print data

    #countries api
    countryurl = 'http://'+settings.API_IP+'/scisphere/places/countries?api_key='+apiKey
    request2 = urllib2.Request(countryurl)
    request2.add_header("Authorization", "Bearer "+ accessToken)
    result2 = urllib2.urlopen(request2)
    master_data = result2.read()
    result = {'master':serialized_data,'countries':json.loads(master_data)}
    result = json.dumps(result)
    #result = json.loads(result)

    #serialized_data = urllib2.urlopen(url).read()
    response = HttpResponse(result, content_type='json/plain')
    response['Content-Length'] = len(result)
    return response



""" Analytics Module start"""

@login_required
def datasummary(request, id):
    context = RequestContext(request)
    placeid = id
    querystr=[]
    keyName=None
    accessToken=None
    apiKey=None
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        if key == "summarykey":
           keyName=valuelist[0].strip()
        querystr.extend(['%s=%s' % (key, val) for val in valuelist])
        
    query = '&'.join(querystr)
    #oauth accesstoken
    if request.session.get('access_tk'):
       accessToken = request.session.get('access_tk')
       apiKey = request.session.get('api_key')

    try:
       query = query.replace(' ','%20')
       url = 'http://'+settings.API_IP+'/scisphere/places/'+placeid+'/datasummary?'+query+'&api_key='+apiKey
       print url
       request1 = urllib2.Request(url)
       request1.add_header("Authorization", "Bearer "+ accessToken)
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()
       response = HttpResponse(serialized_data, content_type='text/plain')
       response['Content-Length'] = len(serialized_data)
       return response
    except Exception as e:
       print "Exception inside region - api call : %s" %e
       return False


@login_required
def rural_location(request):
    context = RequestContext(request)
    username=request.user
    modelId=""
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        if key == "modelid":
           modelId = valuelist[0].strip()

    context.modelId = modelId
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    context.orgID = org_id
    customerDatasetList=None
    myTemplateList=None
    templateJson=[]

    #model_master(request)

    try:
        myTemplateList = list(MyTemplate.objects.filter(template_id=3,org_id=org_id).values('id','mytemplate_name','template_json').order_by('-id'))
        print "myTemplateList"
        if len(myTemplateList)>0:
          for key in myTemplateList:
             customerDatasetList = list(CustomerDatasetUpload.objects.filter(org_id=org_id,mytemplate_id=key['id'],raw_status="success",processed_status="success",rank_status="success").values('mytemplate_id').order_by('-id')[:1])
             if len(customerDatasetList)>0:
                tempJson = key['template_json']
                tempJson["myTemplate"] = key["mytemplate_name"]
                templateJson.append(tempJson)
          context.templateJson = json.dumps(templateJson)

        modelMasterList = list(ModelMaster.objects.filter().values('id','model_name').order_by('-id'))
        if len(modelMasterList)>0:
          context.modelMasterFirstId = modelMasterList[0]['id']
          context.modelMasterList = json.dumps(modelMasterList)

    except Exception as e:
       print "Exception inside rural location :: %s" %e
    return render_to_response("rural_location.html", context_instance=context)

def check_datasummary(request,level1Id,perMerticId,orgId):
    apiKey=None
    accessToken=None
    try:
       if request.session.get('access_tk'):
          accessToken = request.session.get('access_tk')
          apiKey = request.session.get('api_key')

       url = 'http://'+settings.API_IP+'/scisphere/places/'+str(level1Id)+'/datasummary?api_key='+str(apiKey)+'&category=mylocation&summarykey='+str(perMerticId)+'&index='+str(orgId)+'&leveltype=village_town'
       print url
       request1 = urllib2.Request(url)
       request1.add_header("Authorization", "Bearer "+ accessToken)
       result1 = urllib2.urlopen(request1)
       serialized_data = json.loads(result1.read())
       print serialized_data
       if serialized_data:
          for key in serialized_data:
             if serialized_data[key]:
                if serialized_data[key]['totalCount']:
                   return serialized_data[key]['totalCount']

    except Exception as e:
       print "Exception inside check-datasummary :: %s"%e

@login_required
def rural_location_process(request):
    context = RequestContext(request)
    username=request.user
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    perMerticName=""
    level1Name=""
    perMerticId=""
    level1Id=""
    modelId=""
    modelName=""
    modelJobId=""
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        if key == "performancemerticname":
           perMerticName = valuelist[0].strip()
        if key == "level1name":
           level1Name = valuelist[0].strip()
        if key == "permerticid":
           perMerticId = valuelist[0].strip()
        if key == "level1id":
           level1Id = valuelist[0].strip()
        if key == "modelid":
           modelId = valuelist[0].strip()
        if key == "modelname":
           modelName = valuelist[0].strip()


    #update templatejson
    myTemplateSplitId = perMerticId.split("-")
    myTemplateId = myTemplateSplitId[1]
    userModelForm=None
    userModelCheck=1
    modelExecutionStatus=1 # for 1 is already model executed.

    modelMasterList = list(ModelMaster.objects.filter().values('id','model_name').order_by('-id'))
    if len(modelMasterList)>0:
       context.modelMasterList = json.dumps(modelMasterList)
    totalCount = check_datasummary(request,level1Id,perMerticId,org_id)
    context.modelId = modelId
    context.totalCount = totalCount
    if totalCount < 100:
       return render_to_response("rural_location_process.html", context_instance=context)

    try:
       userModelForm = list(UserModel.objects.filter(model_id_id=modelId,variable_key=perMerticId,org_id=org_id,status='Active').order_by('-id')[:1])#geography_id=level1Id,
       if len(userModelForm)==0:
          userModelForm = usermodel_insert(modelId,modelName,perMerticName,perMerticId,level1Id,request,org_id,myTemplateId)
          modelJobId = model_job_insert(userModelForm.id,level1Id,perMerticId,request.user.id,org_id)
          userModelCheck=0
          modelExecutionStatus=0 # for 0 is ready to execute new model.
    except Exception as e:
       print "Exception inside rural_location_process (usermodel insert) :: %s"%e

    userModelId=""
    try:
       if userModelCheck == 1:
          userModelId=str(userModelForm[0].id)
          userModelForm=userModelForm[0]
       else:
          userModelId=str(userModelForm.id)

       # check newly updated customerdataset
       customerDatasetList = list(CustomerDatasetUpload.objects.filter(org_id=org_id,mytemplate_id=myTemplateId,raw_status="success",processed_status="success",rank_status="success").order_by('-id')[:1])
       timeStamp1 = ""
       if len(customerDatasetList)>0:
          timeStamp1 = customerDatasetList[0].created_date

       modelJobList = list(ModelJob.objects.filter(user_model_id=userModelId,geography_id=level1Id).order_by('-id')[:1])
       modelJobStatus=0 # status - initially
       if len(modelJobList) > 0:
          modelJobId=modelJobList[0].id
          jobStatus = modelJobList[0].status
          timeStamp2 = modelJobList[0].status['model_build_start']['time']

          if 'model_build_end' in jobStatus:
             if 'status' in jobStatus['model_build_end']:
                if jobStatus['model_build_end']['status'] == 'success':
                   modelJobStatus=1 # status - success

          modelExecutionStatus=0 # for 0 is ready to execute new model. because execution status is failed then re execute the model score.
          if 'model_execution_end' in jobStatus:
             if 'status' in jobStatus['model_execution_end']:
                if jobStatus['model_execution_end']['status'] == 'success':
                   modelExecutionStatus=1 # for 1 is already model is executed.

          modelExecutionStatus=0 # for 0 is ready to execute new model. because model output status is failed then re execute the model score.
          if 'model_output_load_end' in jobStatus:
             if 'status' in jobStatus['model_output_load_end']:
                if jobStatus['model_output_load_end']['status'] == 'success':
                   modelExecutionStatus=1 # for 1 is already model is executed.

          if str(timeStamp1) > str(timeStamp2):
             # Re Insert UserModel
             userModelForm = usermodel_reinsert(modelId,modelName,perMerticName,perMerticId,level1Id,request,org_id,myTemplateId)
             modelJobId = model_job_insert(userModelForm.id,level1Id,perMerticId,request.user.id,org_id)
             userModelId=str(userModelForm.id)
             modelExecutionStatus=0
             modelJobStatus=0 # - needed to rebuild model
       else:
          modelJobId = model_job_insert_new(userModelForm.id,level1Id,perMerticId,request.user.id,org_id)
          modelExecutionStatus=0 # for 0 is ready to execute new model. because execution status is failed then re execute the model score.
          modelJobStatus=1

       modelMasterForm = list(ModelMaster.objects.filter(id=modelId).order_by('-id')[:1])
       independentVariable=""
       filesToLoad=""
       modelBuildFile=""
       modelExecuteFile=""
       modelScoreKey="mv_"+str(userModelForm.id)
       if len(modelMasterForm)>0:
           filesToLoad = modelMasterForm[0].files_to_load
           modelBuildFile = modelMasterForm[0].model_build_file
           modelExecuteFile = modelMasterForm[0].model_execute_file
           independentVariable = modelMasterForm[0].independent_variable
           independentVariable = json.dumps(independentVariable)
           independentVariable = json.loads(independentVariable)

       variableList = copy.deepcopy(independentVariable)
       variableList.append(perMerticId)
       variableList = ",".join(variableList)
       independentVariable = ",".join(independentVariable)

       contentType ='application/x-www-form-urlencoded'
       httpcookie = deployr_login()
       projectId = deployr_create(contentType,httpcookie)
       deployr_load(filesToLoad,projectId,contentType,httpcookie)
       deployr_push(projectId,perMerticId,perMerticName,userModelId,modelJobId,level1Id,org_id,modelScoreKey,variableList,independentVariable,contentType,httpcookie)

       modelScoreStatus=1
       #if userModelCheck==0:
       if modelJobStatus == 0:
          modelScoreStatus=0 # for status 1 is loading process automatically in process page, status 0 is waiting 2 minitus process. 
          try:
              queue = django_rq.get_queue('low')
              queue.enqueue(deployr_build, filesToLoad,modelBuildFile,projectId,contentType,httpcookie,userModelId,independentVariable,perMerticId,perMerticName,level1Id,org_id,modelScoreKey,variableList,timeout=500)
          except Exception as e:
              print "Exception inside rural_location_process (deployr build job calling function) :: %s" %e
       
       """modelMasterList = list(ModelMaster.objects.filter().values('id','model_name').order_by('-id'))
       if len(modelMasterList)>0:
          context.modelMasterList = json.dumps(modelMasterList)"""

       context.perMerticName = perMerticName  
       context.level1Name = level1Name
       context.perMerticId = perMerticId
       context.level1Id = level1Id
       context.modelId = modelId
       context.modelName = modelName
       context.projectId = projectId
       context.httpcookie = httpcookie
       context.userModelId = userModelId
       context.modelJobId = modelJobId
       context.modelScoreStatus = modelScoreStatus
       context.modelExecutionStatus = modelExecutionStatus

    except Exception as e:
       print "Exception inside rural_location_process (model build) :: %s"%e
    return render_to_response("rural_location_process.html", context_instance=context)


def usermodel_insert(modelId,modelName,perMerticName,perMerticId,level1Id,request,org_id,myTemplateId):
    print "usermodel_insert"
    try:
       userModelForm = UserModel()
       userModelForm.model_id_id=modelId
       userModelForm.version=1
       userModelForm.model_score_name= modelName+" - "+ perMerticName
       userModelForm.date=datetime.datetime.now()
       userModelForm.training_set=75
       userModelForm.test_set=25
       userModelForm.model_score_range={'min':0.2,'max':0.5}
       userModelForm.template_id=3
       userModelForm.variable_key=perMerticId
       userModelForm.geography_id=level1Id
       userModelForm.user_id=request.user.id
       userModelForm.org_id=org_id
       userModelForm.created_date=datetime.datetime.now()
       userModelForm.status="Active"
       userModelForm.save()

       # update modelscorekey in usermodel table
       userModelForm.model_score_key = "mv_"+str(userModelForm.id)
       userModelForm.save()


       # Mytemplate Json Insert model variable.
       myTemplateDetails = list(MyTemplate.objects.filter(id=myTemplateId))
       if len(myTemplateDetails)>0:
         templateJson = myTemplateDetails[0].template_json
       
         if "model_variable" not in list(templateJson):
           templateJson['model_variable']={}

         modelScoreIndex = len(templateJson['model_variable'])
         if modelScoreIndex not in list(templateJson['model_variable']):
            templateJson['model_variable'][modelScoreIndex]={}
            #templateJson['model_variable'][modelScoreIndex+1]={}

         templateJson['model_variable'][modelScoreIndex]['id']="mv_"+str(userModelForm.id)
         templateJson['model_variable'][modelScoreIndex]['name']=modelName+" - "+ perMerticName
         templateJson['model_variable'][modelScoreIndex]['modelid']=modelId
         templateJson['model_variable'][modelScoreIndex]['pvid']=perMerticId
         templateJson['model_variable'][modelScoreIndex]['timespecid']=""
         templateJson['model_variable'][modelScoreIndex]['date']=""
         #AVG
         """templateJson['model_variable'][modelScoreIndex+1]['id']="mv_"+str(userModelForm.id)+"_by_avg"
         templateJson['model_variable'][modelScoreIndex+1]['name']=modelName+" - "+ perMerticName+" by avg"
         templateJson['model_variable'][modelScoreIndex+1]['modelid']=modelId
         templateJson['model_variable'][modelScoreIndex+1]['pvid']=perMerticId
         templateJson['model_variable'][modelScoreIndex+1]['timespecid']=""
         templateJson['model_variable'][modelScoreIndex+1]['date']="" """
            
         myTemplateForm = MyTemplate.objects.get(id = myTemplateId)
         myTemplateForm.template_json = templateJson
         myTemplateForm.save()

       return userModelForm
    except Exception as e:
       print "Exception inside usermodel_insert :: %s"%e


def usermodel_reinsert(modelId,modelName,perMerticName,perMerticId,level1Id,request,org_id,myTemplateId):
    print "usermodel_reinsert"
    try:
       userModelFormOld = list(UserModel.objects.filter(model_id_id=modelId,variable_key=perMerticId,org_id=org_id,status="Active").order_by('-id')[:1])
       if len(userModelFormOld)>0:
          userModelForm1 = UserModel.objects.get(id=userModelFormOld[0].id)
          userModelForm1.status="Archive"
          userModelForm1.updated_date=datetime.datetime.now()
          userModelForm1.save()

       userModelForm = UserModel()
       userModelForm.model_id_id=modelId
       userModelForm.version=1
       userModelForm.model_score_name=modelName+" - "+ perMerticName
       userModelForm.date=datetime.datetime.now()
       userModelForm.training_set=75
       userModelForm.test_set=25
       userModelForm.model_score_range={'min':0.2,'max':0.5}
       userModelForm.template_id=3
       userModelForm.variable_key=perMerticId
       userModelForm.geography_id=level1Id
       userModelForm.user_id=request.user.id
       userModelForm.org_id=org_id
       userModelForm.created_date=datetime.datetime.now()
       userModelForm.status="Active"
       userModelForm.save()

       # update modelscorekey in usermodel table
       userModelForm.model_score_key = "mv_"+str(userModelForm.id)
       userModelForm.save()

       # modeljob Insert
       #model_job_insert(userModelForm.id,level1Id,perMerticId,request.user.id,org_id)

       # Mytemplate Json Insert model variable.
       myTemplateDetails = list(MyTemplate.objects.filter(id=myTemplateId))
       if len(myTemplateDetails)>0:
         templateJson = myTemplateDetails[0].template_json

         if "model_variable" in list(templateJson):
            for index in templateJson['model_variable']:
               if(templateJson['model_variable'][index]['modelid'] == modelId and templateJson['model_variable'][index]['pvid'] == perMerticId):
                  templateJson['model_variable'][index]['id']="mv_"+str(userModelForm.id)
                  templateJson['model_variable'][index]['name']=modelName+" - "+ perMerticName
                  templateJson['model_variable'][index]['modelid']=modelId
                  templateJson['model_variable'][index]['pvid']=perMerticId
                  templateJson['model_variable'][index]['timespecid']=""
                  templateJson['model_variable'][index]['date']=""
            myTemplateForm = MyTemplate.objects.get(id = myTemplateId)
            myTemplateForm.template_json = templateJson
            myTemplateForm.save()

       return userModelForm
    except Exception as e:
       print "Exception inside usermodel_reinsert :: %s"%e


def model_job_insert(userModelId,level1Id,perMerticId,user_id,org_id):
    print "model_job_insert"
    try:
       status={
            'model_build_start': {
                 'time': str(datetime.datetime.now()),
                 'status':'success'
            },
            'model_execution_start': {
                 'time': '',
                 'status': ''
            }
        }
       status = json.dumps(status)
       modelJobForm = ModelJob()
       modelJobForm.user_model_id_id= userModelId
       modelJobForm.user_id=user_id
       modelJobForm.org_id=org_id
       modelJobForm.geography_id=level1Id
       modelJobForm.status=status
       modelJobForm.created_date=datetime.datetime.now()
       modelJobForm.save()
       #apply_model(request)
       return modelJobForm.id
    except Exception as e:
       print "Exception inside model_job_insert :: %s" %e

def model_job_insert_new(userModelId,level1Id,perMerticId,user_id,org_id):
    print "model_job_insert_new"
    try:
       status={
            'model_build_start': {
                 'time': str(datetime.datetime.now()),
                 'status':'success'
            },
            'model_build_end': {
                 'time': str(datetime.datetime.now()),
                 'status':'success'
            },
            'model_execution_start': {
                 'time': str(datetime.datetime.now()),
                 'status': 'success'
            }
        }
       status = json.dumps(status)
       modelJobForm = ModelJob()
       modelJobForm.user_model_id_id= userModelId
       modelJobForm.user_id=user_id
       modelJobForm.org_id=org_id
       modelJobForm.geography_id=level1Id
       modelJobForm.status=status
       modelJobForm.created_date=datetime.datetime.now()
       modelJobForm.save()
       #apply_model(request)
       return modelJobForm.id
    except Exception as e:
       print "Exception inside model_job_insert :: %s" %e

@login_required
def rural_location_result(request):
    print "rural_location_result"
    context = RequestContext(request)
    username=request.user
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    perMerticName=""
    level1Name=""
    perMerticId=""
    level1Id=""
    modelId=""
    modelName=""
    httpCookie=""
    projectId=""
    userModelId=""
    modelJobId=""
    modelExecutionStatus=""
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        if key == "performancemerticname":
           perMerticName = valuelist[0].strip()
        if key == "level1name":
           level1Name = valuelist[0].strip()
        if key == "permerticid":
           perMerticId = valuelist[0].strip()
        if key == "level1id":
           level1Id = valuelist[0].strip()
        if key == "modelid":
           modelId = valuelist[0].strip()
        if key == "modelname":
           modelName = valuelist[0].strip()
        if key == "httpcookie":
           httpCookie = valuelist[0].strip()
        if key == "projectid":
           projectId = valuelist[0].strip()
        if key == "usermodelid":
           userModelId = valuelist[0].strip()
        if key == "modelJobId":
           modelJobId = valuelist[0].strip()
        if key == "modelExecutionStatus":
           modelExecutionStatus = valuelist[0].strip()

    try:

       modelJobList = list(ModelJob.objects.filter(user_model_id=userModelId,org_id=org_id).order_by('id')[:1])
       if(len(modelJobList)>0):
          modelJobId = modelJobList[0].id

       rocBuildPath="/analytics-media/Scisphere/Analytics/"+str(org_id)+"/build/ROC_"+str(modelJobId)+".csv"
       modelBuildPath=str(settings.ANALYTICS_MEDIA_PATH)+"/Scisphere/Analytics/"+str(org_id)+"/build/modelDetails_"+str(modelJobId)+".csv"
       rocCurvePath="/analytics-media/Scisphere/Analytics/"+str(org_id)+"/build/ROC_"+str(modelJobId)+".png"

       # dataframe
       dataframe = pd.read_csv(modelBuildPath)
       modelIndependentVariable=[]
       for key in dataframe["modelIndependentVariable"]:
          modelIndependentVariable.append(key)

       modelArr=[]
       obj={}
       obj['training_set']=dataframe["trainingSet"].unique()[0]
       obj['test_set']=dataframe["testSet"].unique()[0]
       obj['key_variables']=modelIndependentVariable
       modelArr.append(obj)

       modelMasterList = list(ModelMaster.objects.filter().values('id','model_name').order_by('-id'))
       if len(modelMasterList)>0:
           context.modelMasterList = json.dumps(modelMasterList)

       context.perMerticName = perMerticName
       context.level1Name = level1Name
       context.perMerticId = perMerticId
       context.level1Id = level1Id
       context.orgId = org_id
       context.projectId = projectId
       context.httpcookie = httpCookie
       context.modelId = modelId
       context.modelName = modelName
       context.userModelId = userModelId
       context.modelList = json.dumps(modelArr)
       context.rocCurvePath = rocCurvePath
       context.rocBuildPath = rocBuildPath
       context.modelExecutionStatus = modelExecutionStatus

    except Exception as e:
       print "Exception inside rural_location_result :: %s" %e

    return render_to_response("rural_location_result.html", context_instance=context)


def deployr_login():
    print "deployr_login"
    try:
       # ******************** LOGIN
       url='http://'+settings.DEPLOYR_IP+'/deployr/r/user/login'
       print url
       body={  
          "format":"json",
          "username":"testuser",
          "password":"changeme"
       }
       params = json.dumps(body)
       request1 = urllib2.Request(url,params)
       request1.add_header('Content-Type', 'application/json')
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()
       
       loginResponse = json.loads(serialized_data)
       httpcookie = loginResponse['deployr']['response']['httpcookie']

       return httpcookie
    except Exception as e:
      print "Exception inside deployr_login :: %s"%e
      return None

def deployr_create(contentType,httpcookie):
    print "deployr_create"
    try:
       # ******************** CREATE
       url='http://'+settings.DEPLOYR_IP+'/deployr/r/project/create'
       print url
       body1={  
        "format":"json"
       }
       #params1 = json.dumps(body1)
       data = urllib.urlencode(body1)
       request1 = urllib2.Request(url,data)
       request1.add_header('Content-Type', contentType)
       request1.add_header('Cookie', 'JSESSIONID='+str(httpcookie))
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()
       
       projectResponse = json.loads(serialized_data)
       projectId = projectResponse['deployr']['response']['project']['project']

       return projectId
    except Exception as e:
      print "Exception inside deployr_create :: %s"%e
      return None


def deployr_load(filesToLoad,projectId,contentType,httpcookie):
    try:
       for fileName in filesToLoad:
          url1='http://'+str(settings.DEPLOYR_IP)+'/deployr/r/project/directory/load'
          print url1
          body1={
           "format":"json",
           "project":projectId,
           "filename":fileName,
           "author":"testuser"
          }
          #params1 = json.dumps(body1)
          data = urllib.urlencode(body1)
          request1 = urllib2.Request(url1,data)
          request1.add_header('Content-Type', contentType)
          request1.add_header('Cookie', 'JSESSIONID='+str(httpcookie))
          result1 = urllib2.urlopen(request1)
          serialized_data = result1.read()
    except Exception as e:
      print "Exception inside deployr_create :: %s"%e


def deployr_push(projectId,perMerticId,perMerticName,userModelId,modelJobId,level1Id,org_id,modelScoreKey,variableList,independentVariable,contentType,httpcookie):
    try:
       previousJobId=""
       modelJobList = list(ModelJob.objects.filter(user_model_id=userModelId,org_id=org_id).order_by('id')[:1])
       if(len(modelJobList)>0):
          previousJobId = modelJobList[0].id

       url1='http://'+str(settings.DEPLOYR_IP)+'/deployr/r/project/workspace/push'
       print url1
       body1={
         "format":"json",
              "project":projectId,
              "inputs":{
          "pstart":{  
            "type" : "primitive", "value" :1 
           },
          "pstop":{
            "type" : "primitive", "value" :27
           },
          "perfName":{
            "type" : "primitive", "value" :str(perMerticId)
           },
          "perfNameS":{
            "type" : "primitive", "value" :str(perMerticName)
           },
          "perfSelection":{
            "type" : "primitive", "value" :"High"
           },
          "upperCutoff":{
           "type" : "primitive", "value" :"0.75"
           },
          "writeOutput":{
           "type" : "primitive", "value" :"T"
           },
          "derivedData":{
           "type" : "primitive", "value" :"T"
           },
          "multiColinearity":{
           "type" : "primitive", "value" :"T"
          },
          "allowNAFraction":{
           "type" : "primitive", "value" :"0.05"
          },
          "plotFigures":{
           "type" : "primitive", "value" :"T"
          },
          "modelId":{
           "type" : "primitive", "value" :str(userModelId)
          }, 
          "modelJobId":{
           "type" : "primitive", "value" :str(modelJobId)
          }, 
          "previousJobId":{
           "type" : "primitive", "value" :str(previousJobId)
          }, 
          "stateId":{
           "type" : "primitive", "value" :str(level1Id)
          }, 
          "organizationId":{
           "type" : "primitive", "value" :str(org_id)
          },
          "modelScoreId":{
            "type":"primitive","value":str(modelScoreKey)
          },
          "variableList":{
           "type" : "primitive", "value" :str(variableList)
          },
          "independentVariable":{
           "type" : "primitive", "value" :str(independentVariable)
          },
          "indexName":{
           "type" : "primitive", "value" :"myvar"+str(org_id)
          }
          }
       }
       #params1 = json.dumps(body1)
       data = urllib.urlencode(body1)
       request1 = urllib2.Request(url1,data)
       request1.add_header('Content-Type', contentType)
       request1.add_header('Cookie', 'JSESSIONID='+str(httpcookie))
       result1 = urllib2.urlopen(request1)
       serialized_data = result1.read()
       print serialized_data
    except Exception as e:
      print "Exception inside deployr_create :: %s"%e

def model_execution(request):
    print "model_execution"
    context = RequestContext(request)
    username=request.user
    org_id = OrganizationUser.objects.get(user=request.user.id).organization_id
    projectId=""
    httpcookie=""
    modelId=""
    userModelId=""
    result=""
    level1Id=""
    for key in request.GET.iterkeys():
        valuelist = request.GET.getlist(key)
        if key == "projectId":
           projectId = valuelist[0].strip()
        if key == "modelId":
           modelId = valuelist[0].strip()
        if key == "httpCookie":
           httpcookie = valuelist[0].strip()
        if key == "userModelId":
           userModelId = valuelist[0].strip()
        if key == "level1Id":
           level1Id = valuelist[0].strip()

    try:
       modelMasterForm = list(ModelMaster.objects.filter(id=modelId).order_by('-id')[:1])
       modelExecuteFile=""
       if len(modelMasterForm)>0:
          modelExecuteFile = modelMasterForm[0].model_execute_file

       modelJobList = list(ModelJob.objects.filter(user_model_id=userModelId,geography_id=level1Id).order_by('-id')[:1])
       if len(modelJobList) > 0:
          modelJobId = modelJobList[0].id
          jobStatus = modelJobList[0].status
          if 'model_execution_start' in jobStatus:
             jobStatus['model_execution_start']['status']='success'
             jobStatus['model_execution_start']['time']=str(datetime.datetime.now())
          modelJobForm = ModelJob.objects.get(id=modelJobId)
          modelJobForm.status = json.dumps(jobStatus)
          modelJobForm.save()

       queue = django_rq.get_queue('low')
       queue.enqueue(deployr_execute, modelExecuteFile,projectId,httpcookie,timeout=500)
       result = "Success"

    except Exception as e:
      result = "Failed"
      print "Exception inside model_execution :: %s"%e

    #return rural_location(request)
    exports = {'result': result}
    #Convert into json:
    response_text = simplejson.dumps(exports)    
    return HttpResponse(response_text, mimetype='application/json')

def apply_model(request):
    try:
       subject="Analytics"
       message="Analytics Start"
       toaddress="prakash.k@scimergent.com"
       email = EmailMessage(subject, message, to=[toaddress])
       #email.send()
       queue = django_rq.get_queue('low')
       queue.enqueue(send_mail1, email)
    except Exception as e:  
       print "Exception %s"%e  


@login_required
def model_master_list(request):
    response_text=""
    try:
       modelMasterList = list(ModelMaster.objects.filter().values('id','model_name').order_by('-id'))
       response_text = simplejson.dumps(modelMasterList)
    except Exception as e:  
       print "Exception %s"%e
    return HttpResponse(response_text, mimetype='application/json')

""" Analytics Module End """
