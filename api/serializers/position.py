from api.models.position import *
from rest_framework.serializers import ModelSerializer


class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'url', 'name', 'company', 'description')
