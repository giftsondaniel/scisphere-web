from pinry.settings import *

import os


DEBUG = True
TEMPLATE_DEBUG = DEBUG

#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': os.path.join(SITE_ROOT, 'development.db'),
#    }
#}
DATABASES = {
'default': {
'ENGINE': 'django.db.backends.postgresql_psycopg2',
'NAME': 'pinry',
'USER': 'postgres',
'PASSWORD': '',
'HOST': 'localhost',
}
}

SECRET_KEY = 'fake-key'
