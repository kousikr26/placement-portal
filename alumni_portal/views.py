from django.shortcuts import render,get_object_or_404,redirect
from django.views import generic
from django.urls import reverse_lazy,reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import *
from .models import *
# Create your views here.
def home(request):
    # only published posts will be shown
    posts = Post.objects.all().filter(status='published');
    context = {'posts':posts}
    return render(request,"alumni_portal/index.html",context)
    return render(request,"alumni_portal/index.html")



class CreatePost(generic.CreateView):
    form_class = PostForm
    template_name = 'alumni_portal/create_post.html'
    success_url = reverse_lazy('alumni_portal:home')

    def get_form_kwargs(self):
        kwargs = super(CreatePost, self).get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

# class PostDetailView(generic.DetailView):
#     model = Post
#     success_url = reverse_lazy('alumni_portal:home')

def post_detail(request, slug):
    template_name = 'alumni_portal/post_detail.html'
    post = get_object_or_404(Post, slug=slug)
    comments = post.comments.all()
    new_comment = None
    # Comment posted
    if request.method == 'POST':
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():

            # Create Comment object but don't save to database yet
            new_comment = comment_form.save(commit=False)
            new_comment.author = request.user
            # Assign the current post to the comment
            new_comment.post = post
            # Save the comment to the database
            new_comment.save()
            return redirect(reverse('alumni_portal:post_detail' ,kwargs={'slug':slug}))
    else:
        comment_form = CommentForm()

    return render(request, template_name, {'post': post,
                                           'comments': comments,
                                           'new_comment': new_comment,
                                           'comment_form': comment_form})
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

    def get_form_kwargs(self):
        kwargs = super(UpdatePost, self).get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

class DeletePost(LoginRequiredMixin,generic.DeleteView):
    model = Post
    success_url = reverse_lazy('alumni_portal:user_posts')

class AlumnusProfileCreation(generic.CreateView):
    form_class = AlumnusProfileForm
    template_name = 'alumni_portal/create_alumnus_profile.html'
    success_url = reverse_lazy('alumni_portal:home')
