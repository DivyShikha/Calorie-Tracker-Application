from django.urls import include, path,re_path
from tdee import views


urlpatterns=[
    re_path('',views.tdee,name='tdee'),
]