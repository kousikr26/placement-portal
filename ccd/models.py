from django.db import models
from django.contrib.auth.models import User

# these imports are for signals
from django.db.models.signals import post_save
from django.dispatch import receiver
import os

from django.utils.text import slugify
import binascii

# When the user uploads the file, generate a hard to guess path for it as anyone can access this file using its url
def get_upload_path(instance, filename):
    path = os.path.join('admin-files',binascii.hexlify(os.urandom(32)).decode(), slugify(instance.name))
    print(path)
    return path

class File(models.Model):
    name = models.CharField(max_length=264)
    file = models.FileField(upload_to=get_upload_path)
    info = models.CharField(max_length=264)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name


################################################################################
# this should be in a signals.py file but I'm doing it here for simplicity


# as we are using custom path to make it hard to guess, each file is in a new
# directory. Whenever a file will be deleted, we need to delete the directory
# of the file as well.


# functions to delete file from the server when file object is deleted
@receiver(models.signals.post_delete, sender=File)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `File` object is deleted.
    """
    if instance.file:
        if os.path.isfile(instance.file.path):
            path = instance.file.path
            # remove the file
            os.remove(path)
            while path[len(path)-1]!='/':
                path = path[:-1]
            # now remove the directory
            os.rmdir(path)


@receiver(models.signals.pre_save, sender=File)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `File` object is updated
    with new file.

    """
    if not instance.pk:
        return False
    try:
        old_file = File.objects.get(pk=instance.pk).file
    except File.DoesNotExist:
        return False

    new_file = instance.file
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            path = old_file.path
            # remove the file
            os.remove(path)
            # now remove the directory
            while path[len(path)-1]!='/':
                path = path[:-1]
            os.rmdir(path)
