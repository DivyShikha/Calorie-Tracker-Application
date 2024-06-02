from django.urls import include, path,re_path
from home import views


urlpatterns=[
    re_path("^$",views.home,name='home'),
    re_path('^register$',views.register,name='register'),
    re_path('^login$',views.loginuser,name='loginuser'),
    re_path('^logout$',views.userlogout,name='logout'),
]