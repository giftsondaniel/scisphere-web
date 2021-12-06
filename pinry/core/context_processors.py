from django.conf import settings


def template_settings(request):
    return {
        'API_LIMIT_PER_PAGE': settings.API_LIMIT_PER_PAGE,
    }

#Added to  clear the cache on the client browser side:
def settings_context_processor(request):
    return {
        'JS_MD5_REGION': settings.JS_MD5_REGION,
        'JS_MD5_FILTER': settings.JS_MD5_FILTER,
        'JS_MD5_SNAPSHOT': settings.JS_MD5_SNAPSHOT,
        'JS_MD5_COMMON': settings.JS_MD5_COMMON,
    }

