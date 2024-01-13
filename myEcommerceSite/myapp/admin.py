from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Product, ProductCategory

# Register your models here.


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = [
        "email",
        "username",
        "first_name",
        "last_name",
        "is_staff",
        "user_type",
    ]
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "email",
                    "user_type",
                    "first_name",
                    "last_name",
                    "is_staff",
                )
            },
        ),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Product)
admin.site.register(ProductCategory)
