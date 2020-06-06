from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import *

app_name = "alumni_portal"
urlpatterns = [
    path('',home, name='home'),
    path('new',CreatePost.as_view(),name="create_post"),
    path('post/<str:slug>',PostDetailView.as_view(),name='post_detail')
    path('myposts',UserPostsView.as_view(),name = "user_posts"),
    path('<int:pk>/delete_post',DeletePost.as_view(),name = "delete_post"),
    path('<int:pk>/update_post',UpdatePost.as_view(),name = "update_post"),
]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
    urlpatterns+=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
