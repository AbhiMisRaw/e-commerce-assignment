from django.urls import path

from . import views

urlpatterns = [

    path("seller/products", views.ProductAPIView.as_view(),name="user_product"),
    path("seller/categories", views.ProductCategoryAPIView.as_view()),
    path("seller/categories/<int:pk>", views.ProductCategoryAPIView.as_view()),
    path("products", views.ActiveProductsView.as_view()),
]
