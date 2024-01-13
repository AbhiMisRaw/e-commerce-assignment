from django.shortcuts import render

# Create your views here.


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

# from .models import CustomUser
from .serializers import CustomUserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

# views.py


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        print(request.data)

        if serializer.is_valid():
            user = serializer.save()

            # Optionally, generate and return an authentication token here
            # For example, using Django Rest Framework JWT

            return Response(
                {"user_id": user.user_id, "message": "Now you can login"},
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"error": "Failed to create user", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        user = authenticate(
            request,
            email=data["email"],
            password=data["password"],
        )
        if user is not None:
            try:
                token = Token.objects.get(user=user)
            except:
                token = Token.objects.create(user=user)

            user_serializer = CustomUserSerializer(user)
            return Response(
                {
                    "token": str(token),
                    "user": user_serializer.data,
                    "message": "Logged in successful",
                },
                status=201,
            )

        return Response(
            {"detail": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
