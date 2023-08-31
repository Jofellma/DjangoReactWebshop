from django.urls import path
from accounts.views import RegisterUserAPI, LogInUserAPI, LogOutUserAPI
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register/', RegisterUserAPI.as_view()),
    path('login/', LogInUserAPI.as_view()),
    path('logout/', LogOutUserAPI.as_view()),
    #path('editAccount/')
]
