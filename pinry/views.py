from django.contrib.auth.decorators import login_required
from django.template import RequestContext, loader
from django.shortcuts import render_to_response, get_object_or_404
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from utils.logger_tools import OpenRosaResponse

from django.http import HttpResponseRedirect
from django.conf import settings
from django.core.urlresolvers import reverse
from django.views.generic import CreateView
from django_images.models import Image

from braces.views import JSONResponseMixin, LoginRequiredMixin


#from .forms import ImageForm


@login_required
def recent_pins(request):
    context = RequestContext(request)
    username=request.user
    content_user = get_object_or_404(User, username=username)
    
    # for any other user -> profile
    return render_to_response("core/pins.html", context_instance=context)


@login_required
def savedimage(request):
    context = RequestContext(request)
    username=request.user
    content_user = get_object_or_404(User, username=username)

    # for any other user -> profile
    return render_to_response("core/savedimage.html", context_instance=context)

@login_required
def userwise_pins(request):
    print("user *****************8 ")
    context = RequestContext(request)
    username=request.user
    content_user = get_object_or_404(User, username=username)
    
    # for any other user -> profile
    return render_to_response("core/pins.html", context_instance=context)

@login_required
def tag_pins(request):
    context = RequestContext(request)
    username=request.user
    content_user = get_object_or_404(User, username=username)
    
    # for any other user -> profile
    return render_to_response("core/pins.html", context_instance=context)

@login_required
#@csrf_exempt
def create_image(request):
    context = RequestContext(request)
    username=request.user
    content_user = get_object_or_404(User, username=username)
    
    # for any other user -> profile
    return OpenRosaResponse(context)


