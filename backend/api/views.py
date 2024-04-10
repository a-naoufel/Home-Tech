from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, ProductSerializer
from .models import Product
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    permission_classes = [AllowAny]
# 
class MyProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Product.objects.filter(author=self.request.user)
    
class ProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        return Product.objects.all()
    

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
class ProductDelete(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Product.objects.filter(author=self.request.user)

class ProductUpdate(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Product.objects.filter(author=self.request.user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class ProductDetail(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    queryset = Product.objects.all
    
    
class MyProductDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Product.objects.filter(author=self.request.user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

@api_view(['GET'])
def product_detail(request , id, format=None):
    try:
        product = Product.objects.get(pk=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)