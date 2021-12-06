from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from main.models.explore_plus import Template,Variable,JobConfigure
import csv
import os
from os.path import basename

class Command(BaseCommand):

   def handle(self, *args, **options):
      print "handle"
      jobid = [1,2,3,4,5,6]
      jobConfigForm = JobConfigure()
      jobConfigForm.template_id=4
      jobConfigForm.variable_id=38
      jobConfigForm.job_id=jobid
      jobConfigForm.created_date=datetime.now()
      jobConfigForm.save()
      job = JobConfigure.objects.filter()
      print job
      for j in job:
         print type(j.job_id)
      print "job saved..."


