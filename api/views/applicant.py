from api.serializers.user import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets

import api.permissions as custom_perm

User = get_user_model()


class ApplicantView(viewsets.ModelViewSet):
    queryset = User.objects.filter(role=3)
    serializer_class = UserSerializer
    permission_classes = [custom_perm.IsGet, custom_perm.IsBusinessOwner]
