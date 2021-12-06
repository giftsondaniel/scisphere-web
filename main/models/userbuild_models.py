from django.db import models
import os
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _
#from main.models import UserProfile
from django.contrib.auth.models import User
from jsonfield import JSONField


class SavedLists(models.Model):
    id = models.AutoField(primary_key=True) 
    list_name = models.CharField(max_length=255L, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    list_desc = models.CharField(max_length=255L, blank=True, null=True)
    list_data_url = models.CharField(max_length=255L, blank=True, null=True)
    user_id = models.IntegerField(null=False, blank=False)

    class Meta:
        db_table = "mysphere_saved_lists"
        app_label = 'main'


class mysphere_model(models.Model):
    id = models.AutoField(primary_key=True) 
    model_name = models.CharField(max_length=255L)
    model_created = models.DateTimeField(auto_now_add=True)
    model_type = models.CharField(max_length=255L)

    class Meta:
        db_table = "mysphere_model"
        app_label = 'main'


class MyBuild(models.Model):
    id = models.AutoField(primary_key=True) 
    build_name = models.CharField(max_length=255L)
    build_conf = models.CharField(max_length=5000L)

    class Meta:
        db_table = "mysphere_mybuild"
        app_label = 'main'


class MySphere(models.Model):
    id = models.AutoField(primary_key=True) 
    user_id = models.IntegerField(null=False, blank=False)
    #user_id = models.ForeignKey(User)
    mybuild_id = models.ForeignKey(MyBuild)
    #mybuild_id = models.IntegerField(null=True, blank=True)
    saved_list_id = models.IntegerField(null=True, blank=True)
    #saved_list_id = models.ForeignKey(SavedLists)
    saved_images_id = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = "mysphere_mysphere"
        app_label = 'main'


class Workbook(models.Model):
    id = models.AutoField(primary_key=True) 
    workbook_name = models.CharField(max_length=255L, blank=True, null=True)
    workbook_jsondata = JSONField(null=True,blank=True)
    workbook_jsonlocation = JSONField(null=True,blank=True)
    workbook_url = models.CharField(max_length=5000L, blank=True, null=True)
    user_id = models.IntegerField(null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True,blank=True)
    updated_date = models.DateTimeField(blank=True)

    class Meta:
        db_table = "mysphere_workbook"
        app_label = 'main'

#UPGRADE METHOD
#for the upgrade method
class order(models.Model):
    id = models.AutoField(primary_key=True)
    order_id = models.CharField(max_length=500L, blank=True, null=True)
    subcription_id = models.CharField(max_length=500L, blank=True, null=True)
    user_id = models.IntegerField(null=False,blank=False)
    org_id = models.IntegerField(null=False,blank=False)
    payment_mode = models.CharField(max_length=100L, blank=True, null=True)
    payment_transaction_id = models.CharField(max_length=50L, blank=True, null=True)
    payment_status = models.CharField(max_length=50L, blank=True, null=True)
    address = models.CharField(max_length=500L, blank=True, null=True)
    company_name = models.CharField(max_length=100L, blank=True, null=True)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_location = models.CharField(max_length=100L, blank=True, null=True)
    payment_provider = models.CharField(max_length=100L, blank=True, null=True)
    fulfillment = models.BooleanField(default=False)

    class Meta:
	db_table = "order"
	app_label = 'main'

# Create your models here.


class UserTransaction(models.Model):
    id = models.AutoField(primary_key=True) 
    url = models.TextField(blank=True, null=True)
    data = JSONField(null=True,blank=True)
    page = models.CharField(max_length=500L, blank=True, null=True)
    state_id = models.IntegerField(blank=True, null=True)
    user_id = models.IntegerField(null=False,blank=False)
    org_id = models.IntegerField(null=False,blank=False)
    created_date = models.DateTimeField(auto_now_add=True,blank=True)

    class Meta:
        db_table = "auth_usertransaction"
        app_label = 'main'

