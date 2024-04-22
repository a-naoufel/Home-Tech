from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=255, default='General')
    price = models.FloatField(default=0.0)
    newprice = models.FloatField(default=0.0)
    discount = models.IntegerField(default=0)
    description = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    instock = models.IntegerField(null=False,default =1)
    image = models.ImageField(default='products/default.png',upload_to='products/')
    category = models.CharField(max_length=255, default='General')
    rating = models.FloatField(default=0)
    brand = models.CharField(max_length=255, default='General')


    def __str__(self):
        return self.name 
    
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    purchased = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

