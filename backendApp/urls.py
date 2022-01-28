from django.urls import path
from . import views
from . import api

urlpatterns = [
    path('signup', api.signup),
    path('login', api.login),
    path('logout', api.logout),
    path('getCurrentUser', api.getCurrentUser),
    path('addMovies', views.addMovies),
    path('viewMovies', views.viewMovies),
    path('deleteMovies', views.deleteMovies),
    path('getMovieStatus', views.getMovieStatus),
    path('updateMovieStatus', views.updateMovieStatus),
]
