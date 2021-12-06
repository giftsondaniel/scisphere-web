from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from main.models.explore_plus import Template,Variable
import csv
import os
from os.path import basename
from django.contrib.auth.models import User
from main.models import UserProfile
from registration.models import RegistrationProfile
from organizations.models import Organization,OrganizationUser
from django_digest.models import PartialDigest
from pinry.core.models import Pin

class Command(BaseCommand):

   def handle(self, *args, **options):
      print "handle"
      try:
         for arg in args:
            print arg
	    userObj = User.objects.get(email=arg)
	    print userObj.id
            PartialDigest.objects.filter(user_id=userObj.id).delete()
	    UserProfile.objects.filter(user_id=userObj.id).delete()
	    RegistrationProfile.objects.filter(user_id=userObj.id).delete()
 	    OrganizationUser.objects.filter(user_id=userObj.id).delete()
	    Pin.objects.filter(submitter_id=userObj.id).delete()
	    #User.objects.filter(id=userObj.id).delete()
	    print "deleted..."
      except Exception as e:
         print 'Exception ::: %s' % e
