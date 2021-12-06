from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.contrib.auth import REDIRECT_FIELD_NAME,views as auth_views

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from django.views.generic import TemplateView


admin.autodiscover()

urlpatterns = patterns('',
    #change Language

    url(r'^$', auth_views.login,
        {'template_name': 'home.html'}),
    url(r'^admin', include(admin.site.urls)),
    url(r'', include('pinry.urls', namespace="pinry")), 
    url(r'^django-rq/', include('django_rq.urls')),
    url(r'^signup-email/', 'app.views.signup_email'),
    url(r'^email-sent/', 'app.views.validation_sent'),
    url(r'^login/$', auth_views.login, name='login_home'),
    url(r'^done/$', 'app.views.done', name='done'),
    url(r'^email/$', 'app.views.require_email', name='require_email'),
    url(r'', include('social.apps.django_app.urls', namespace='social')),
    url(r'^organizations/', include('organizations.urls')),  
    (r'^i18n/', include('django.conf.urls.i18n')),

    # django default stuff
    url(r'^accounts/', include('main.registration_urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # google urls
    url(r'^gauthtest/$',
        'main.google_export.google_oauth2_request',
        name='google-auth'),
    url(r'^gwelcome/$',
        'main.google_export.google_auth_return',
        name='google-auth-welcome'),

    # main website views
    # api call
    url(r'^accounts/register/complete/scisphere/places/countries$', 'main.views.countries'),
    url(r'^accounts/register/complete/scisphere/places/countrydetail$', 'main.views.countrydetail'),
    	#regionexplorere
    url(r'^app/scisphere/places/countries$', 'main.views.countries'),
    url(r'^app/scisphere/places/countrydetail$', 'main.views.countrydetail'), #added
    url(r'^app/places/(?P<id>[^/]+)/region$', 'main.views.region'),
    url(r'^app/scisphere/places/(?P<stid>[^/]+)/(?P<id>[^/]+)/snapshot$', 'main.views.snapshot_data'),
    	#regionexplorere - ECONOMIC CENSUS
    url(r'^app/places/(?P<id>[^/]+)/region_ec$', 'main.views.region_ec'),

    	#api call filter&layers
    url(r'^app/scisphere/places/keydetail$', 'main.views.keydetail'),
    url(r'^app/scisphere/places/(?P<id>[^/]+)$', 'main.views.filter_data'),
    url(r'^app/scisphere/places/googleApi/(?P<id>[^/]+)$', 'main.views.filter_data_google_api'),
    url(r'^app/filter_layers/places/layers$', 'main.views.layers_data'),
    url(r'^app/filter_layers/places/listofvillages$', 'main.views.filter_listofvillages'),
    url(r'^app/get_workbook_list$', 'main.views.get_workbook_list'),

        #snapshot
    url(r'^app/scisphere/places/(?P<level1Id>[^/]+)/(?P<level2Id>[^/]+)$', 'main.views.level3data'),
	#upload 

       #Trend:
    url(r'^app/trend$', 'main.views.trend', name='trend'),
    url(r'^app/scisphere/trend_data/(?P<id>[^/]+)$', 'main.views.trend_data'),

    #Correlate:
    url(r'^app/correlate$', 'main.views.correlate', name='correlate'),
    url(r'^app/places/correlate/(?P<id>[^/]+)$', 'main.views.correlate_data'),
    #url(r'^app/places/correlate/(?P<id>[^/]+)$', 'main.views.simple'),

    #Share a Map or Chart:
    url(r'^app/shareMap/(?P<level0Id>[^/]+)/(?P<level1Id>[^/]+)/(?P<level>[^/]+)/(?P<fieldId>[^/]+)/(?P<leveltype>[^/]+)/(?P<type>[^/]+)/(?P<indexname>[^/]+)/(?P<category>[^/]+)/(?P<color>[^/]+)/(?P<size>[^/]+)/(?P<uniquekey>[^/]+)$', 'main.views.sharemap'),
    url(r'^embed/shareMap/(?P<level0Id>[^/]+)/(?P<level1Id>[^/]+)/(?P<level>[^/]+)/(?P<fieldId>[^/]+)/(?P<leveltype>[^/]+)/(?P<type>[^/]+)/(?P<indexname>[^/]+)/(?P<category>[^/]+)/(?P<color>[^/]+)/(?P<size>[^/]+)/(?P<uniquekey>[^/]+)$', 'main.views.sharemap'),
    url(r'^embed/share', 'main.views.embedShare'),


    #Compare Regions:
    url(r'^app/region_compare$', 'main.views.region_compare', name='region_compare'),
    url(r'^app/places/compare$', 'main.views.region_compare_data'),
    url(r'^app/places/master$', 'main.views.master_data'),

    #oauth call
    url(r'^app/oauthcall$', 'main.views.oauthcall'),
    url(r'^app/oauth_redirect$', 'main.views.oauth_redirect'),
    url(r'^app/oauth_redirect_welcome$', 'main.views.oauth_redirect_welcome'),
   
    url(r'^client_create$', 'main.views.client_create'),
    url(r'^client_list$', 'main.views.client_list'),
    url(r'^shorturl$', 'main.views.shorturl'),
    url(r'^mail_urlshare$', 'main.views.urlshare'),

    url(r'^app/template$', 'main.views.templateform'),
    url(r'^app/dataset_exists/(?P<id>[^/]+)$', 'main.views.dataset_exists'),
    url(r'^app/upload$', 'main.views.upload'),
    url(r'^app/uploadverify$', 'main.views.uploadverify'),
    url(r'^app/analyze$', 'main.views.analyze'),
    url(r'^app/region_explorer$', 'main.views.region_explorer', name='region_explorer'),
    url(r'^app/filters_layers$', 'main.views.filters_layers', name='filters_layers'),
    url(r'^app/snapshot$', 'main.views.snapshot', name='snapshot'),
    url(r'^app/location_analyser$', 'main.views.location_analyser'),
    url(r'^app/contextual_influencers$', 'main.views.contextual_influencers'),
    url(r'^app/context_variables$', 'main.views.context_variables'),
    url(r'^app/get_template_list$', 'main.views.get_template_list'),

    url(r'^app/mysphere_saved_list$', 'main.views.mysphere_saved_list'),
    url(r'^app/mysphere_workbook$', 'main.views.mysphere_workbook'),

    #analytics
    url(r'^app/scisphere/place/(?P<id>[^/]+)/datasummary$', 'main.views.datasummary'),
    url(r'^app/rural_location$', 'main.views.rural_location'),
    url(r'^app/rural_location_process$', 'main.views.rural_location_process'),
    url(r'^app/rural_location_result$', 'main.views.rural_location_result'),
    url(r'^app/model_execution$', 'main.views.model_execution'),
    url(r'^app/model_master_list$', 'main.views.model_master_list'),

    #subscription
    url(r'^app/upgrade_account$', 'main.views.upgrade_account'),
    url(r'^app/upgrade_payment$', 'main.views.upgrade_payment'),
    url(r'^app/subscription_free$', 'main.views.subscription_free'),
    url(r'^app/subscription_plan$', 'main.views.subscription_plan'),
    url(r'^app/subscription_list$', 'main.views.subscription_list'),
    url(r'^app/subscription_mail$', 'main.views.subscription_mail'),
    url(r'^app/subscription_upgrade$', 'main.views.subscription_upgrade'),


    #contact
    url(r'^app/contact$', 'main.views.contact'),
    url(r'^app/signup/$', "main.views.invite", name='invite'),	
    url(r'^app/about', 'main.views.about'),
    url(r'^app/home-analyze', 'main.views.home_analyze'),
    url(r'^app/analyze-location', 'main.views.analyze_location'),
    url(r'^app/analyze-beta', 'main.views.analyzebeta'),


    #mybuilds
    #url(r'^mysphere_mybuilds$', 'main.views.mysphere_mybuilds'),
    #url(r'^mysphere_mybuilds/(?P<id>[^/]+)$', 'main.views.mysphere_mybuilds'),
    #my builds for filters write:	
    url(r'^app/mysphere_mybuilds_for_filters/(?P<id>[^/]+)$', 'main.views.mysphere_mybuilds_for_filters'),

    #my builds for filters Read:	
    url(r'^app/mysphere_mybuilds_for_filters_list/(?P<id>[^/]+)$', 'main.views.mysphere_mybuilds_for_filters_list'),

    #my builds for filters write:	
    url(r'^app/mysphere_mybuilds_for_region_snapshot/(?P<id>[^/]+)$', 'main.views.mysphere_mybuilds_for_region_snapshot'),

    #my builds for Regions and Snapshot Read:	
    url(r'^app/mysphere_mybuilds_for_region_snapshot_list/(?P<id>[^/]+)$', 'main.views.mysphere_mybuilds_for_region_snapshot_list'),

    #my builds for filters write:	
    url(r'^app/mysphere_mybuilds_for_snapshot/(?P<id>[^/]+)$', 'main.views.mysphere_mybuilds_for_snapshot'),

    #my builds for Regions and Snapshot Read:	
    url(r'^app/mysphere_mybuilds_for_snapshot_list/(?P<id>[^/]+)$', 'main.views.mysphere_mybuilds_for_region_snapshot_list'),

    #my builds for Trend Read:	
    url(r'^app/mysphere_mybuilds_for_trend/(?P<id>[^/]+)$', 'main.views.mysphere_mybuilds_for_trend'),


    url(r'^app/login_redirect/$', 'main.views.login_redirect'),
    url(r'^(?P<username>[^/]+)/$', 'main.views.scisphere_home'),
    url(r'^(?P<username>[^/]+)/profile$', 'main.views.public_profile', name='public_profile'),
    url(r'^(?P<username>[^/]+)/settings', 'main.views.profile_settings'),


    # SMS support
    url(r"^(?P<username>[^/]+)/sms_submission$", 'sms_support.views.import_submission', name='sms_submission'),
    url(r"^(?P<username>[^/]+)/sms_multiple_submissions$", 'sms_support.views.import_multiple_submissions', name='sms_submissions'),

    url(r'^(?P<username>[^/]+)/forms/(?P<id_string>[^/]+)/sms_submission$', 'sms_support.views.import_submission_for_form', name='sms_submission_form'),
    url(r'^(?P<username>[^/]+)/forms/(?P<id_string>[^/]+)/sms_multiple_submissions$', 'sms_support.views.import_multiple_submissions_for_form', name='sms_submissions_form'),

    # SMS Gateway APIs
    url(r"^(?P<username>[^/]+)/sms_submission/(?P<service>[a-z]+)/?$", 'sms_support.providers.import_submission', name='sms_submission_api'),
    url(r'^(?P<username>[^/]+)/forms/(?P<id_string>[^/]+)/sms_submission/(?P<service>[a-z]+)/?$', 'sms_support.providers.import_submission_for_form', name='sms_submission_form_api'),

    # static media
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT}),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT}),
)

