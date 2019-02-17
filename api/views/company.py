from api.serializers.company import *
from api.models.company import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets

import api.permissions as custom_perm

User = get_user_model()


class CompanyView(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [custom_perm.IsGet]
