from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField(default=0.0)
    newprice = models.FloatField(default=0.0)
    disconte = models.IntegerField(default=0)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    instock = models.IntegerField(null=False,default =1)  
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    category = models.CharField(max_length=255, default='General')
    rating = models.FloatField(default=0)
    brand = models.CharField(max_length=255, default='General')
    label = models.CharField(max_length=255, default='New')
    favoted = models.ManyToManyField(User, related_name='favoted', blank=True , default=None)

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

