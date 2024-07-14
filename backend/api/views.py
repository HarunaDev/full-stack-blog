from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ArticleSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Article

# Create your views here.

# make views for creating and deletig an article, using list create view to help list all article or create a new one if none exist
class ArticleListCreate(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer #specify serializer class
    permission_classes = [IsAuthenticated] #allow only authenticated users to access this view

    # get articles written by a user
    def get_queryset(self):
        user = self.request.user #set user to the authenticated user
        return Article.objects.filter(author=user) #gives us all the articles written by this user, you can use all() to get all the articles
    
    # specify custom configurations when creating a new articles
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# create view to delete article
class ArticleDelete(generics.DestroyAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user #set user to the authenticated user
        return Article.objects.filter(author=user) #gives us all the articles written by this user, you can use all() to get all the articles


# implement creating a new user view
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #view all existing users to prevent creating a user that already exists
    serializer_class = UserSerializer #specify what type of data to accept to make a new user
    permission_classes =[AllowAny] #allows anyone who is not authenticated to use this view to create a new user
