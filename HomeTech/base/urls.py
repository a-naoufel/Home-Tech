from django.urls import path , include
from . import views  # Import views from the same directory



urlpatterns = [
    path('', views.home, name="home"),
    path('sign in/', views.signin, name="sign in"),
    path('register/' ,views.registeruser , name = "register"),\
    path('logout/' ,views.logoutPage , name = "logout"),
   

]
