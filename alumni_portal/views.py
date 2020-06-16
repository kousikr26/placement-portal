from django.shortcuts import render,get_object_or_404,redirect
from django.views import generic
from django.urls import reverse_lazy,reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import *
from .models import *
from django.template.loader import render_to_string
from django.http import JsonResponse
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
    def get_success_url(self):
        return reverse_lazy('alumni_portal:alumnus_profile' ,kwargs={'roll_number':self.request.user.profile.roll_number})
    def get_form_kwargs(self):
        kwargs = super(AlumnusProfileCreation, self).get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

def alumnus_profile(request,roll_number):
    profile =  get_object_or_404(AlumnusProfile,roll_number=roll_number)
    context = {
        'profile':profile
    }
    return render(request,'alumni_portal/alumnus_profile.html',context)

def save_edit_form(request, form, template_name):
    data = dict()
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True

        else:
            data['form_is_valid'] = False
    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)

def intro_edit(request,roll_number):

    profile = get_object_or_404(AlumnusProfile,roll_number=roll_number)
    if request.method == 'POST':
        form = EditIntroForm(request.POST, instance=profile)
    else:
        form =EditIntroForm(instance=profile)
    return save_edit_form(request, form, 'alumni_portal/intro_update_form.html')



def about_edit(request,roll_number):
    profile = get_object_or_404(AlumnusProfile,roll_number=roll_number)
    if request.method == 'POST':
        form = EditAboutForm(request.POST, instance=profile)
    else:
        form =EditAboutForm(instance=profile)
    return save_edit_form(request, form, 'alumni_portal/about_update_form.html')

def basic_info_edit(request,roll_number):
    profile = get_object_or_404(AlumnusProfile,roll_number=roll_number)
    if request.method == 'POST':
        form = EditBasicInfoForm(request.POST, instance=profile)
    else:
        form =EditBasicInfoForm(instance=profile)
    return save_edit_form(request, form, 'alumni_portal/basic_info_update_form.html')

def save_job_form(request, form, template_name):
    data = dict()

    profile = request.user.profile
    if request.method == 'POST':
        if form.is_valid():
            job = form.save(commit=False)
            job.alumnus_profile = profile
            job.save()
            data['form_is_valid'] = True

        else:
            data['form_is_valid'] = False
    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)

def create_job(request):
    if request.method == 'POST':
        form = JobForm(request.POST)
    else:
        form = JobForm()
    return save_job_form(request,form, 'alumni_portal/partial_job_create.html')

def edit_job(request,pk):
    job = get_object_or_404(Job,pk=pk)
    if request.method == 'POST':
        form = JobForm(request.POST,instance = job)
    else:
        form = JobForm(instance=job)
    return save_job_form(request,form, 'alumni_portal/partial_job_update.html')

def delete_job(request,pk):
    job = get_object_or_404(Job, pk=pk)
    data = dict()
    if request.method == 'POST':
        job.delete()
        data['form_is_valid'] = True

    else:
        context = {'job': job}
        data['html_form'] = render_to_string('alumni_portal/partial_job_delete.html',
            context,
            request=request,
        )
    return JsonResponse(data)
def save_education_form(request, form, template_name):
    data = dict()

    profile = request.user.profile
    if request.method == 'POST':
        if form.is_valid():
            education= form.save(commit=False)
            education.alumnus_profile = profile
            education.save()
            data['form_is_valid'] = True

        else:
            data['form_is_valid'] = False
    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)

def create_education(request):
    if request.method == 'POST':
        form = EducationForm(request.POST)
    else:
        form = EducationForm()
    return save_education_form(request,form, 'alumni_portal/partial_education_create.html')

def edit_education(request,pk):
    education = get_object_or_404(Education,pk=pk)
    if request.method == 'POST':
        form = EducationForm(request.POST,instance = education)
    else:
        form = EducationForm(instance=education)
    return save_education_form(request,form, 'alumni_portal/partial_education_update.html')

def delete_education(request,pk):
    education = get_object_or_404(Education, pk=pk)
    data = dict()
    if request.method == 'POST':
        education.delete()
        data['form_is_valid'] = True

    else:
        context = {'education': education}
        data['html_form'] = render_to_string('alumni_portal/partial_education_delete.html',
            context,
            request=request,
        )
    return JsonResponse(data)
