from rest_framework import serializers
from .models import *



class EmailSerilizer(serializers.ModelSerializer):
    class Meta:
        model = SentEmail
        fields = "__all__"


