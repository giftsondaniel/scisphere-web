from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from main.models.explore_plus import Template,Variable
import csv
import os
from os.path import basename

from django.utils import simplejson
from main.models.userbuild_models import order
import json
from main.views  import subscription_plan_confirmed

import hashlib

from django.conf import settings
import urllib
import urllib2

from main.models import UserProfile

from hashids import Hashids
from django.contrib.auth.hashers import (
    check_password, make_password, is_password_usable, UNUSABLE_PASSWORD)

from django.contrib.auth.models import User
from organizations.models import Organization, OrganizationUser

class Command(BaseCommand):

   def handle(self, *args, **options):
      	
         try:
		splitArgs = args[0].split('/')
		mailID = splitArgs[0]
		orgID = splitArgs[1]
		countryID = splitArgs[2]
		stateID = splitArgs[3]
		mailSplit = mailID.split('@')
		name = mailSplit[0]

		url = 'http://'+settings.API_IP+'/oauth/secretKeys'
		data = json.dumps({
		  "name": name,
		   "email": mailID,
		   "username": mailID,
		  "password":"welcome"
		})
		req = urllib2.Request(url, data, {'Content-Type': 'application/json'})
		f = urllib2.urlopen(req)
		response = f.read()
		data = json.loads(response)
		print "Api Client recieved"

		new_user = User.objects.create_user(name,mailID)
		new_user.password = make_password("welcome")
		new_user.last_login = datetime.now()
		new_user.email_confirmed = True

		new_user.client_key = data[0]['clientKey']
		new_user.client_secret = data[0]['clientSecret']
		new_user.client_created = datetime.now()
		new_user.first_login_date = datetime.now()
		new_user.activation_key_send_date = datetime.now()
		new_user.is_superuser = False 
		new_user.username = mailID 
		new_user.first_name = name 
		new_user.last_name =""
		new_user.email = mailID
		new_user.is_staff = False
		new_user.is_active 
		new_user.date_joined = datetime.now()
		new_user.is_individual = False
		new_user.save()
		print "Auth user saved"	

		UserProfileNew = UserProfile()
		UserProfileNew.user_id = new_user.id
		UserProfileNew.username = mailID
		UserProfileNew.first_name =name
		UserProfileNew.last_name = ""
		UserProfileNew.job_title = "" 
		UserProfileNew.company = ""
		UserProfileNew.country = countryID
		UserProfileNew.state = stateID
		UserProfileNew.industry = 0
		UserProfileNew.is_individual = False 
		UserProfileNew.save()
		print "Main profile user saved"	

		OrganizationUserCreate =  OrganizationUser()	
		OrganizationUserCreate.created = datetime.now()
		OrganizationUserCreate.modified = datetime.now()
		OrganizationUserCreate.user_id = new_user.id
		OrganizationUserCreate.organization_id = orgID
		OrganizationUserCreate.is_admin = False
		OrganizationUserCreate.save()
		print "Organization user saved"	

         except ValueError:
            print "Handle error"
	    print "Please enter correct format code, 'mailID/orgID/Country/state'"
            print ValueError

         except  Exception as e:
            print "Handle error"
            print e
	    print "Please enter correct format code, 'mailID/orgID/Country/state'"

#python manage.py newUserWithOrganization --email elango1@gmail.com --orgid 1 --country IN --state TN
