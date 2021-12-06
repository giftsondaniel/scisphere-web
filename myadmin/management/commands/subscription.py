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

class Command(BaseCommand):
   def handle(self, *args, **options):
      for arg in args:
         try:
	    print "Subscription order :"
	    order_list = order.objects.filter(order_id = arg).order_by('-id')
	    for orde in order_list:
		if not orde.fulfillment:
		    #response_json = json.loads('{"356": [  32, 23, 27, 33 ]}')#orde.order_id) 
		    response_json = json.loads(orde.subcription_id) 
		    subscription_plan_confirmed(arg, orde.user_id, response_json )	
		    orderUpdate = order.objects.get(order_id = arg)	
		    orderUpdate.fulfillment = True
		    orderUpdate.save()	
		else:
		    print "Subscription order already fulfilled"
		    return False	
         except ValueError:
            print "Handle error"
            print ValueError

