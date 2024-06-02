from django.shortcuts import render
from tracker.models import food
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
def home(request):
    foods = food.objects.all()
    return render(request, 'Home/home.html',{"foods":foods})

def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        try:
            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()
            return HttpResponseRedirect("/bmr")
        except :
            return render(request, 'Home/register.html',{"error":"Something Wrong"})
    return render(request, 'Home/register.html')

def loginuser(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request,user)
            return HttpResponseRedirect("/bmr")
        else:
            return render(request, 'Home/login.html',{"error":"Invalid Credentials"})
    return render(request, 'Home/login.html')

def userlogout(request):
    logout(request)
    return HttpResponseRedirect('/')