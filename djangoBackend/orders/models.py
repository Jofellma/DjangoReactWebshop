from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Order(models.Model):
    consumer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    paid_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['paid_at']
