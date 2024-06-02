from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
# Create your models here.

class food(models.Model):
    name = models.CharField(max_length=25)
    description = models.CharField(max_length=150)
    protein = models.FloatField()
    carbs = models.FloatField()
    fat = models.FloatField()
    calorie = models.FloatField(default=0)
    def __str__(self):
        return self.name
    
class calorieTracker(models.Model):
    date = models.DateField(default=datetime.now)
    protein = models.FloatField()
    carbs = models.FloatField()
    fat = models.FloatField()
    calorie = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    