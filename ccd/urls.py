from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import *

app_name = "ccd"
urlpatterns = [
    path('',home, name='home'),
    path('student/create/',student_create, name='student_create'),
    path('student/<str:pk>/update/', student_update, name='student_update'),
    path('student/<str:pk>/delete/', student_delete, name='student_delete'),
    # path('ajax/sort/',ajax_sort,name='ajax_sort'),
    path('ajax/get/branches/',ajax_get_branch_options),
    path('ajax/filter/',ajax_filter),
    path('ajax/update-database',ajax_update_database),
    path('ajax/upload-file',ajax_upload_file,name="upload-file"),
    path('files',ajax_get_file_list,name="files"),
    path('file/<str:pk>/delete',ajax_delete_file,name="delete-file"),
]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
    urlpatterns+=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
