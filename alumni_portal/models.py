from django.db import models

# Create your models here.
from django.utils import timezone
from django.contrib.auth.models import User

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


class AlumniStory(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    author = models.OneToOneField(User,on_delete = models.CASCADE)
    graduation_year = models.DateField()
    company= models.CharField(max_length=256)
    profile = models.CharField(max_length = 256)
    sector = models.CharField(max_length = 256)
    PROGRAM_CHOICES = [
        ('B.Tech', 'Bachelor of Technology'),
        ('B.Des', 'Bachelor of Design'),
        ('M.Tech', 'Master of Technology'),
        ('M.Des', 'Master of Design'),
        ('M.Sc', 'Master of Science'),
        ('Phd', 'PHD'),
        ('Others', 'Others'),
    ]
    BRANCH_CHOICES = [
    	('CSE', 'Computer Science and Engineering'),
    	('MNC', 'Mathematics and Computing'),
    	('ECE', 'Electronics and Communication Engineering'),
    	('EEE', 'Electronics and Electrical Engineering'),
    	('ME', 'Mechanical Engineering'),
    	('CE', 'Civil Engineering'),
    	('CL', 'Chemical Engineering'),
    	('EP' , 'Engineering Physics'),
    	('CST','Chemical Science and Technology'),
    	('BT','Biotechnology'),
    	('Physics','Physics'),
    	('Chemistry','Chemistry'),
    	('Mathematics','Mathematics'),
    	('Design','Design'),
    	('Others','Others'),
    ]
    program = models.CharField(max_length = 256,choices = PROGRAM_CHOICES,default = 'B.Tech')
    branch = models.CharField(max_length = 256,choices = BRANCH_CHOICES,default='CSE')
    slug = models.SlugField(max_length = 256)
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10,
                              choices=STATUS_CHOICES,
                              default='draft')

    experience = models.TextField()
    question1 = models.TextField()
    question2 = models.TextField()
    question3 = models.TextField()
