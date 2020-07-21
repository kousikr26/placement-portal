from django import forms
from home.models import Student
from .models import *
class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = '__all__'
        widgets = {
            'placed': forms.CheckboxInput(attrs={'class':'onoffswitch','id': 'myonoffswitch'}),
        }
class FileUploadForm(forms.ModelForm):
    class Meta:
        model = File
        fields = '__all__'
        widgets = {
            # 'file': forms.ClearableFileInput(attrs={'multiple': True}),
        }
