from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from main.models.explore_plus import Template,Variable,CustomerDatasetUpload

class Command(BaseCommand):

   def saveVariables(self,templateForm,name,description,formula,type,datatype):
      print "saveVariables"
      try:
         variableForm = Variable()
         variableForm.name=name
         variableForm.description=description
         variableForm.formula=formula
         variableForm.type=type
         variableForm.datatype=datatype
         variableForm.created_date=datetime.now()
         variableForm.save()
         templateForm.variable_set.add(variableForm)
         templateForm.variable_set.all()
         print "Saved."
      except Exception as e:
         print "Exception"
         print e
      return True


   def addVariables(self,templateForm):
      print "addVariables"
      try:
         self.saveVariables(templateForm,name="Country2",description="Country",formula="",type="Source",datatype="str")
         self.saveVariables(templateForm,name="State2",description="State",formula="",type="Source",datatype="str")
         self.saveVariables(templateForm,name="District2",description="District",formula="",type="Source",datatype="str")
         self.saveVariables(templateForm,name="Center2",description="Center",formula="",type="Source",datatype="str")
         self.saveVariables(templateForm,name="GLP2",description="Gross Loan Portfolio",formula="",type="Source",datatype="float")
         self.saveVariables(templateForm,name="PAR2",description="PAR Percentage",formula="",type="Source",datatype="float")
         self.saveVariables(templateForm,name="SSScore2",description="SSScore",formula="",type="Source",datatype="float")
      except Exception as e:
         print "Exception"
         print e
      return True


   def createTemplate(self):
      print "createTemplate"
      variableForm = Variable()
      templateForm = Template()
      try:
         templateForm.name="MFI2 Template"
         templateForm.description="MFI2 Template"
         templateForm.sector="Others"
         templateForm.format=""
         templateForm.created_date=datetime.now()
         templateForm.save();
         self.addVariables(templateForm)
         print "Saved."
      except Exception as e:
         print "Exception"
         print e
      return True

   def handle(self, *args, **options):
      self.createTemplate()


