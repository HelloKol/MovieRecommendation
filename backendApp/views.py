import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from backendApp.pyrebaseConfig import db

message = {"status": "success"}


@api_view(['GET', 'POST'])
def addMovies(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            addMovieData = {
                "id": data["id"],
                "title": data["title"],
                "poster_path": data["poster_path"],
                "backdrop_path": data["backdrop_path"],
                "release_date": data["release_date"],
                "genre_ids": data["genre_ids"],
                "popularity": data["popularity"],
                "vote_average": data["vote_average"],
                "overview": data["overview"],
            }
            existing_movies_id = []
            existing_movies = db.child("movies").get()
            for movies in existing_movies.each():
                existing_movies_id.append(movies.val()["id"])

            # ADD TO MOVIE DATABASE
            if data["id"] not in existing_movies_id:
                db.child("movies").push(addMovieData)

            if "email" in request.COOKIES:
                # ADD TO USER WATCHLIST
                watch_list_data = {
                    "user_email": request.COOKIES["email"],
                    "movie_id": data["id"],
                    "status": "Currently watching"
                }
                db.child("watchlist").push(watch_list_data)
            return Response(message)

        except:
            return Response("couldnt add movie to watchlist")


@api_view(['GET', 'POST'])
def viewMovies(request):
    if request.method == 'GET':
        if "email" in request.COOKIES:
            all_movies = []
            watchlist_movies = []
            watchlist_movies_id = []
            existing_movies = db.child("movies").get()
            existing_watchlist = db.child("watchlist").order_by_child(
                "user_email").equal_to(request.COOKIES["email"]).get()

            # FIND ALL MOVIES
            for movies in existing_movies.each():
                all_movies.append(movies.val())
                # FIND USER WATCHLIST
                for watchlist in existing_watchlist.each():
                    if watchlist.val()["user_email"] == request.COOKIES["email"]:
                        watchlist_movies_id.append(watchlist.val()["movie_id"])

            filtered_id = set(watchlist_movies_id)
            for x in all_movies:
                if x["id"] in filtered_id:
                    watchlist_movies.append(x)

            return Response(watchlist_movies)


@api_view(['GET', 'POST', "DELETE"])
def deleteMovies(request):
    if request.method == 'DELETE':
        data = json.loads(request.body)
        existing_watchlist = db.child("watchlist").order_by_child(
            "user_email").equal_to(request.COOKIES["email"]).get()
        for y in existing_watchlist.each():
            if y.val()["movie_id"] == data["id"]:
                db.child("watchlist").child(y.key()).remove()
                return Response(message)


@api_view(['GET', 'POST'])
def getMovieStatus(request):
    if request.method == 'GET':
        try:
            existing_watchlist = db.child("watchlist").order_by_child(
                "user_email").equal_to(request.COOKIES["email"]).get()
            users_movies = []
            for x in existing_watchlist.each():
                users_movies.append(x.val())
            return Response({"data": users_movies})
        except:
            return Response({"status": "failed"})


@api_view(['GET', 'POST', "PUT"])
def updateMovieStatus(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        if data["status"] == "Edit":
            return Response({"status": "wrong status selection"})
        try:
            existing_watchlist = db.child("watchlist").order_by_child(
                "user_email").equal_to(request.COOKIES["email"]).get()
            for x in existing_watchlist.each():
                if x.val()["movie_id"] == data["id"]:
                    db.child("watchlist").child(x.key()).update(
                        {"status": data["status"]})
                    return Response(message)
        except:
            return Response({"status": "failed"})
