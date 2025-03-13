from django.test import TestCase

from products.models import Product
Product.objects.create(name="Test Product", description="Sample", price=10.99, quantity=5)
exit()
