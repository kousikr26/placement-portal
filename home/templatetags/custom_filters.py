from django import template
from django.template.defaultfilters import stringfilter
from django.contrib.auth.models import User
register = template.Library()

# custom filter
@register.filter
@stringfilter
def replace_underscores(string):
    return string.replace('_', ' ')
@register.filter
def is_ccd_member(email):
    # print(email)
    try:
        user = User.objects.get(email=email)
    except Exception as e:
        print(e)
        return False

    return user.groups.filter(name = "placement team").exists()
