from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import *

app_name = "alumni_portal"
urlpatterns = [
    path('',home, name='home'),
    path('new',CreatePost.as_view(),name="create_post"),
    path('post/<str:slug>',PostDetailView.as_view(),name='post_detail')
]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
    urlpatterns+=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
