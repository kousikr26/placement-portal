from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import redirect
from django.contrib import messages
from django.urls import reverse
from .graph_helper import get_user
from .auth_helper import get_sign_in_url, get_token_from_code,get_token
from django.contrib.auth.models import User
# from .models import User
from django.contrib.auth import authenticate, login, logout
import re

User._meta.get_field('email')._unique = True
User._meta.get_field('username')._unique = False

def initialize_context(request):
  context = {}

  # Check for any errors in the session
  error = request.session.pop('flash_error', None)

  if error != None:
    context['errors'] = []
    context['errors'].append(error)

  # Check for user in the session
  context['user'] = request.session.get('user', {'is_authenticated': False})
  return context


def sign_in(request):
  # Get the sign-in URL
  sign_in_url, state = get_sign_in_url()
  # Save the expected state so we can validate in the callback
  request.session['auth_state'] = state
  # print(sign_in_url,state)
  # Redirect to the Azure sign-in page
  return HttpResponseRedirect(sign_in_url)
def callback(request):
  # Get the state saved in session
  expected_state = request.session.pop('auth_state', '')
  # Make the token request
  # print("#######################################3\n",request.get_full_path())
  token = get_token_from_code('https://localhost:8000/'+request.get_full_path(), expected_state)
  # Get the user's profile
  user = get_user(token)

  # Get user info
  username = user['displayName'].replace(" ","_")
  username = re.sub('[^0-9a-zA-Z_]+','',username)
  password = user['surname']
  email = user['mail']
  # print(bg-primary,password,email)

  try:
      user = User.objects.get(email=email)
  except User.DoesNotExist:
      user = User.objects.create_user(username,email,password)
      user.save()
  user = authenticate(username=username,password=password)
  if user is not None:
      login(request,user)
      messages.success(request,"Success: You were successfully logged in.")
      return redirect('home:home')
  return redirect('home:home')

def sign_out(request):
  # Clear out the user and token
  logout(request)
  messages.success(request, "Successfully Logged Out")

  return redirect('home:home')
