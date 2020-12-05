from django.urls import path
from . import views

app_name =""
urlpatterns = [
    # path('',views.home,name='home'),
    path('signin', views.sign_in, name='signin'),
    path('callback', views.callback, name='callback'),
    path('signout', views.sign_out, name='signout'),
]
