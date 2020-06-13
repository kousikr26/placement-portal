from django.db import models

# Create your models here.
from django.utils import timezone
from django.contrib.auth.models import User
from .choices import *
class Post(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250,
                            unique_for_date='publish')
    author = models.ForeignKey(User,
                               related_name='blog_posts',on_delete=models.CASCADE)
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,
                              choices=STATUS_CHOICES,
                              default='draft')

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post,related_name = 'comments',on_delete = models.CASCADE)
    author = models.CharField(max_length=200)
    text = models.TextField()
    create_date = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.text

class AlumnusProfile(models.Model):
    # Personal
    profile_picture = models.ImageField(blank=True, null=True, upload_to='Images')
    roll_number = models.IntegerField(unique=True, primary_key=True)
    first_name = models.CharField(max_length=50, null=True)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    date_of_birth = models.DateField(max_length=20, null=True)
    personal_email = models.CharField(max_length=50, null=True)
    iitg_email= models.CharField(max_length=50, null=True)
    mobile = models.CharField(max_length=15, null=True)
    alternate_mobile = models.CharField(max_length=15, blank=True, null=True)
    year_of_graduation = models.IntegerField(blank=True, null=True)

    # Institute related
    program = models.CharField(max_length=10, choices=PROGRAM_CHOICES, blank=True, null=True)
    branch = models.CharField(max_length=25, choices=BRANCH_CHOICES, blank=True, null=True)

    # Address
    current_address = models.CharField(max_length=200, null=True)
    current_city = models.CharField(max_length=50, null=True)
    current_country = models.CharField(max_length=25, blank=True, null=True)

    # Communication
    google_link = models.URLField(max_length=200, blank=True, null=True)
    facebook_link = models.URLField(max_length=200, blank=True, null=True)
    twitter_link = models.URLField(max_length=200, blank=True, null=True)
    github_link = models.URLField(max_length=200, blank=True, null=True)

    # Professional
    linkedin_link = models.CharField(max_length=250, blank=True, null=True)
    current_position = models.CharField(max_length=150, choices=OCCUPATIONS, null=True)
    past_position_1 = models.CharField(max_length=150, blank=True, null=True)
    past_position_2 = models.CharField(max_length=150, blank=True, null=True)
    startup_link = models.CharField(max_length=400, blank=True, null=True)
    position = models.TextField(null=True)
    position_1 = models.CharField(max_length=30, blank=True, null=True)
    position_2 = models.CharField(max_length=30, blank=True, null=True)
    city_1 = models.CharField(max_length=50, null=True)
    city_2 = models.CharField(max_length=50, blank=True, null=True)
    city_3 = models.CharField(max_length=50, blank=True, null=True)
    company = models.CharField(max_length=100, null=True)
    company_1 = models.CharField(max_length=100, blank=True, null=True)
    company_2 = models.CharField(max_length=100, blank=True, null=True)


    your_interests = models.TextField(blank=True, null=True)
    about_you = models.TextField(blank=True, null=True)
    your_message = models.TextField(blank=True, null=True)


class Education(models.Model):
    """Degree of an alumnus other than the primary"""
    alumnus_profile = models.ForeignKey(AlumnusProfile,related_name='degrees',on_delete = models.CASCADE)
    degree = models.CharField(max_length=40, choices=PROGRAM_CHOICES)
    institute = models.CharField(max_length=100)
    start_year = models.IntegerField(null=True)
    pass_out_year = models.IntegerField(null=True)
    department = models.CharField(max_length=50, null=True)
    specialization = models.CharField(max_length=50, blank=True, null=True)



class Job(models.Model):
    """Past job of an alumnus"""
    alumnus_profile = models.ForeignKey(AlumnusProfile,related_name='jobs',on_delete = models.CASCADE)
    company = models.CharField(max_length=50, null=True)
    position = models.CharField(max_length=50, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    description = models.CharField(max_length=50, blank=True, null=True)
    occupation = models.CharField(max_length=50, null=True, choices=OCCUPATIONS)
    city = models.CharField(max_length=50, null=True)
