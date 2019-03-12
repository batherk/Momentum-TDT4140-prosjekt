from api.serializers.companies_owner import CompanyOwnerSerializer
from api.models.company import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.position import Position
from ..serializers.position import PositionSerializerDepth0

import api.permissions as custom_perm

User = get_user_model()


class CompanyOwnerView(viewsets.ModelViewSet):
    serializer_class = CompanyOwnerSerializer
    permission_classes = [custom_perm.IsBusinessOwner]
    lookup_field = 'slug'

    def get_queryset(self):
        return Company.objects.filter(owner=self.request.user)

    @action(url_path='positions', detail=True)
    def positions(self, request, slug):
        positions_queryset = Position.objects.filter(company__slug=slug)
        data = PositionSerializerDepth0(positions_queryset, context={'request': self.request}, many=True).data
        return Response(data)
