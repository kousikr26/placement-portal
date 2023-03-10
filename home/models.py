from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator


# BRANCH_CHOICES = [
# 	('CSE', 'Computer Science and Engineering'),
# 	('MNC', 'Mathematics and Computing'),
# 	('ECE', 'Electronics and Communication Engineering'),
# 	('EEE', 'Electronics and Electrical Engineering'),
# 	('ME', 'Mechanical Engineering'),
# 	('CE', 'Civil Engineering'),
# 	('CL', 'Chemical Engineering'),
# 	('EP' , 'Engineering Physics'),
# 	('CST','Chemical Science and Technology'),
# 	('BT','Biotechnology'),
# 	('Physics','Physics'),
# 	('Chemistry','Chemistry'),
# 	('Mathematics','Mathematics'),
# 	('Design','Design'),
# 	('Others','Others'),
# ]

class Branch(models.Model):
	branchName = models.CharField(max_length=50,blank=False,null=True,unique=True)
	num = models.IntegerField(default=0,validators=[MinValueValidator(0)])
	mnum = models.IntegerField(default=0,validators=[MinValueValidator(0)])
	tnum = models.IntegerField(default=0,validators=[MinValueValidator(0)])
	tmnum = models.IntegerField(default=0,validators=[MinValueValidator(0)])
	per = models.DecimalField(max_digits=5,decimal_places=2, default=0.00)
	mper = models.DecimalField(max_digits=5,decimal_places=2, default=0.00)
	def __str__(self):
		return self.branchName



class Student(models.Model):
	name = models.CharField(max_length=200)
	roll=models.CharField(max_length=50, unique= True)

	PROGRAM_CHOICES = [
        ('B.Tech', 'Bachelor of Technology'),
        ('B.Des', 'Bachelor of Design'),
        ('M.Tech', 'Master of Technology'),
        ('M.Des', 'Master of Design'),
        ('M.Sc', 'Master of Science'),
        ('Phd', 'PHD'),
        ('Others', 'Others'),
    ]
	
	programs = models.CharField(
		max_length=20,
        choices=PROGRAM_CHOICES,
        default='B.Tech',
	)
	year_placed_enum = [
		('2023' , '2023'),
		('2022' , '2022'),
	]
	year_placed = models.CharField(
		max_length=4,
        choices=year_placed_enum,
		default='',
	)
	branch = models.ForeignKey(Branch,on_delete=models.CASCADE)
	day=models.IntegerField(validators=[MaxValueValidator(10),MinValueValidator(0)],default=0, blank=True,null=True)
	company = models.CharField(max_length=100, blank=True)
	placed = models.BooleanField(default=False)
	sector = models.CharField(max_length=100, blank=True)
	profile = models.CharField(max_length=100, blank=True)
	SLOT_CHOICES = [
        ('S1', 'Slot 1'),
        ('S2', 'Slot 2'),
        ('S3', 'Slot 3'),
    ]

	slot = models.CharField(max_length=20,blank=True,null=True)

	def __str__(self):
		return self.name


class Day(models.Model):
	dayNum=models.IntegerField(validators=[MinValueValidator(0)],default=0)
	num = models.IntegerField(default=0,validators=[MinValueValidator(0)])
	mnum = models.IntegerField(default=0,validators=[MinValueValidator(0)])
	branch=models.ForeignKey(Branch,on_delete=models.CASCADE)

	def __str__(self):
		return f'{self.dayNum}-{self.branch.branchName}'

class DayTotal(models.Model):

	dayNum=models.IntegerField(validators=[MinValueValidator(0)],default=0)
	num = models.IntegerField(default=0,validators=[MinValueValidator(0)])
	mnum = models.IntegerField(default=0,validators=[MinValueValidator(0)])

	def __str__(self):
		return f'{self.dayNum}-Total'
