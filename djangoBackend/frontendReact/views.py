from django.shortcuts import render, redirect
from django.http.response import HttpResponse
from django.http import HttpResponse
from items.models import Item
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import random

#This is the homepage, which returns a html with dynamic info 
#and allows the user to generate testusers with items for sale

def homePage(request):
    items = Item.objects.all()
    accounts = User.objects.all()
    context = {
        'numberOfItems': len(items),
        'numberOfUsers': len(accounts)
    }
    return render(request, 'home.html', context)

#Function to populate the database with 6 users and 3 of them has 10 items for sale
def populateDatabase(request):

    #Delete any existing users and items
    User.objects.all().delete()
    Item.objects.all().delete()

    #Generate 6 new users according to the following format:
    """
        Username: testuser#
        Password: pass#
        Email: testuser#@shop.aa
    """

    for i in range(1,7):
        user = User.objects.create_user(username='testuser'+str(i),
                                        email='testuser'+str(i)+'@shop.aa',
                                        password='pass'+str(i))
        
        Token.objects.create(user=user)
        
        #3 users should have 10 items each
        if i > 3:
            itemList=['Office chair', 'Soda pop', 'Old computer', 'Nail filer', 'Notebook',
                       'Bandana', 'Box of Q-tips', 'Bottle of oil', 'Bread', 'Pair of glasses']
            for item in itemList:
                price = float(random.randrange(100, 1000))/100
                item = Item(title=item, price=price, owner=user, description='This is just a testitem in a testwebsite, please contact the administration for updates on releases!')
                item.save()

    return redirect(homePage)

#For testing purposes, to just delete the current items and user
def clearDatabase(request):

    User.objects.all().delete()
    Item.objects.all().delete()

    return redirect(homePage)

def index(request):
    return render(request, 'build/index.html')