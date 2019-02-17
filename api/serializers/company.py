from api.models.company import *
from rest_framework.serializers import ModelSerializer

from .position import PositionSerializer


class CompanySerializer(ModelSerializer):
    positions = PositionSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ('id', 'url', 'name', 'email', 'info', 'positions')
        depth = 1
