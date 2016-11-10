from django.conf.urls import url
from django.utils import timezone
from django.views.decorators.http import last_modified
from django.views.i18n import JavaScriptCatalog, JSONCatalog

from . import views


last_modified_date = timezone.now()

packages = ['website.news']


def cache(view):
    return last_modified(lambda req, **kw: last_modified_date)(view)


urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^i18n/$', cache(JavaScriptCatalog.as_view(packages=packages)), name='javascript-catalog'),
    url(r'^i18n/json/$', cache(JSONCatalog.as_view(packages=packages)), name='json-catalog'),
]
