# Generated by Django 5.0.3 on 2024-04-23 14:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_product_category_alter_rating_unique_together_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='brand',
            new_name='Brand',
        ),
    ]
