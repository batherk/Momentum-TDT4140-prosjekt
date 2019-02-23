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

    def get_positions(self, obj):
        req = self.context['request']
        try:
            if req.user.role.is_applicant:
                positions_queryset = Position.objects.filter(company=obj)
                return PositionSerializerDepth0(positions_queryset, context={'request': req}, many=True).data
            else:
                return None
        except:
            return None

