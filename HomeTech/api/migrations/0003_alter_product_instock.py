# Generated by Django 5.0.2 on 2024-04-01 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_product_code_product_instock"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="instock",
            field=models.IntegerField(default=1),
        ),
    ]
