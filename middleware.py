from datetime import datetime, timedelta
from django.conf import settings
from django.contrib import auth
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.shortcuts import redirect
from django.shortcuts import render_to_response, get_object_or_404,render
from django.template import loader, RequestContext
from django.core.urlresolvers import reverse_lazy

class AutoLogout:
  def process_request(self, request):
    context = RequestContext(request)
    if not request.user.is_authenticated():
      #print(request.META)
      #Can't log out if not logged in
      return

    try:
      if datetime.now() - request.session['last_touch'] > timedelta( 0, settings.AUTO_LOGOUT_DELAY * 60, 0):
        auth.logout(request)
        del request.session['last_touch']
	console.log("request ************* ");
        return
	
    except KeyError:
      pass

    request.session['last_touch'] = datetime.now()
