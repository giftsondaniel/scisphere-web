#execute command
#python manage.py imageResize /home/scimergent/map70_2014/src/formhub-app/formhub/media/spfielduser/attachments
#python manage.py fileTransaction /home/analyzer/testfolder/media/thum/1/

from django.core.management.base import BaseCommand, CommandError
import os.path, time, datetime

import os
import sys
from boto.s3.connection import S3Connection
from boto.s3.key import Key

#root = '/home/testuser/map70/media/testuser'
pattern1 = "*.png"
pattern2 = "*.jpg"

conn = S3Connection('AKIAIPWUKWCQ534HYTFQ', 'Bm1RqNa/HIGjnJWE/NfUre0va94nKvUZSA7jQrfC')
pb = conn.get_bucket('scidumpfile')
s3_path="image"



class Command(BaseCommand):

   def handle(self, *args, **options):
      try:
         for arg in args:
            self.imageTransfer(arg)
      except Exception as e:
         print "Exception resize :: %s" %e

   def imageTransfer(self,root):
      try:
         print "imagetransfer"
         for path, subdirs, files in os.walk(root):
            for name in files:
               t = os.path.getmtime(path+""+name)
               tdate = datetime.datetime.fromtimestamp(t)
               if(tdate.strftime("%Y-%m-%d") < '2015-12-01'):

                  local_file_path = path+""+name

                  k = Key(pb)
                  file_name_to_use_in_s3 = "%s/%s"%(s3_path, os.path.basename(local_file_path))
                  print file_name_to_use_in_s3
                  print local_file_path
                  k.name = file_name_to_use_in_s3
                  k.set_contents_from_filename(local_file_path)
                  print "success"
                  sys.exit(0)

      except Exception as e:
         print "Exception imagetransfer :: %s"%e



