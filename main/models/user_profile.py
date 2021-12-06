from django.contrib.auth.models import User, Group
from django.db import models
from django.utils.translation import ugettext_lazy
from utils.country_field import COUNTRIES,INDUSTRY
from utils.gravatar import get_gravatar_img_link, gravatar_exists
from django.db.models.signals import post_save

#class UserGroups(models.Model):
#    user = models.OneToOneField(User, related_name='profile')
#    group = models.OneToOneField(Group)
 
class UserProfile(models.Model):
    # This field is required.
    user = models.OneToOneField(User, related_name='profile')

    # Other fields here
    #name = models.CharField(max_length=255, blank=True)
    #city = models.CharField(max_length=255, blank=True)
    #country = models.CharField(max_length=2, choices=COUNTRIES, blank=True)
    #industry = models.CharField(max_length=255, choices=INDUSTRY, blank=True)
    #organization = models.CharField(max_length=255, blank=True)
    #home_page = models.CharField(max_length=255, blank=True)
    #twitter = models.CharField(max_length=255, blank=True)
    #description = models.CharField(max_length=255, blank=True)
    #require_auth = models.BooleanField(default=False,
    #verbose_name=ugettext_lazy("Require Phone Authentication"))
    username = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    job_title = models.CharField(max_length=255, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=2, choices=COUNTRIES, blank=True ,null=True)
    state = models.CharField(max_length=2, blank=True, null=True)
    industry = models.CharField(max_length=255, choices=INDUSTRY, blank=True, null=True)
    is_individual = models.BooleanField(default=False)
    

    class Meta:
        app_label = 'main'

from utils.stathat_api import stathat_count
def stathat_user_signups(sender, instance, created, **kwargs):
    if created:
       stathat_count('formhub-signups')
post_save.connect(stathat_user_signups, sender=UserProfile)
