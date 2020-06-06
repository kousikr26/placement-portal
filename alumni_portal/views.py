from django.shortcuts import render
from django.views import generic
from django.urls import reverse_lazy

from .forms import *
from .models import *
# Create your views here.
def home(request):
    # only published posts will be shown
    posts = Post.objects.all().filter(status='published');
    # # truncatewords
    # for i in range(len(posts)):
    #     l = len(posts[i].body)
    #     l = min(l,300)
    #     posts[i].body = posts[i].body[:l]
    context = {'posts':posts}
    return render(request,"alumni_portal/index.html",context)

class CreatePost(generic.CreateView):
    form_class = PostForm
    template_name = 'alumni_portal/create_post.html'
    success_url = reverse_lazy('alumni_portal:home')

class PostDetailView(generic.DetailView):
    model = Post
