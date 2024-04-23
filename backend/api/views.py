from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, ProductSerializer, CartSerializer  , WishlistSerializer , RatingSerializer
from .models import Product, Cart , Wishlist , Rating , Category , Brand

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
    serializer_class = CartSerializer
    permission_classes = [AllowAny]
    queryset = Product.objects.all




class ProductCategory(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        category_name = self.kwargs.get('category_name')                # Get the category name from the URL parameter
        category = Category.objects.filter(name=category_name).first()  # Retrieve the Category object based on the name

        if category:                                                    # If the category exists, filter products by that category
            return Product.objects.filter(Category=category)
        else:                                                           # If the category doesn't exist, return an empty queryset
            return Product.objects.none()
        

class ProductBrand(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        brand_name = self.kwargs.get('brand_name')                
        brand = Brand.objects.filter(name=brand_name).first()  

        if brand:                                                    
            return Product.objects.filter(brand=brand)
        else:                                                           
            return Product.objects.none()
        

    
    


class CartList(generics.ListCreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Cart.objects.all()

    def perform_create(self, serializer):
        product = serializer.validated_data.get('product')
        user = self.request.user
        if serializer.is_valid():
            if not Cart.objects.filter(product=product, user=user).exists():
                serializer.save(user=user)
            else:
                raise serializer.ValidationError("This product is already in the cart.")
        else:
            print(serializer.errors)
            
class CartDelete(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
    
class CartUpdate(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)


class WishlistCreate(generics.ListCreateAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        return Wishlist.objects.all()

    def perform_create(self, serializer):
        products = serializer.validated_data.get('product')
        user = self.request.user
        if serializer.is_valid():
            if not Wishlist.objects.filter(products=products , user=user).exists():
                serializer.save(user=user)
            else:
                raise serializer.ValidationError("This product is already in the cart.")
        else:
            print(serializer.errors)


class WishlistDelete(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)
    
class WishlistUpdate(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class RateProduct(generics.CreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Rating.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class CartQuantityUpdate(generics.UpdateAPIView):
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        instance = self.get_object()
        product_id = serializer.validated_data.get('product').id
        
        # Check if the product is already in the cart
        existing_cart_item = Cart.objects.filter(user=self.request.user, product_id=product_id).first()

        if existing_cart_item:
            # If the same product is already in the cart, update its quantity
            existing_cart_item.quantity += 1
            existing_cart_item.save()
        else:
            # If the product is not in the cart, perform the default update logic
            if serializer.is_valid():
                serializer.save(quantity=instance.quantity + 1)
            else:
                print(serializer.errors)



