from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from accounts.serializers import RegisterUser, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from rest_framework.status import HTTP_400_BAD_REQUEST

# Create your views here.

class RegisterUserAPI(APIView):

    #API endpoint for creating a new user
    def post(self, request):
        serializer = RegisterUser(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        user = User.objects.create_user(username=data["username"], 
                                        email=data["email"], 
                                        password=data["password"])
        Token.objects.create(user=user)
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)
    
    #TODO Create a PUT method to change password
""""
class UserDetails(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get(self, request):
        token = request.data.get("token")
        user = authenticate(token=token)

        if(user):
            return Response({
                "username": user.username,
                "email": user.email,
                "password": user.password
            })
        else:
            return Response("Something went wrong",status=HTTP_400_BAD_REQUEST)
"""
class LogInUserAPI(APIView):

    #this is used in order to bypass CSRF token
    authentication_classes = []

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if (user):
            login(request,user)
            return Response({
                "username": user.username,
                "userId": user.id,
                "email": user.email,
                "token": user.auth_token.key
            })
        else:
            return Response("Could not log in with the given credentials",status=HTTP_400_BAD_REQUEST)
    
class LogOutUserAPI(APIView):

    authentication_classes = []

    def post(self, request):
        logout(request)

        return Response("You're logged out!")

        
