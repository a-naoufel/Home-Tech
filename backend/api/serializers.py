
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Cart , Wishlist , Rating

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
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}

    

class CartSerializer(serializers.ModelSerializer):
    class Meta:     
        model = Cart
        fields = ["id", "user", "product", "quantity", "purchased", "created_at"]
        extra_kwargs = {"user": {"read_only": True}}


class WishlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wishlist
        fields = ['id', "user" , 'products' , 'created_at']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'product' , 'user' , 'rating']