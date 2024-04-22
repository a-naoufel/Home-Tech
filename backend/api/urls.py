from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.ProductList.as_view(), name="product-list"),
    path("products/<int:pk>/delete/", views.ProductDelete.as_view(), name="product-delete"),
    path("product/<int:id>/", views.ProductDetail.as_view(), name="product-detail"),
    path("products/<int:pk>/update/", views.ProductUpdate.as_view(), name="product-update"),
    path("Cart/", views.CartList.as_view(), name="cart-list"),
    path("Cart/<int:pk>/delete/", views.CartDelete.as_view(), name="cart-delete"),
    path("admin/products/", views.AdminProductList.as_view(),name = "admin Products"),
]
