from api.models.company import *
from api.models.position import *
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .position import *


class CompanySerializer(ModelSerializer):
    positions = SerializerMethodField()

    class Meta:
        model = Company
        fields = ('id', 'url', 'name', 'email', 'info', 'positions','slug')
        depth = 1
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }

    def get_positions(self, obj):
        req = self.context['request']
        if req.user.is_anonymous:
            return None
        if req.user.is_applicant or req.user.is_admin:
            positions_queryset = Position.objects.filter(company=obj)
            return PositionSerializerDepth0(positions_queryset, context={'request': req}, many=True).data
        else:
            return None


