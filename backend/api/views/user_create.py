from rest_framework import generics
from api.serializers.user_create import *
from api.permissions import *
from django.contrib.auth import get_user_model
User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAnonymous,]
