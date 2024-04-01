from django.urls import path
from . import views  # Import views from the same directory

urlpatterns = [
    path("product/",views.product_list),
    path("",views.product_list),
    path("product/<int:id>/",views.product_detail),
]