from django.urls import path
from . import views

# set url patterns
urlpatterns = [
    path("articles/", views.ArticleListCreate.as_view(), name="article-list"),
    path("articles/delete/<int:pk>", views.ArticleDelete.as_view(), name="delete-article")
]