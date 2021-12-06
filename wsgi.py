import os
import sys
import site

site.addsitedir('/home/scimergent/virtual_environments/scisphere/lib/python2.7/site-packages')

os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
