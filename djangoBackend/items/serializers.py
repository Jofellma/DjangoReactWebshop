from .models import Item
from rest_framework import serializers

class ItemSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d.%m.%Y %H:%M", required=False, read_only=True)
    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'price', 'created_at', 'owner', 'order']
        extra_kwargs = {
            'date_created': {'read_only': True}
        }