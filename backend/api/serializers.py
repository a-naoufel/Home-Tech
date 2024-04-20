from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Cart

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price", "description","image","newprice","disconte" , "created_at", "author","category","rating","brand","label","instock"]
        extra_kwargs = {"author": {"read_only": True}}

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["id", "user", "product", "quantity", "purchased", "created_at"]
        #extra_kwargs = {"user": {"read_only": True}, "created_at": {"read_only": True}, "purchased": {"read_only": True}}