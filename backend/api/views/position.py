from rest_framework import viewsets
from rest_framework import filters
from ..serializers.position import *
from ..models.position import *
from rest_framework import viewsets, mixins

from ..permissions import *


class PositionView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (IsApplicant,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',  'description')
