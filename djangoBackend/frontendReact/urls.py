from django.urls import path
from . import views

urlpatterns = [
    path('', views.homePage),
    path('populateDatabase/', views.populateDatabase),
    path('clearDatabase/', views.clearDatabase),
    path('shop/', views.index),
    path('register/', views.index),
    path('login/', views.index),
    path('account/', views.index),
    path('myitems/', views.index),
]
