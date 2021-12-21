from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
import socket
socket.getaddrinfo('localhost', 8080)
from django.template import Context
from django.template.loader import get_template

from .serializers import EmailSerilizer
from .models import SentEmail



class EmailViewSet(viewsets.ModelViewSet):
    queryset = SentEmail.objects.all()
    serializer_class = EmailSerilizer
    

    def create(self, request):
        if request.method == "POST":
            uuid = super().create(request).data
            template = get_template('confirmation_email.html')
            content = template.render(
                                {
                                    'username': request.data["username"], 
                                    'website': request.META['HTTP_HOST'],
                                    'uuid' : uuid["uuid"],
                                }
                            )
            email = EmailMessage("confirmation", content, settings.DEFAULT_FROM_EMAIL, to=[request.data["email"]])
            email.content_subtype = 'html'
            email.send()
        return JsonResponse({"status" : "ok"})



    def partial_update(self, request, pk=None):
        print("pk:", pk)
        obj = SentEmail.objects.filter(uuid = pk)[0]
        if obj.status == False:
            obj.status = True
            obj.save()
        else:
            return JsonResponse({"status" : "400"})
        
        return JsonResponse({"status" : "200"})




