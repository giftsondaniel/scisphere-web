import re
import urllib2
from urlparse import urlparse

from django import forms
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.core.validators import URLValidator
from django.forms import ModelForm
from django.utils.translation import ugettext as _, ugettext_lazy
from django.conf import settings
from recaptcha.client import captcha

from main.models import UserProfile
from odk_logger.models import XForm
from odk_viewer.models.data_dictionary import upload_to
from registration.forms import RegistrationFormUniqueEmail
from registration.models import RegistrationProfile
from utils.country_field import COUNTRIES,INDUSTRY #,SHARED
from utils.logger_tools import publish_xls_form

from PIL import Image
from django.utils.translation import ugettext as _

from django.utils import timezone
from geoip import geolite2 #added
from ipware.ip import get_ip
from geoip import open_database
from datetime import datetime
from organizations.models import Organization, OrganizationUser

FORM_LICENSES_CHOICES = (
    ('No License', ugettext_lazy('No License')),
    ('https://creativecommons.org/licenses/by/3.0/',
     ugettext_lazy('Attribution CC BY')),
    ('https://creativecommons.org/licenses/by-sa/3.0/',
     ugettext_lazy('Attribution-ShareAlike CC BY-SA')),
)

DATA_LICENSES_CHOICES = (
    ('No License', ugettext_lazy('No License')),
    ('http://opendatacommons.org/licenses/pddl/summary/',
     ugettext_lazy('PDDL')),
    ('http://opendatacommons.org/licenses/by/summary/',
     ugettext_lazy('ODC-BY')),
    ('http://opendatacommons.org/licenses/odbl/summary/',
     ugettext_lazy('ODBL')),
)

PERM_CHOICES = (
    ('view', ugettext_lazy('Can view')),
    ('edit', ugettext_lazy('Can edit')),
    ('remove', ugettext_lazy('Remove permissions')),
)


class DataLicenseForm(forms.Form):
    value = forms.ChoiceField(choices=DATA_LICENSES_CHOICES,
                              widget=forms.Select(
                                  attrs={'disabled': 'disabled',
                                         'id': 'data-license'}))


class FormLicenseForm(forms.Form):
    value = forms.ChoiceField(choices=FORM_LICENSES_CHOICES,
                              widget=forms.Select(
                                  attrs={'disabled': 'disabled',
                                         'id': 'form-license'}))


class PermissionForm(forms.Form):
    for_user = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'id': 'autocomplete',
                'data-provide': 'typeahead',
                'autocomplete': 'off'
            })
    )
    perm_type = forms.ChoiceField(choices=PERM_CHOICES, widget=forms.Select())

    def __init__(self, username):
        self.username = username
        super(PermissionForm, self).__init__()


class UserProfileForm(ModelForm):
    class Meta:
        model = UserProfile
        exclude = ('user',)
    email = forms.EmailField(widget=forms.TextInput())

class contactUsForm(forms.Form):
    OPTIONS = (
              ("Sector", "Sector"),
              ("Non-profit", "Non-profit"),
 		("Government", "Government"),
    		("Media and Publishing", "Media and Publishing"), 
		("Financial Services", "Financial Services"),
 		("Agriculture", "Agriculture"),
 		("FMCG", "FMCG"),
 		("Telecom", "Telecom"),
 		("Manufacturing", "Manufacturing"),
 		("Distribution", "Distribution"),
 		("Retail", "Retail"),
 		("Other", "Other")
                )

 	
    yourname = forms.CharField(error_messages={'required': 'Name is required'} ,widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Your Name'}), required=True,
                           max_length=255)
    email = forms.EmailField(error_messages={'required': 'Email is required'} ,)
    phonenum = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Phone Number'}), required=False,
                           max_length=255)
    companyname = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Company Name'}), required=False,
                           max_length=255)
    message = forms.CharField(error_messages={'required': 'Message is required'} ,widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Message'}), required=True,
                           max_length=5000)    
    sector = forms.ChoiceField(widget=forms.Select(attrs={'class':'text-field selectbox'}), required=False,  choices=OPTIONS, initial='0')


class inviteForm(forms.Form):
    OPTIONS = (
		("", "Sector"),
              ("Non-profit", "Non-profit"),
 		("Government", "Government"),
    		("Media and Publishing", "Media and Publishing"), 
		("Financial Services", "Financial Services"),
 		("Agriculture", "Agriculture"),
 		("FMCG", "FMCG"),
 		("Telecom", "Telecom"),
 		("Manufacturing", "Manufacturing"),
 		("Distribution", "Distribution"),
 		("Retail", "Retail"),
 		("Other", "Other")
                )
 	
    first_name = forms.CharField(error_messages={'required': 'Your First Name is required'} ,widget=forms.TextInput(attrs={'class':'text-field','placeholder':'First Name'}), required=True,
                           max_length=255)
    last_name = forms.CharField(error_messages={'required': 'Your Last Name is required'} ,widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Last Name'}), required=True,
                           max_length=255)
    job_title = forms.CharField(error_messages={'required': 'Job Title is required'} ,widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Job Title'}), required=True,
                           max_length=255)
    company = forms.CharField(error_messages={'required': 'Company is required'} ,widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Company'}), required=True,
                           max_length=255)
    sector = forms.ChoiceField(error_messages={'required': 'Sector is required'} ,widget=forms.Select(attrs={'class':'text-field selectbox','placeholder':'Subject'}), required=True, choices=OPTIONS, initial='0')
    email = forms.EmailField(error_messages={'required': 'Email is required'} ,widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Email'}), required=True,
                           max_length=255)


class UserProfileFormRegister(forms.Form):

    REGISTRATION_REQUIRE_CAPTCHA = settings.REGISTRATION_REQUIRE_CAPTCHA
    RECAPTCHA_PUBLIC_KEY = settings.RECAPTCHA_PUBLIC_KEY
    RECAPTCHA_HTML = captcha.displayhtml(settings.RECAPTCHA_PUBLIC_KEY,
                                         use_ssl=settings.RECAPTCHA_USE_SSL)

    #name = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Name'}), required=False,
    #                       max_length=255)
    #city = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field'}), required=False,
    #                       max_length=255)
    #country = forms.ChoiceField(widget=forms.Select(), required=False,
    #                            choices=COUNTRIES, initial='ZZ')
    #industry = forms.ChoiceField(widget=forms.Select(attrs={'class':'text-field selectbox'}), required=False,
    #                            choices=INDUSTRY, initial='0') #added
    #organization = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field'}), required=False,
    #                               max_length=255)
    #home_page = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field'}), required=False,
    #                            max_length=255)
    #twitter = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field'}), required=False,
    #                          max_length=255)

    #recaptcha_challenge_field = forms.CharField(required=False, max_length=512)
    #recaptcha_response_field = forms.CharField(max_length=100,
    #                                           required=settings.REGISTRATION_REQUIRE_CAPTCHA)

    first_name = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field','placeholder':'First name'}), required=True,
                           max_length=255)
    last_name = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Last name'}), required=True,
                           max_length=255)
    job_title = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Job title'}), required=False,
                           max_length=255)
    company = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Company'}), required=False,
                           max_length=255)
    industry = forms.ChoiceField(widget=forms.Select(attrs={'class':'text-field selectbox'}), required=False,
                                choices=INDUSTRY, initial='0')
    is_individual = forms.BooleanField(required=False)

    def save(self, request, new_user ):
	# get public ip address and find the location of country
  	#added
        country = "IN"
        state = "TN"
        try:
           ip = get_ip(request)
           db = open_database(settings.GEODB_PATH)
           match = db.lookup(ip)
           if match is not None:
              country = match.country
              if match.subdivisions:
                 state = match.subdivisions
                 state = list(state)[0]
        except Exception as e:
           print e 
           country = "IN"
           state = "TN"
	#added

        individual = self.cleaned_data['is_individual']

        new_profile = \
            UserProfile(user=new_user, username=self.cleaned_data['email'],
                        first_name=self.cleaned_data['first_name'],
                        last_name=self.cleaned_data['last_name'],
                        job_title=self.cleaned_data['job_title'],
                        company=self.cleaned_data['company'],
                        country=country,
			   state=state,
                        industry=self.cleaned_data['industry'],
                        is_individual=self.cleaned_data['is_individual'])
                        
        new_profile.save()

	#Set organisation if the individual user:
	if(individual):
	     name_org = "org_user_"+str(new_profile.user_id)
	     org = Organization()
	     org.created = datetime.now()
	     org.modified = datetime.now()
	     org.name = str(name_org)
	     org.slug = str(name_org)
	     org.save()

	#Set user id in organisation after registering the user in main user profile:
	if(individual):
	     orgUser = OrganizationUser()
	     orgUser.created = datetime.now()
	     orgUser.modified = datetime.now()
	     orgUser.user_id = new_profile.user_id
	     orgUser.organization_id = org.id
	     orgUser.is_admin = True
	     orgUser.save()

        return new_profile


# order of inheritance control order of form display
class RegistrationFormUserProfile(RegistrationFormUniqueEmail,
                                  UserProfileFormRegister):
    class Meta:
        pass

    _reserved_usernames = [
        'accounts',
        'about',
        'admin',
        'clients',
        'crowdform',
        'crowdforms',
        'data',
        'formhub',
        'forms',
        'maps',
        'odk',
        'people',
        'submit',
        'submission',
        'support',
        'syntax',
        'xls2xform',
        'users',
        'worldbank',
        'unicef',
        'who',
        'wb',
        'wfp',
        'save',
        'ei',
        'modilabs',
        'mvp',
        'unido',
        'unesco',
        'savethechildren',
        'worldvision',
        'afsis'
    ]

    #username = forms.CharField(widget=forms.TextInput(attrs={'class':'text-field','placeholder':'User name'}), max_length=30)
    email = forms.EmailField(widget=forms.TextInput(attrs={'class':'text-field','placeholder':'Email'}))

    legal_usernames_re = re.compile("^\w+$")

    def clean(self):
        cleaned_data = super(UserProfileFormRegister, self).clean()

        # don't check captcha if it's disabled
        if not settings.REGISTRATION_REQUIRE_CAPTCHA:
            return cleaned_data

        response = captcha.submit(
            cleaned_data.get('recaptcha_challenge_field'),
            cleaned_data.get('recaptcha_response_field'),
            settings.RECAPTCHA_PRIVATE_KEY,
            None)

        if not response.is_valid:
            raise forms.ValidationError(_(u"The Captcha is invalid. "
                                          u"Please, try again."))
        return cleaned_data

    def clean_username(self):
        username = self.cleaned_data['username'].lower()
        if username in self._reserved_usernames:
            raise forms.ValidationError(
                _(u'%s is a reserved name, please choose another') % username)
        elif not self.legal_usernames_re.search(username):
            raise forms.ValidationError(
                _(u'username may only contain alpha-numeric characters and '
                  u'underscores'))
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError(_(u'%s already exists') % username)

    def save(self, request, profile_callback=None):
        new_user = RegistrationProfile.objects.create_inactive_user(
            username=self.cleaned_data['email'],#username
            password=self.cleaned_data['password1'],
            email=self.cleaned_data['email'])
        UserProfileFormRegister.save(self, request, new_user)
        if hasattr(settings, 'AUTO_ADD_CROWDFORM') and \
                settings.AUTO_ADD_CROWDFORM and \
                hasattr(settings, 'DEFAULT_CROWDFORM'):
            try:
                default_crowdform = settings.DEFAULT_CROWDFORM
                if isinstance(default_crowdform, dict) and\
                        'xform_username' in default_crowdform and\
                        'xform_id_string' in default_crowdform:
                    xform = XForm.objects.get(
                        id_string=default_crowdform['xform_id_string'],
                        user__username=default_crowdform['xform_username'])
                    MetaData.crowdform_users(xform, new_user.username)
            except XForm.DoesNotExist:
                pass
        return new_user


class SourceForm(forms.Form):
    source = forms.FileField(label=ugettext_lazy(u"Source document"),
                             required=True)


class SupportDocForm(forms.Form):
    doc = forms.FileField(label=ugettext_lazy(u"Supporting document"),
                          required=True)


class MediaForm(forms.Form):
    media = forms.FileField(label=ugettext_lazy(u"Media upload"),
                            required=True)

    def clean_media(self):
        data_type = self.cleaned_data['media'].content_type
        if not data_type in ['image/jpeg', 'image/png', 'audio/mpeg']:
            raise forms.ValidationError('Only these media types are \
                                        allowed .png .jpg .mp3 .3gp .wav')


class MapboxLayerForm(forms.Form):
    map_name = forms.CharField(widget=forms.TextInput(), required=True,
                               max_length=255)
    attribution = forms.CharField(widget=forms.TextInput(), required=False,
                                  max_length=255)
    link = forms.URLField(label=ugettext_lazy(u'JSONP url'),
                          required=True)  # verify_exists=False, edited


class QuickConverterFile(forms.Form):
    xls_file = forms.FileField(
        label=ugettext_lazy(u'XLS File'), required=False)


class QuickConverterURL(forms.Form):
    xls_url = forms.URLField(label=ugettext_lazy('XLS URL'),
                             required=False) #verify_exists=False, edited


class QuickConverterDropboxURL(forms.Form):
    dropbox_xls_url = forms.URLField(
        label=ugettext_lazy('XLS URL'), required=False) # verify_exists=False, edited


class QuickConverter(QuickConverterFile, QuickConverterURL,
                     QuickConverterDropboxURL):
    validate = URLValidator() # verify_exists=True edited

    def publish(self, user, id_string=None):
        if self.is_valid():
            cleaned_xls_file = self.cleaned_data['xls_file']
            if not cleaned_xls_file:
                cleaned_url = self.cleaned_data['xls_url']
                if cleaned_url.strip() == u'':
                    cleaned_url = self.cleaned_data['dropbox_xls_url']
                cleaned_xls_file = urlparse(cleaned_url)
                cleaned_xls_file = \
                    '_'.join(cleaned_xls_file.path.split('/')[-2:])
                if cleaned_xls_file[-4:] != '.xls':
                    cleaned_xls_file += '.xls'
                cleaned_xls_file = \
                    upload_to(None, cleaned_xls_file, user.username)
                self.validate(cleaned_url)
                xls_data = ContentFile(urllib2.urlopen(cleaned_url).read())
                cleaned_xls_file = \
                    default_storage.save(cleaned_xls_file, xls_data)
            # publish the xls
            return publish_xls_form(cleaned_xls_file, user, id_string)


class ActivateSMSSupportFom(forms.Form):

    enable_sms_support = forms.TypedChoiceField(coerce=lambda x: x == 'True',
                                                choices=((False, 'No'),
                                                         (True, 'Yes')),
                                                widget=forms.Select,
                                                label=ugettext_lazy(
                                                    u"Enable SMS Support"))
    sms_id_string = forms.CharField(max_length=50, required=True,
                                    label=ugettext_lazy(u"SMS Keyword"))

    def clean_sms_id_string(self):
        sms_id_string = self.cleaned_data.get('sms_id_string', '').strip()

        if not re.match(r'^[a-z0-9\_\-]+$', sms_id_string):
            raise forms.ValidationError(u"id_string can only contain alphanum"
                                        u" characters")

        return sms_id_string
