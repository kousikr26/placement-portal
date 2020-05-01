from django import forms
from home.models import Student

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = '__all__'
        widgets = {
            'placed': forms.CheckboxInput(attrs={'class':'onoffswitch','id': 'myonoffswitch'}),
        }
