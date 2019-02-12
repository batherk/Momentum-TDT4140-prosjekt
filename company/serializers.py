from rest_framework import serializers
from .models import Company, Position
#from django.contrib.auth.models import User

from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'url', 'name', 'company', 'description')


class CompanySerializer(serializers.ModelSerializer):
    positions = PositionSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ('id', 'url', 'name', 'email', 'info', 'positions')
        depth = 1
