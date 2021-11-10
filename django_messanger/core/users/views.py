from django.shortcuts import render
from .serializers import EmailSerilizer
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
import socket
socket.getaddrinfo('localhost', 8080)


from .models import SentEmail



class EmailViewSet(viewsets.ModelViewSet):
    queryset = SentEmail.objects.all()
    serializer_class = EmailSerilizer
    

    def create(self, request):
        if request.method == "POST":
            send_mail(
                        "confirmation email", 
                        f"hi {request.POST['name']}\n\n\nyou want to register an account in {request.META['HTTP_HOST']}",
                        settings.DEFAULT_FROM_EMAIL, 
                        [request.POST["email"]]
                    )
            super().create(request)


        return JsonResponse({"status" : "ok"})
        