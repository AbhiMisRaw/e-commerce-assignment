# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework import status

from .serializers import ProductSerializer, ProductCategorySerializer
from .models import Product, ProductCategory


class CustomSellerPermission(BasePermission):
    """
 allow access only to users with user_type "SELLER".
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and has the correct user_type
        print(request.user.is_authenticated)
        return request.user.is_authenticated and request.user.user_type == 'SELLER'


class ProductAPIView(APIView):
    permission_classes = [CustomSellerPermission]

    def get(self, request, product_id=None):
        products = Product.objects.filter(product_id=product_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        request.data['created_by'] = request.user.user_id
        category = ProductCategory.objects.filter(category_name=request.data["product_category"].upper())
        #print(category[0])
        request.data["product_category"] = category[0].id
        serializer = ProductSerializer(data=request.data)
        print("request recieved", serializer)
        if serializer.is_valid():
            print("serializer data is good", serializer)
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, product_id, *args, **kwargs):
        product = self.get_object(product_id)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, product_id, *args, **kwargs):
        product = self.get_object(product_id)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, product_id, *args, **kwargs):
        product = self.get_object(product_id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_object(self, product_id):
        try:
            return Product.objects.get(product_id=product_id)
        except Product.DoesNotExist:
            raise Response(status=status.HTTP_404_NOT_FOUND)


class UserProductsView(APIView):
    permission_classes = [CustomSellerPermission]

    def get(self, request):
        user = request.user

        # Retrieve products created by the authenticated user
        products = Product.objects.filter(created_by=user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


# def index(request):
#     return render(request, "myapp/index.html")

#
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import ProductCategory
# from .serializers import ProductCategorySerializer


class ProductCategoryAPIView(APIView):
    permission_classes = [CustomSellerPermission]

    def get(self, request):
        categories = ProductCategory.objects.all()
        serializer = ProductCategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductCategorySerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        category = self.get_object(pk)
        serializer = ProductCategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_object(self, pk):
        try:
            return ProductCategory.objects.get(pk=pk)
        except ProductCategory.DoesNotExist:
            raise Response(status=status.HTTP_404_NOT_FOUND)


class ActiveProductsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        active_products = Product.objects.filter(is_active=True)
        serializer = ProductSerializer(active_products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)