import os
from django.db import models
from django.utils.translation import ugettext as _


class Country(models.Model):
    id = models.AutoField(primary_key=True) 
    country_id = models.IntegerField(null=True, blank=True)
    country_a2_code = models.CharField(max_length=255L)
    country_a3_code = models.CharField(max_length=255L)
    country_name = models.CharField(max_length=255L)
    created_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = "master_country"
        app_label = 'main'


class SubDivision(models.Model):
    id = models.AutoField(primary_key=True) 
    country_id = models.IntegerField(null=True, blank=True)
    subdivision_id = models.IntegerField(null=True, blank=True)
    subdivision_code = models.CharField(max_length=255L)
    subdivision_name = models.CharField(max_length=255L)
    level = models.CharField(max_length=255L)
    created_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = "master_subdivision"
        app_label = 'main'
