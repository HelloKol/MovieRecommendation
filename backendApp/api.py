import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from backendApp.pyrebaseConfig import db, auth


@api_view(['GET', 'POST'])
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        req_firstname = data["firstName"]
        req_lastname = data["lastName"]
        req_username = data["userName"]
        req_email = data["email"].lower()
        req_password = data["password"]

        user_data = {
            "first_name": req_firstname,
            "last_name": req_lastname,
            "username": req_username,
            "email": req_email,
        }
        create_user = ""
        message = False
        try:
            auth.create_user_with_email_and_password(
                req_email, req_password)
            create_user = db.child("users").push(
                user_data)
            message = True
            return Response({"signedUp": message, "data": create_user})
        except:
            message = False
            return Response({"signedUp": message})


@api_view(['GET', 'POST'])
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        req_email = data["email"].lower()
        req_password = data["password"]

        # Sign in using email
        message = False
        try:
            user = auth.sign_in_with_email_and_password(
                req_email, req_password)
            message = True

        except:
            message = False
            return Response({"isLoggedin": message})
        response = Response({"isLoggedin": message})
        response.set_cookie(
            key="email", value=user["email"], max_age=2592000)
        return response


@api_view(['GET', 'POST'])
def logout(request):
    if request.method == 'GET':
        response = Response({"status": "success"})
        try:
            response.delete_cookie("email")
        except:
            return Response({"status": "failed"})
        return response


@api_view(['GET', 'POST'])
def getCurrentUser(request):
    if request.method == 'GET':
        try:
            all_users = db.child("users").get()
            for users in all_users.each():
                if users.val()["email"] == request.COOKIES["email"]:
                    return Response({"isLoggedin": True, "data": users.val()})
        except:
            return Response({"isLoggedin": False})
