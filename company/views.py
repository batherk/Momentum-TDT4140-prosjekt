from django.shortcuts import render
from rest_framework import viewsets
from .models import Company, Position
#from django.contrib.auth.models import User
from .serializers import CompanySerializer, PositionSerializer, UserSerializer

from django.contrib.auth import get_user_model
User = get_user_model()


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CompanyView(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class PositionView(viewsets.ModelViewSet):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
