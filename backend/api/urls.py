from django.urls import path
from . import views
from .views import get_author

# set url patterns
urlpatterns = [
    path('user/', get_author, name='get-author'),
    path("articles/", views.ArticleListCreate.as_view(), name="article-list"),
    path("articles/delete/<int:pk>/", views.ArticleDelete.as_view(), name="delete-article")
]