from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


import uuid


class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    class UserType(models.TextChoices):
        CUSTOMER = "CUSTOMER", "Customer"
        SELLER = "SELLER", "Seller"

    user_id = models.UUIDField(default=uuid.uuid4, primary_key=True, null=False)
    email = models.EmailField("email address", unique=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    wallet_balance = models.FloatField(default=0)
    user_type = models.CharField(
        choices=UserType.choices, max_length=20, default=UserType.CUSTOMER
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.username


# Create your models here.
class ProductCategory(models.Model):
    class ProductCategoryName(models.TextChoices):
        ELECTRONICS = "ELECTRONICS", "Electronics"
        APPAREL = "APPAREL", "Apparel"
        FOOTWEAR = "FOOTWEAR", "Footwear"

    category_name = models.CharField(choices=ProductCategoryName.choices, max_length=20)
    is_active = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self) -> str:
        return self.category_name


class Product(models.Model):

    """Incident model"""

    product_id = models.UUIDField(
        default=uuid.uuid4, primary_key=True, null=False  # Remove the brackets
    )
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=150)
    stock_count = models.IntegerField()
    price = models.FloatField()
    selling_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
