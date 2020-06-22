from django.urls import path
from . import views
from django.views.generic import TemplateView

app_name = 'home'

urlpatterns = [
    path('',views.index,name='home'),
    path('table',views.get_table,name='table'),
    path('ajax/tableFilter',views.ajax_table_filter,name="table_filter"),
]
