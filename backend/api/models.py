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

    def __str__(self):

        return self.name +' '+ self.description 
# Create your models here.
