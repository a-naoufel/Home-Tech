from django.shortcuts import render , redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login , logout
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm



def home(request):
    return render(request, 'base/home.html')


def signup(request):

    Page = 'sign up'
    if request.user.is_authenticated:  # that mean that if i loged in yet , so i couldn't accesss to the log in page because i already registre   (http://127.0.0.1:8000/login/)
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')
        
        # Attempt to authenticate the user
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # If authentication successful, log the user in
            login(request, user)
            return redirect('home')
        else:
            # If authentication fails, display an error message
            messages.error(request, "Invalid username or password")
    
    # If request method is not POST or authentication fails, render the login form
            
    context ={'Page':Page }
    return render(request, 'base/signup.html' , context)


def logoutPage(request):
    logout(request)
    return redirect('home')



def registeruser(request):
    form = UserCreationForm()
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Error occurred while processing the form')
    return render(request, 'base/signup.html', {'form': form})