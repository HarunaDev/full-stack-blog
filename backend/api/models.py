from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Article(models.Model):
    # create fields for title, content and time created
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # links author to the user and whenever the user is being deleted all of the notes will be deleted
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")

    def __str__(self):
        return self.title