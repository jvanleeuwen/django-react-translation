from django.conf.urls import include, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

urlpatterns = i18n_patterns(
    url(r'^', include('website.home.urls', namespace='home')),
    url(_(r'^news/'), include('website.news.urls', namespace='news')),
)
