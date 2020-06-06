from django.forms import ModelForm

from .models import *
class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = '__all__'
class AlumniStoryForm(ModelForm):
    class Meta:
        model = AlumniStory
        fields = '__all__'
