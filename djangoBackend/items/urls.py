from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.ItemList.as_view()),
    path('item/<int:pk>/', views.ItemDetail.as_view()),
    path('my-items/', views.MyItemList.as_view())
]
