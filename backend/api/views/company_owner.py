from api.serializers.companies_owner import CompanyOwnerSerializer
from api.models.company import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins

import api.permissions as custom_perm

User = get_user_model()


class CompanyOwnerView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.UpdateModelMixin,
                       mixins.DestroyModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin):
    queryset = Company.objects.all()
    serializer_class = CompanyOwnerSerializer
    permission_classes = [custom_perm.IsBusinessOwner]
