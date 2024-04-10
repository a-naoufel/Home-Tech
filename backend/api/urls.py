from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.ProductList.as_view(), name="product-list"),
    path("products/<int:pk>/delete/", views.ProductDelete.as_view(), name="product-delete"),
    path("product/<int:id>/", views.product_detail),
    path("<int:id>/product/", views.ProductDetail.as_view()),
]
