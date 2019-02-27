from api.serializers.position import *
from api.models.position import *
from rest_framework import viewsets, mixins

import api.permissions as custom_perm


class PositionView(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.ListModelMixin):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = [custom_perm.IsApplicant]
