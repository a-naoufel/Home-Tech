from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static



from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('api.url.product_urls')),
    path('api/users/', include('api.url.user_urls')),
    path('api/orders/', include('api.url.order_urls')),
]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
