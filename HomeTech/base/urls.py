from django.urls import path
from . import views  # Import views from the same directory

urlpatterns = [
    path('', views.home, name="home"),
    path('sign up/', views.signup, name="sign up"),
    path('register/' ,views.registeruser , name = "register"),\
    path('logout/' ,views.logoutPage , name = "logout"),
]