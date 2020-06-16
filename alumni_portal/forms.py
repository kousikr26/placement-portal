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

class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['text']


class AlumnusProfileForm(ModelForm):
    class Meta:
        model = AlumnusProfile
        fields = [
        'personal_email',
        'iitg_email',
        'roll_number',
        'first_name',
        'middle_name',
        'last_name',
        'year_of_graduation',
        'program',
        'branch',
        'date_of_birth',
        'current_country',
        'current_city',
        ]
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request')
        super(AlumnusProfileForm, self).__init__(*args, **kwargs)

    def save(self):
        profile = super().save(commit = False)
        profile.user = self.request.user
        profile.save()
        

class EditIntroForm(ModelForm):
    class Meta:
        model = AlumnusProfile
        fields = ['first_name','last_name','headline']

class EditAboutForm(ModelForm):
    class Meta:
        model = AlumnusProfile
        fields =['about_me']

class EditBasicInfoForm(ModelForm):
    class Meta:
        model = AlumnusProfile
        fields = ['current_city','current_country','personal_email','website_link']

class JobForm(ModelForm):
    class Meta:
        model = Job
        exclude = ['alumnus_profile']

class EducationForm(ModelForm):
    class Meta:
        model = Education
        exclude = ['alumnus_profile']
