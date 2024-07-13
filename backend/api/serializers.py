from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Article

# Use serializer to help create user and map the data that a user needs based on the request made

# Create searializer for article 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"passowrd": {"write_only": True}}

    
    # function to validate credentials and create new user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
# Create serializer for article
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model: Article
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}} #it automatically sets who the author is based on the user