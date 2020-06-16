from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import *

app_name = "alumni_portal"
urlpatterns = [
    path('',home, name='home'),
    path('new',CreatePost.as_view(),name="create_post"),
    path('post/<str:slug>',post_detail,name='post_detail'),
    path('myposts',UserPostsView.as_view(),name = "user_posts"),
    path('post/<str:slug>/delete_post',DeletePost.as_view(),name = "delete_post"),
    path('post/<str:slug>/update_post',UpdatePost.as_view(),name = "update_post"),
    path('create_alumnus_profile',AlumnusProfileCreation.as_view(),name = 'create_alumnus_profile'),
    path('profile/<int:roll_number>',alumnus_profile,name='alumnus_profile'),
    path('profile/<int:roll_number>/edit_intro',intro_edit,name='intro_edit'),
    path('profile/<int:roll_number>/edit_about',about_edit,name='about_edit'),
    path('profile/<int:roll_number>/edit_basic_info',basic_info_edit,name='basic_info_edit'),
    path('job/create_job',create_job,name='create_job'),
    path('job/<int:pk>/edit_job',edit_job,name = 'edit_job'),
    path('job/<int:pk>/delete_job',delete_job,name = 'delete_job'),
    path('education/create_education',create_education,name='create_education'),
    path('education/<int:pk>/edit_education',edit_education,name = 'edit_education'),
    path('education/<int:pk>/delete_education',delete_education,name = 'delete_education'),
    ]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
    urlpatterns+=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
