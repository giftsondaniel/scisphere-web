# vim: set fileencoding=utf-8

import os
import subprocess
import sys
import hashlib
from os.path import abspath, dirname, join
from pymongo import MongoClient
from django.contrib.messages import constants as message
#from haystack.management.commands import update_index 
from decimal import Decimal
from django.conf import global_settings

import djcelery
djcelery.setup_loader()

SITE_ROOT = os.path.join(os.path.realpath(os.path.dirname(__file__)), '../../') # added elango

sys.path.insert(0, '../..')

#Added by Elango - 2021-09-03
#import uuid
#uuid._uuid_generate_random = None

CURRENT_FILE = os.path.abspath(__file__)
PROJECT_ROOT = os.path.dirname(CURRENT_FILE)
PRINT_EXCEPTION = False

API_IP="159.89.167.167:8000"
#API_IP="104.131.100.225:8000" #stg server
UPLOAD_PAI_IP="159.89.167.167:2600"
OAUTH_IP=API_IP
API_KEY="8eEZTFRvGNRLStAt"
OAUTH_REDIRECT_IP="www.scisphere.in"
#OAUTH_REDIRECT_IP="139.59.34.92"
GEODB_PATH='/home/scimergent/GeoDB/GeoLite2-City.mmdb'
MEDIA_PATH='/home/scimergent/scisphere-web/media'
SITE_ID = 2

# Set to False to disable people from creating new accounts.
ALLOW_NEW_REGISTRATIONS = True

# Set to False to force users to login before seeing any pins. 
PUBLIC = True

DEBUG = True
ALLOWED_HOSTS = ['www.scisphere.in']
TEMPLATE_DEBUG = DEBUG
TEMPLATED_EMAIL_TEMPLATE_DIR = 'templated_email/'

ADMINS = (
     ('Admin', 'admin@scisphere.com'),
)


MANAGERS = ADMINS

DEFAULT_FROM_EMAIL = 'admin@scisphere.com'
EMAIL_HOST = 'smtp.mailgun.org'
EMAIL_HOST_USER = 'postmaster@scisphere.com'
EMAIL_HOST_PASSWORD = '4d0fe02e4af1b3c9a79a5eb7b6fadaea'
EMAIL_PORT = 587
EMAIL_USE_TLS = True



DATABASES = {
   'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'scispheredb',
        'USER': 'scibeti',
        'PASSWORD': 'betabeti789',
        'HOST': '159.89.166.217',
   }
}

MONGO_DATABASE = {
    'HOST': '139.59.34.92',
    'PORT': 27017,
    'NAME': 'scispheremongo',
    'USER': 'scisphereUser',
    'PASSWORD': 'sciProdMonDB'
}



# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'America/New_York'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

ugettext = lambda s: s

LANGUAGES = (
    ('fr', u'Français'),
    ('en', u'English'),
    ('es', u'Español'),
    ('it', u'Italiano'),
    ('km', u'ភាសាខ្មែរ'),
)


APPEND_SLASH=False

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale
USE_L10N = True

USE_TZ = False  # edited by elango
# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = '/media/'
#MEDIA_PATH='http://192.168.1.114/media'


# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = '/static/'

#ENKETO URL
ENKETO_URL = 'http://enketo.example.com/'
ENKETO_PREVIEW_URL = ENKETO_URL + 'webform/preview'

# Login URLs
LOGIN_URL = '/'
LOGIN_REDIRECT_URL = '/app/region_explorer'

# Login URLs
#LOGIN_URL = '/accounts/login/'
#LOGIN_REDIRECT_URL = '/login_redirect/'

# URL prefix for admin static files -- CSS, JavaScript and images.
# Make sure to use a trailing slash.
# Examples: "http://foo.com/static/admin/", "/static/admin/".
ADMIN_MEDIA_PREFIX = '/static/admin/'

# Additional locations of static files
STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    #'django.contrib.staticfiles.finders.DefaultStorageFinder',
    'compressor.finders.CompressorFinder'  	                      # ************* added elango
)
# Make this unique, and don't share it with anybody.
SECRET_KEY = 'mlfs33^s1l4xf6a36$0#j%dd*sisfoi&)&4s-v=91#^l01v)*j'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    #'django.template.loaders.filesystem.Loader',
    #'django.template.loaders.app_directories.Loader',
    # 'django.template.loaders.eggs.Loader',
    ('django.template.loaders.cached.Loader', (
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
    )),
)

#	********************************************DANI ADDED*******************************************************	
#SESSION_SERIALIZER = 'django.contrib.sessions.serializers.JSONSerializer'
SESSION_SERIALIZER = 'django.contrib.sessions.serializers.PickleSerializer'


TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.request',
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.contrib.messages.context_processors.messages',

    'social.apps.django_app.context_processors.backends',
    'django.core.context_processors.static',  # added elango
    'pinry.core.context_processors.template_settings', # added elango
    #'django_plans.plans.context_processors.account_status'
    'pinry.core.context_processors.settings_context_processor',	#added to remove cache on the client side

)
#	******************************************** DANI ADDED  ENDED*******************************************************	

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'django.middleware.locale.LocaleMiddleware',
    'utils.middleware.LocaleMiddlewareWithTweaks',
    #'django.middleware.csrf.CsrfViewMiddleware',   # edited elango
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.transaction.TransactionMiddleware',
    'utils.middleware.HTTPResponseNotAllowedMiddleware',
    'middleware.AutoLogout', 
    'preventconcurrentlogins.middleware.PreventConcurrentLoginsMiddleware',
)

#session timeout
AUTO_LOGOUT_DELAY = 60

LOCALE_PATHS = (os.path.join(PROJECT_ROOT, 'locale'), )

ROOT_URLCONF = 'urls'

TEMPLATE_DIRS = (
    os.path.join(PROJECT_ROOT, 'templates'),
    # Put strings here, like "/home/html/django_templates"
    # or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

#Added to remove cache from client side browser:
#function to generate md3sum::
def md5sum(filename):
    md5 = hashlib.md5()
    with open(filename,'rb') as f:
        for chunk in iter(lambda: f.read(128*md5.block_size), b''):
            md5.update(chunk)
    return md5.hexdigest()
try:

    JS_FILE_PATH_REGION = os.path.join(os.path.join(STATIC_ROOT,  'region_explorer') ,'explorer-region.js')#, 'explorer_filter.js'
    JS_MD5_REGION = md5sum(JS_FILE_PATH_REGION)

    JS_FILE_PATH_FILTER = os.path.join(os.path.join(STATIC_ROOT,  'filters_layers') ,'explore-filter.js')#, 'explorer_filter.js'
    JS_MD5_FILTER = md5sum(JS_FILE_PATH_FILTER)

    JS_FILE_PATH_SNAPSHOT = os.path.join(os.path.join(STATIC_ROOT,  'snapshot') ,'explore-snapshot.js')#, 'explorer_filter.js'
    JS_MD5_SNAPSHOT = md5sum(JS_FILE_PATH_SNAPSHOT)

    JS_FILE_PATH_COMMON = os.path.join(os.path.join(STATIC_ROOT,  'common_js') ,'common_variable.js')#, 'explorer_filter.js'
    JS_MD5_COMMON = md5sum(JS_FILE_PATH_COMMON)

except Exception as e:
    print "exception ::"	
    print e	
    JS_MD5 = ""


# needed by guardian
ANONYMOUS_USER_ID = -1

# *** added elango ***
API_LIMIT_PER_PAGE = 50
IMAGE_PATH = 'pinry.core.utils.upload_path' 
IMAGE_SIZES = {
    'thumbnail': {'size': [240, 0]},
    'standard': {'size': [600, 0]},
    'square': {'crop': True, 'size': [125, 125]},
}
# *** added elango ***

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    # Uncomment the next line to enable the admin:
    # Uncomment the next line to enable admin documentation:
    'django.contrib.admindocs',
    'registration',
    'south',
    'django_nose',
    #'restservice',
    'main',
    #'odk_logger',
    #'odk_viewer',
    'staff',
    'guardian',
    #'djcelery',
    'stats',
    'sms_support',
    'django_digest',
    #'dajaxice',
    'django_rq',
    'organizations',
    'myadmin',
# *** DANI ADDED ***
    'social.apps.django_app.default',
# *** DANI ADDED ends ***
    'taggit',
    'compressor',
    'django_images',
    'pinry.core',
    'pinry',
    'pinry.users',
    'taggit_templatetags', 
    'django.contrib.comments',
    #'doac_master.doac',
    #'doac_master.tests',
    'preventconcurrentlogins',
)

# **** elango added ***

#django search
#HAYSTACK_CONNECTIONS = {
#    'default': {
#        'ENGINE': 'haystack.backends.solr_backend.SolrEngine',
#        'URL': 'http://127.0.0.1:8000'#
#	#'ENGINE': 'haystack.backends.simple_backend.SimpleEngine',
#    },
#}

#HAYSTACK_DEFAULT_OPERATOR = 'AND'
#HAYSTACK_SEARCH_RESULTS_PER_PAGE = 50
#HAYSTACK_ID_FIELD = 'my_id'
#HAYSTACK_DJANGO_ID_FIELD = 'my_django_id'
# **** elango added ***

USE_THOUSAND_SEPARATOR = True
REGISTRATION_OPEN = False
COMPRESS = True

# extra data stored with users
AUTH_PROFILE_MODULE = 'main.UserProfile'

# case insensitive usernames

#AUTHENTICATION_BACKENDS = (
#    'main.backends.ModelBackend',
#    'guardian.backends.ObjectPermissionBackend',
#)

#**********Dani added
AUTHENTICATION_BACKENDS = (
    'pinry.users.auth.backends.CombinedAuthBackend', # added elango
    'social.backends.open_id.OpenIdAuth',
    'social.backends.google.GoogleOpenId',
    'social.backends.google.GoogleOAuth2',
    'social.backends.google.GoogleOAuth',
    'social.backends.google.GooglePlusAuth',
    'social.backends.twitter.TwitterOAuth',
    'social.backends.yahoo.YahooOpenId',
    'social.backends.stripe.StripeOAuth2',
    'social.backends.persona.PersonaAuth',
    'social.backends.facebook.FacebookOAuth2',
    'social.backends.facebook.FacebookAppOAuth2',
    'social.backends.yahoo.YahooOAuth',
    'social.backends.angel.AngelOAuth2',
    'social.backends.behance.BehanceOAuth2',
    'social.backends.bitbucket.BitbucketOAuth',
    'social.backends.box.BoxOAuth2',
    'social.backends.linkedin.LinkedinOAuth',
    'social.backends.linkedin.LinkedinOAuth2',
    'social.backends.github.GithubOAuth2',
    'social.backends.foursquare.FoursquareOAuth2',
    'social.backends.instagram.InstagramOAuth2',
    'social.backends.live.LiveOAuth2',
    'social.backends.vk.VKOAuth2',
    'social.backends.dailymotion.DailymotionOAuth2',
    'social.backends.disqus.DisqusOAuth2',
    'social.backends.dropbox.DropboxOAuth',
    'social.backends.evernote.EvernoteSandboxOAuth',
    'social.backends.fitbit.FitbitOAuth',
    'social.backends.flickr.FlickrOAuth',
    'social.backends.livejournal.LiveJournalOpenId',
    'social.backends.soundcloud.SoundcloudOAuth2',
    'social.backends.thisismyjam.ThisIsMyJamOAuth1',
    'social.backends.stocktwits.StocktwitsOAuth2',
    'social.backends.tripit.TripItOAuth',
    'social.backends.twilio.TwilioAuth',
    'social.backends.xing.XingOAuth',
    'social.backends.yandex.YandexOAuth2',
    'social.backends.douban.DoubanOAuth2',
    'social.backends.mixcloud.MixcloudOAuth2',
    'social.backends.rdio.RdioOAuth1',
    'social.backends.rdio.RdioOAuth2',
    'social.backends.yammer.YammerOAuth2',
    'social.backends.stackoverflow.StackoverflowOAuth2',
    'social.backends.readability.ReadabilityOAuth',
    'social.backends.skyrock.SkyrockOAuth',
    'social.backends.tumblr.TumblrOAuth',
    'social.backends.reddit.RedditOAuth2',
    'social.backends.steam.SteamOpenId',
    'social.backends.podio.PodioOAuth2',
    'social.backends.amazon.AmazonOAuth2',
    'social.backends.runkeeper.RunKeeperOAuth2',
    'social.backends.email.EmailAuth',
    'social.backends.username.UsernameAuth',
    'django.contrib.auth.backends.ModelBackend',
    'guardian.backends.ObjectPermissionBackend',
)
#***********Ends******

# Settings for Django Registration
ACCOUNT_ACTIVATION_DAYS = 3

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.



RQ_QUEUES = {
    'default': {
        'HOST': 'localhost',
        'PORT': 6379,
        'DB': 0,
        'PASSWORD': '',
        'DEFAULT_TIMEOUT': 360,
    },
    'high': {
        'URL': os.getenv('REDISTOGO_URL', 'redis://localhost:6379'), # If you're on Heroku
        'DB': 0,
        'DEFAULT_TIMEOUT': 500,
    },
    'low': {
        'HOST': 'localhost',
        'PORT': 6379,
        'DB': 0,
    }
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s' +
                      ' %(process)d %(thread)d %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler'
        },
       'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'audit': {
            'level': 'DEBUG',
            'class': 'utils.log.AuditLogHandler',
            'formatter': 'verbose',
            'model': 'main.models.audit.AuditLog'
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'console_logger': {
            'handlers': ['console'],
            'level': 'DEBUG',
           'propagate': True
        },
        'audit_logger': {
            'handlers': ['audit'],
            'level': 'DEBUG',
            'propagate': True
        }
    }
}


#LOGGING = {
#   'version': 1,
#   'disable_existing_loggers': False,
#        'filters': {
#       'require_debug_false': {
#           '()': 'django.utils.log.RequireDebugFalse'
#       }
#   },
#   'formatters': {
#       'verbose': {
#           'format': '%(levelname)s %(asctime)s %(module)s' +
#                     ' %(process)d %(thread)d %(message)s'
#       },
#       'simple': {
#           'format': '%(levelname)s %(message)s'
#       },
#   },
#   'handlers': {
#       'mail_admins': {
#           'level': 'ERROR',
#           'filters': ['require_debug_false'],
#           'class': 'django.utils.log.AdminEmailHandler'
#       },
#        'console': {
#            'level': 'DEBUG',
#            'class': 'logging.StreamHandler',
#            'formatter': 'verbose'
#        },
#        'audit': {
#            'level': 'DEBUG',
#            'class': 'utils.log.AuditLogHandler',
#            'formatter': 'verbose',
#            'model': 'main.models.audit.AuditLog'
#        },
#    },
#    'loggers': {
#        'django.request': {
#            'handlers': ['mail_admins'],
#            'level': 'DEBUG',
#            'propagate': True,
#        },
#        'console_logger': {
#            'handlers': ['console'],
#            'level': 'DEBUG',
#            'propagate': True
#        },
#        'audit_logger': {
#            'handlers': ['audit'],
#            'level': 'DEBUG',
#            'propagate': True
#        }
#    },
#}




GOOGLE_STEP2_URI = 'http://formhub.org/gwelcome'
GOOGLE_CLIENT_ID = '617113120802.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = '9reM29qpGFPyI8TBuB54Z4fk'

THUMB_CONF = {
    'large': {'size': 1280, 'suffix': '-large'},
    'medium': {'size': 640, 'suffix': '-medium'},
    'small': {'size': 240, 'suffix': '-small'},
}
# order of thumbnails from largest to smallest
THUMB_ORDER = ['large', 'medium', 'small']
IMG_FILE_TYPE = 'jpg'

# celery
BROKER_BACKEND = "rabbitmq"
BROKER_URL = 'amqp://guest:guest@localhost:5672/'
CELERY_RESULT_BACKEND = "amqp"  # telling Celery to report results to RabbitMQ
CELERY_ALWAYS_EAGER = False


# auto add crowdform to new registration
AUTO_ADD_CROWDFORM = False
DEFAULT_CROWDFORM = {'xform_username': 'bob', 'xform_id_string': 'transport'}

# duration to keep zip exports before deletio (in seconds)
ZIP_EXPORT_COUNTDOWN = 3600  # 1 hour

# default content length for submission requests
DEFAULT_CONTENT_LENGTH = 10000000

TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'
NOSE_ARGS = ['--with-fixture-bundling']

TESTING_MODE = False
if len(sys.argv) >= 2 and (sys.argv[1] == "test" or sys.argv[1] == "test_all"):
    # This trick works only when we run tests from the command line.
    TESTING_MODE = True
else:
    TESTING_MODE = False


MEDIA_ROOT = os.path.join(SITE_ROOT, 'media')

if TESTING_MODE:
    MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'test_media/')
    subprocess.call(["rm", "-r", MEDIA_ROOT])
    MONGO_DATABASE['NAME'] = "formhub_test"
    # need to have CELERY_ALWAYS_EAGER True and BROKER_BACKEND as memory
    # to run tasks immediately while testing
    CELERY_ALWAYS_EAGER = True
    BROKER_BACKEND = 'memory'
    #TEST_RUNNER = 'djcelery.contrib.test_runner.CeleryTestSuiteRunner'
else:
    MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media/')  

if PRINT_EXCEPTION and DEBUG:
    MIDDLEWARE_CLASSES += ('utils.middleware.ExceptionLoggingMiddleware',)

# re-captcha in registrations
REGISTRATION_REQUIRE_CAPTCHA = False
RECAPTCHA_USE_SSL = False
RECAPTCHA_PRIVATE_KEY = ''
RECAPTCHA_PUBLIC_KEY = '6Ld52OMSAAAAAJJ4W-0TFDTgbznnWWFf0XuOSaB6'

try:
    from local_settings import *
except ImportError:
    print("You can override the default settings by adding a "
          "local_settings.py file.")

	#************************************************** DANI  ADDED*************************************************	
#LOGIN_URL = '/login/'
#LOGIN_REDIRECT_URL = '/done/'
URL_PATH = ''
SOCIAL_AUTH_STRATEGY = 'social.strategies.django_strategy.DjangoStrategy'
SOCIAL_AUTH_STORAGE = 'social.apps.django_app.default.models.DjangoStorage'
SOCIAL_AUTH_GOOGLE_OAUTH_SCOPE = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/userinfo.profile'
]
# SOCIAL_AUTH_EMAIL_FORM_URL = '/signup-email'
SOCIAL_AUTH_EMAIL_FORM_HTML = 'email_signup.html'
SOCIAL_AUTH_EMAIL_VALIDATION_FUNCTION = 'example.app.mail.send_validation'
SOCIAL_AUTH_EMAIL_VALIDATION_URL = '/email-sent/'
# SOCIAL_AUTH_USERNAME_FORM_URL = '/signup-username'
SOCIAL_AUTH_USERNAME_FORM_HTML = 'username_signup.html'

#for TWITTER
SOCIAL_AUTH_TWITTER_KEY = 'tnMn5vha51jSKSHqccjw'
SOCIAL_AUTH_TWITTER_SECRET = 'rrqDnAEIwHWcLVMhZO7OjHue58UoY5HOf7uy7wL8mtc'

#for Linkedin
SOCIAL_AUTH_LINKEDIN_KEY = '75eqvvgbb40ii0'
SOCIAL_AUTH_LINKEDIN_SECRET = 'k67VNV2JD6M8fcL8'

#for Github
SOCIAL_AUTH_GITHUB_KEY = '96cfa2c6b01981150fe5'
SOCIAL_AUTH_GITHUB_SECRET = 'eea8fc29d132f5f6e81552353f1d34194a38e1d8'


SOCIAL_AUTH_PIPELINE = (
    #'social.pipeline.social_auth.social_details',
    #'social.pipeline.social_auth.social_uid',
    #'social.pipeline.social_auth.auth_allowed',
    #'social.pipeline.social_auth.social_user',
    #'social.pipeline.user.get_username',
    #'app.pipeline.require_email',
    #'social.pipeline.mail.mail_validation',
    #'social.pipeline.user.create_user',
    #'social.pipeline.social_auth.associate_user',
    #'social.pipeline.social_auth.load_extra_data',
    #'social.pipeline.user.user_details'
    #'social_auth.backends.pipeline.social.social_auth_user',
    #'social_auth.backends.pipeline.associate.associate_by_email',
    #'social_auth.backends.pipeline.misc.save_status_to_session',
    #'app.pipeline.redirect_to_form',
    #'app.pipeline.username',
    #'social_auth.backends.pipeline.user.create_user',
    #'social_auth.backends.pipeline.social.associate_user',
    #'social_auth.backends.pipeline.social.load_extra_data',
    #'social_auth.backends.pipeline.user.update_user_details',
    #'social_auth.backends.pipeline.misc.save_status_to_session',
    #'app.pipeline.redirect_to_form2',
    #'app.pipeline.first_name',

    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username',
    'app.pipeline.require_email',
    'social.pipeline.mail.mail_validation',
    'social.pipeline.user.create_user',
    'social.pipeline.social_auth.associate_user',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details'




)

try:
    from example.local_settings import *
except ImportError:
    pass


try:
    from local_settings import *
except ImportError:
    print("You can override the default settings by adding a "
          "local_settings.py file.")
	#*************************************************** DANI ADDED ENDS************************************************	


# MongoDB
MONGO_CONNECTION_URL=None
if MONGO_DATABASE.get('USER') and MONGO_DATABASE.get('PASSWORD'):
    MONGO_CONNECTION_URL = (
        "mongodb://%(USER)s:%(PASSWORD)s@%(HOST)s:%(PORT)s") % MONGO_DATABASE
else:
    MONGO_CONNECTION_URL = "mongodb://%(HOST)s:%(PORT)s" % MONGO_DATABASE
#MONGO_CONNECTION = MongoClient(MONGO_CONNECTION_URL, safe=True, j=True)
MONGO_CONNECTION = MongoClient(MONGO_CONNECTION_URL+"/"+MONGO_DATABASE['NAME'], safe=True, j=True)

MONGO_DB = MONGO_CONNECTION[MONGO_DATABASE['NAME']]

# Clear out the test database
if TESTING_MODE:
    MONGO_DB.instances.drop()
