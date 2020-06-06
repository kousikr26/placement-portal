from django.forms import ModelForm
from django.db import transaction
from django.template.defaultfilters import slugify
from .models import *
class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = ['title','body','status']
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop("request")
        super(PostForm, self).__init__(*args, **kwargs)


    @transaction.atomic
    def save(self):
        post = super().save(commit=False)
        post.slug = slugify(post.title)
        post.author =self.request.user
        post.save()
        # student.room_no = (self.cleaned_data.get('room_no'))
        return post
