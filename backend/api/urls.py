from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.ProductList.as_view(), name="product-list"),
    path("products/<int:pk>/delete/", views.ProductDelete.as_view(), name="product-delete"),
    path("product/<int:id>/", views.ProductDetail.as_view(), name="product-detail"),
    path("products/<int:pk>/update/", views.ProductUpdate.as_view(), name="product-update"),
    path("Cart/", views.CartList.as_view(), name="cart-list"),
    path("Cart/<int:pk>/delete/", views.CartDelete.as_view(), name="cart-delete"),
    path("Wishlist/", views.WishlistCreate.as_view(), name="Wishlist-creat"),
    path("Wishlist/<int:pk>/delete/", views.WishlistDelete.as_view(), name="Wishlist-delete"),
    path('rate/', views.RateProduct.as_view(), name='rate_product'),
    path('products/category/<str:category_name>/', views.ProductCategory.as_view(), name='product-category'),
    path('products/brand/<str:brand_name>/', views.ProductBrand.as_view(), name='product-brand'),
    path("admin/products/", views.AdminProductList.as_view(),name = "admin Products"),
]
