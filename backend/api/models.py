from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    instock = models.IntegerField(null=False,default =1)  
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    category = models.CharField(max_length=255, default='General')
    rating = models.FloatField(default=0)
    brand = models.CharField(max_length=255, default='')
    label = models.CharField(max_length=255, default='New')


    def __str__(self):

        return self.name 
# Create your models here.
