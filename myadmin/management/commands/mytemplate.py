from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from main.models.explore_plus import Template,Variable
import csv
import os
from os.path import basename

class Command(BaseCommand):

   def saveVariables(self,templateForm,name,description,formula,variabletype,datatype,datatype1,geocategory):
      print "saveVariables"
      #print geocategory
      if geocategory == "True":
         geocategory = True
      else:
         geocategory = False
      try:
         variableForm = Variable()
         variableForm.name=name
         variableForm.description=description
         variableForm.formula=formula
         variableForm.variabletype=variabletype
         variableForm.datatype=datatype
         variableForm.datatype1=datatype1
         variableForm.created_date=datetime.now()
         variableForm.geocategory=geocategory
         variableForm.save()
         templateForm.variable_set.add(variableForm)
         templateForm.variable_set.all()
      except Exception as e:
         print "Exception"
         print e
      return True


   def addVariables(self,templateForm,ReadData):
      print "addVariables"
      try:
         i=0
         datatype1=""
         for line in ReadData:
            if i !=0:
               if line[4]=='text':
                  datatype1='object'
               if line[4]=='int':
                  datatype1='int64'
               if line[4]=='float':
                  datatype1='float64'
               if line[4]=='double':
                  datatype1='double64'
               if line[4]=='date':
                  datatype1='datetime64[ns]'
               self.saveVariables(templateForm,name=line[0],description=line[1],formula=line[2],variabletype=line[3],datatype=line[4],datatype1=datatype1,geocategory=line[5])
            i=i+1
      except Exception as e:
         print "Exception"
         print e
      return True


   def createTemplate(self,tempname,ReadData,orgid):
      print "createTemplate"
      variableForm = Variable()
      templateForm = Template()
      try:
         templateForm.name=tempname
         templateForm.description=tempname
         templateForm.sector="Others"
         templateForm.format=""
         templateForm.created_date=datetime.now()
         templateForm.org_id=orgid
         templateForm.save()
         self.addVariables(templateForm,ReadData)
      except Exception as e:
         print "Exception"
         print e
      return True

   def handle(self, *args, **options):
      print "handle"
      filename="/home/testuser/templates/madura/mfitemplate.csv"
      ReadData=csv.reader(open(filename,'rb'), delimiter=',')
      tempname = basename(filename)
      tempname = tempname.split('.')
      orgid = args[0]
      self.createTemplate(tempname[0],ReadData,orgid)


