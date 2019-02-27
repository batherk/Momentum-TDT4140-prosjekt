from api.serializers.positions_owner import *
from api.models.position import *
from rest_framework import viewsets

import api.permissions as custom_perm


class PositionsOwnerView(viewsets.ModelViewSet):
    serializer_class = PositionsOwnerSerializer
    permission_classes = [custom_perm.IsBusinessOwner]

    def get_queryset(self):
        user = self.request.user
        return Position.objects.filter(company__owner=user)
