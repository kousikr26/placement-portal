from django.shortcuts import render
from django.views import generic
from django.urls import reverse_lazy

from .forms import *
# Create your views here.
def home(request):
    return render(request,"blog/index.html")

class CreatePost(generic.CreateView):
    form_class = PostForm
    template_name = 'blog/create_post.html'
    success_url = reverse_lazy('blog:home')
