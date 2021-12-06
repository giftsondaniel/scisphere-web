from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from main.models.explore_plus import Template,Variable
import csv
import os
from os.path import basename
from django.contrib.auth.models import User
from main.models.userbuild_models import MySphere, MyBuild

class Command(BaseCommand):

   def handle(self, *args, **options):
      print "handle"
      try:
         for arg in args:
            print arg
            userObj = User.objects.get(email=arg)
            print userObj.id
            myBuildObj = MySphere.objects.get(user_id=userObj.id)
            MySphere.objects.filter(user_id=userObj.id).delete()
            MyBuild.objects.filter(id=myBuildObj.mybuild_id_id).delete()
            #User.objects.filter(id=userObj.id).delete()
            print "deleted..."
      except Exception as e:
         print 'Exception ::: %s' % e