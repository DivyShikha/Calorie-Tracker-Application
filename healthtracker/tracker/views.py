from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import calorieTracker
import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime
# Create your views here.
@login_required(login_url="/login")
def profile(request):
    value = calorieTracker.objects.filter(user=request.user.id)
    print(value)
    return render(request, 'tracker/track.html',{"value":value})


@login_required(login_url="/login")
@csrf_exempt   
def saveCalorie(request):
    if request.method == 'POST':
        user_id = request.user.id
        today =datetime.now()
        calorieTracker.objects.filter(user_id=user_id).exclude(date=today).delete()
        json_data = json.loads(request.body)
        p = json_data["protein"]
        carbs = json_data["carbs"]
        fat = json_data["fat"]
        cal = json_data["calorie"]
        tracker = calorieTracker(
        protein=p,
        carbs=carbs,
        fat=fat,
        calorie=cal,
        user=request.user
        )
        tracker.save()
        response_data = {'message': 'JSON data processed successfully'}
        return JsonResponse(response_data)
