from rest_framework import *
from django.contrib.auth.models import User
from .models import *



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class GroupStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupStructure
        fields = "__all__"


class ChannelStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelStructure
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer): 
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
