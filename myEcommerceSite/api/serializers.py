# serializers.py
from rest_framework import serializers
from myapp.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "wallet_balance",
            "user_type",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = CustomUser(
            email=validated_data["email"],
            username=validated_data["username"],
            user_type=validated_data["user_type"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        password = validated_data.get("password", None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance
