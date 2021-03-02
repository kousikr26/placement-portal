from django.urls import path
from .views import *
from django.views.generic import TemplateView
from authentication.views import *
app_name = 'home'

urlpatterns = [
    path('',home,name="home"),
    path('permission_not_granted',permission_not_granted,name="permission_not_granted"),
    path('charts/',charts,name='charts'),
    path('table/',get_table,name='table'),
    path('ajax/tableFilter',ajax_table_filter,name="table_filter"),
]
