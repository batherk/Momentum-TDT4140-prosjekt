from rest_framework import generics
from api.serializers.user_create import *
from api.models.user import *
from api.permissions import *


class CreateUserView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAnonymous,]
