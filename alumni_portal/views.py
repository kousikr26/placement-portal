from django.shortcuts import render
from django.views import generic
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
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
    return render(request,"alumni_portal/index.html")
class CreatePost(generic.CreateView):
    form_class = PostForm
    template_name = 'alumni_portal/create_post.html'
    success_url = reverse_lazy('alumni_portal:home')

class CreateAlumniStory(generic.CreateView):
    form_class = AlumniStoryForm
    template_name = 'alumni_portal/create_story.html'
    success_url = reverse_lazy('alumni_portal:home')

class PostDetailView(generic.DetailView):
    model = Post
    success_url = reverse_lazy('alumni_portal:home')

class UserPostsView(LoginRequiredMixin,generic.ListView):
    def get_queryset(self):
        return Post.objects.filter(author = self.request.user)
    context_object_name = 'posts'
    template_name = 'alumni_portal/post_list.html'

class UpdatePost(LoginRequiredMixin,generic.UpdateView):
    form_class = PostForm
    model = Post
    template_name = 'alumni_portal/create_post.html'
    success_url = reverse_lazy('alumni_portal:user_posts')

class DeletePost(LoginRequiredMixin,generic.DeleteView):
    model = Post
    success_url = reverse_lazy('alumni_portal:user_posts')
