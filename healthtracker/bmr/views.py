from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required(login_url="/login")
def bmr(request):
    return render(request, 'Bmr/bmr.html')

