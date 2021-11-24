from rest_framework import *
from .models import *



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class GroupStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupStructure
        fields = "__all__"



class ChannelStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelStructure
        fields = "__all__"
