from django.db import models
import string
import random

def generte_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase,k=length))
        if Product.objects.filter(code=code).count() == 0:
            break

    return code


class Product(models.Model):
    code = models.CharField(max_length=8 ,default="",unique=True)
   
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)    
    description = models.TextField()
    instock = models.IntegerField(null=False,default =1)  
    image = models.ImageField(upload_to='products/', null=True, blank=True) 

    def __str__(self):

        return self.name +' '+ self.description 
    

