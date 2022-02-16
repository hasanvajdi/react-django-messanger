from django.shortcuts import render
from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from django.http import JsonResponse
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.template import Context
from django.contrib.auth.models import User
from django.template.loader import get_template
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from core.settings import BASE_DIR
import os, socket
socket.getaddrinfo('localhost', 8000)


from .serializers import *
from .models import *
from .permissions import IsAuthor



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^username']


class GroupStructureViewSet(viewsets.ModelViewSet):
    serializer_class = GroupStructureSerializer
    queryset = GroupStructure.objects.all()

    def list(self, request):
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

    def list(self, request):
        queryset = ChannelStructure.objects.filter(owner = request.user)
        serializer = ChannelStructureSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        a = super().create(request)
        add_member = ChannelStructure.objects.filter(channel_id = a.data["channel_id"])[0]
        add_member.members.add(add_member.owner)
        return Response(status=status.HTTP_201_CREATED)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def list(self, request):
        user_one = request.query_params.get("one")
        user_two = request.query_params.get("two")
        queryset = PrivateMessage.objects.filter(user_one=user_one, user_two=user_two)

        if len(queryset) == 0:
            queryset = PrivateMessage.objects.filter(user_one=user_two, user_two=user_one)
            if not queryset:
                return Response("No message here yet")
                
        serializer = MessageSerializer(queryset[0].messages.all().order_by("date"), many=True)
        return Response(serializer.data)
        
    
