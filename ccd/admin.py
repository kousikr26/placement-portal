from django.contrib import admin
from .models import *
# Register your models here.
# admin.site.register(File)
@admin.register(File)
class Admin(admin.ModelAdmin):
    list_display = ('name','info','file','updated_at','created_at')
    search_fields = ('name','info',)
    ordering = ('updated_at',)
