from django.contrib import admin
from .models import *

class PersonAdmin(admin.ModelAdmin):
    list_filter = ('branch', 'year_placed', 'programs')

admin.site.register(Student, PersonAdmin)
admin.site.register(Branch)
admin.site.register(Day)
admin.site.register(DayTotal)


