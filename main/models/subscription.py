from django.db import models
import os
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User

class Dataset(models.Model):
    id = models.AutoField(primary_key=True)
    ds_country_code = models.CharField(max_length=255L,blank=True,null=True)
    ds_state_code = models.CharField(max_length=255L,blank=True,null=True)
    ds_name = models.CharField(max_length=255L,blank=True,null=True)
    ds_owner = models.CharField(max_length=255L,blank=True,null=True)
    ds_variables = models.CharField(max_length=5000L,blank=True,null=True)
    ds_desc = models.CharField(max_length=5000L,blank=True,null=True)
    ds_created_date = models.DateTimeField(auto_now_add=True)
    ds_license = models.CharField(max_length=255L,blank=True,null=True)
    ds_published_date = models.DateTimeField(auto_now_add=True,null=True)
    ds_type = models.CharField(max_length=255L,blank=True,null=True)

    class Meta:
	db_table = "subscription_dataset"
        app_label = 'main'


class Pricing(models.Model):
    id = models.AutoField(primary_key=True)
    created_date = models.DateTimeField(auto_now_add=True)
    effective_till_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    dataset_id = models.ForeignKey(Dataset,null=True,blank=True)
    label = models.CharField(max_length=255L,blank=True,null=True)
    operation = models.CharField(max_length=255L,blank=True,null=True)
    type = models.CharField(max_length=255L,blank=True,null=True)
    currency = models.CharField(max_length=255L,blank=True,null=True)

    class Meta:
	db_table = "subscription_pricing"
        app_label = 'main'


class Subscription(models.Model):
    id = models.AutoField(primary_key=True)
    start_date = models.DateTimeField(null=True,blank=True)
    end_date = models.DateTimeField(null=True,blank=True)
    user_id = models.IntegerField(null=True,blank=True)
    dataset_id = models.ForeignKey(Dataset,null=True,blank=True)
    sub_type = models.CharField(max_length=255L,blank=True,null=True)
    order_id = models.CharField(max_length=50L,blank=True,null=True)
    org_id = models.IntegerField(null=True,blank=True)

    class Meta:
	db_table = "subscription_subscription"
        app_label = 'main'



class KeysTable(models.Model):
    id = models.AutoField(primary_key=True)
    keys = models.CharField(max_length=255L,blank=True,null=True)
    title = models.CharField(max_length=500L,blank=True,null=True)
    description = models.CharField(max_length=2000L,blank=True,null=True)
    formula = models.CharField(max_length=255L,blank=True,null=True)
    source = models.CharField(max_length=255L,blank=True,null=True)
    unit = models.CharField(max_length=255L,blank=True,null=True)
    source_date = models.DateTimeField(auto_now_add=True,null=True)
    category = models.CharField(max_length=255L,blank=True,null=True)
    type = models.CharField(max_length=255L,blank=True,null=True)
    index_id = models.CharField(max_length=255L,blank=True,null=True)
    ds_type = models.CharField(max_length=255L,blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True,null=True)

    class Meta:
	db_table = "subscription_keys"
        app_label = 'main'
