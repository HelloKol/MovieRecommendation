from xml.etree.ElementInclude import include
from django.contrib import admin
from django.urls import path, re_path, include
from backendApp import views
from django.conf.urls import url
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("backendApp.urls")),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
