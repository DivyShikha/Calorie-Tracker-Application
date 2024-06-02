from django.urls import include, path,re_path
from bmr import views


urlpatterns=[
    re_path('',views.bmr,name='bmr'),
]