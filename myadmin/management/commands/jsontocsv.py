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
import csv

class Command(BaseCommand):

   def handle(self, *args, **options):
      print "handle"
      try:
         print "try"
         mytemplate = {"place":{"0":"State","1":"District","2":"Taluk"},"category":{"0":"BranchName","1":"CenterName"},"performance_variable":{"loan":{"datatype":"int","date":"date","unit":"unit"}}} 
	 for mytemp in mytemplate:
            for temp in mytemplate[mytemp]:
	       print mytemplate[mytemp]
            #print mytemp
	    #print mytemplate[0]
	 #print mytemplate
         with open('/home/testuser/test.csv', 'w') as fp:
            a = csv.writer(fp, delimiter=',')
            data = [['name', 'desc','datatype'],
                ['district', 'district','text'],
                ['taluk', 'taluk','text']]
            a.writerows(data)

      except Exception as e:
         print e










