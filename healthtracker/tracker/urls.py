from django.urls import include, path,re_path
from tracker import views


urlpatterns=[
    re_path('^$',views.profile,name='profile'),
    re_path('^saveCalorie$',views.saveCalorie),
]