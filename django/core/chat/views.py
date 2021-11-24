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
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status




from .serializers import *
from .models import *
from .permissions import IsAuthor


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer




class GroupStructureViewSet(viewsets.ModelViewSet):
    serializer_class = GroupStructureSerializer
    queryset = GroupStructure.objects.all()

    def list(self, request):
        print("user : ", request.user)
        queryset = GroupStructure.objects.filter(owner = request.user)
        serializer = GroupStructureSerializer(queryset, many=True)
        return Response(serializer.data)


    def create(self, request):
        a = super().create(request)
        add_member = GroupStructure.objects.filter(group_id = a.data["group_id"])[0]
        add_member.members.add(add_member.owner)
        return Response(status=status.HTTP_201_CREATED)


     
    
        




class ChannelStructureViewSet(viewsets.ModelViewSet):
    queryset = ChannelStructure.objects.all()
    serializer_class = ChannelStructureSerializer