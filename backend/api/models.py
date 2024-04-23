from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=500)
    #autres champs a ajouter

    def __str__(self):
        return self.name 
    

class Brand(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=500)
    #autres champs a ajouter

    def __str__(self):
        return self.name 

    
class Product(models.Model):
    name = models.CharField(max_length=255, default='General')
    price = models.FloatField(default=0.0)
    newprice = models.FloatField(default=0.0)
    discount = models.IntegerField(default=0)
    description = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    instock = models.IntegerField(null=False,default =1)  
    instock = models.IntegerField(null=False,default =1)
    image = models.ImageField(default='products/default.png',upload_to='products/')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=True)


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
    

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE  , related_name='wishlist')
    products = models.ManyToManyField(Product, related_name='wishlists')
    created_at = models.DateTimeField(auto_now_add=True, null=True)


    def __str__(self):
        return f"Wishlist for {self.user.username}"
    

class Rating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()


    class Meta:
        unique_together = (('product', 'user'),) 

    def __str__(self):
        return f"{self.user.username} rating for {self.product.name}"
    


