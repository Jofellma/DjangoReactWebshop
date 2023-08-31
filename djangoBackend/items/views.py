from .serializers import ItemSerializer
from .models import Item
from django.core.paginator import Paginator, EmptyPage
from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

#GET, PUT or DELETE an item
class ItemDetail(APIView):

    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    #check that the item requested actually exists
    def get_object(self, pk):
        try:
            obj = Item.objects.get(pk=pk)
            self.check_object_permissions(self.request, obj)
            return obj
        except Item.DoesNotExist:
            raise Http404
        
    def get(self, request, pk):
        item = self.get_object(pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)
    
    def put(self, request, pk):
        item = self.get_object(pk)
        if request.user != item.owner:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = ItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        item = self.get_object(pk)
        if request.user.pk != item.owner.pk:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#Create a new item or list all available items
class ItemList(APIView):

    def get(self, request, format=None):

        queryset = Item.objects.filter(order=None)
        ids = request.GET.get('ids')

        if ids is not None:
            ids = ids.split(',')
            queryset = queryset.filter(pk__in=ids)

        title_filter = request.GET.get('titleFilter')
        
        if title_filter is not None:
            queryset = queryset.filter(title__contains=title_filter)
        
        page_number = request.GET.get('pageNumber')

        if page_number is not None:
            page_size = request.GET.get('pageSize', 10)
            paginator = Paginator(queryset , page_size)

            try:
                queryset = paginator.page(page_number)
            except EmptyPage: 
                queryset = []

        serializer = ItemSerializer(queryset, many=True)

        return Response(serializer.data)
    
    authentication_classes = []

    def post(self, request, format=None):

        serializer = ItemSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#get all the authenticated users items currently on sale, 
#which are sold or which have been purchased
class MyItemList(APIView):
    
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None):

        queryset = Item.objects.filter()

        on_sale = request.GET.get('sale')

        if on_sale is not None:
            print(on_sale)
            queryset = queryset.filter(owner=request.user, order=None)

        sold = request.GET.get('sold')

        if sold is not None:
            queryset = queryset.filter(owner=request.user).exclude(order=None)

        serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data)