from rest_framework import serializers
from .models import Product, ProductCategory


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields ='__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def validate_stock_count(self, value):
        if value < 0:
            raise serializers.ValidationError("Quantity of Product must be a non-negative value.")
        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price must be a non-negative value.")
        return value



# Example usage
# instance = MyModel.objects.get(pk=1)
# serializer = MyModelSerializer(instance)
# serialized_data = serializer.data
