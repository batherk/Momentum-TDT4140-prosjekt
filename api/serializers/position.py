from api.models.position import *
from api.serializers.company import *
from rest_framework.serializers import ModelSerializer


class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'url', 'name', 'description', 'company')
        depth = 1

class PositionSerializerDepth0(ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'url', 'name', 'description')
        depth = 0


