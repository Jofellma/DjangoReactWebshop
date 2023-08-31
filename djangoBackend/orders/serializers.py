from django.db.models.query import QuerySet
from items.models import Item
from orders.models import Order
from rest_framework import serializers
from items.serializers import ItemSerializer

class OrderSerializer(serializers.ModelSerializer):
    paid_at = serializers.DateTimeField(format="%d.%m.%Y %H:%M", required=False, read_only=True)
    items = serializers.PrimaryKeyRelatedField(many=True, queryset=Item.objects.all())
    class Meta:
        model = Order
        fields = ['id', 'consumer', 'paid_at', 'items']

class OrderWithItemsSerializer(serializers.ModelSerializer):
    paid_at = serializers.DateTimeField(format="%d.%m.%Y %H:%M", required=False, read_only=True)
    items = ItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ['id', 'consumer', 'paid_at', 'items']