from ..models.position import *
from api.serializers.company import *
from rest_framework.serializers import ModelSerializer, ValidationError


class PositionOwnerSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'name', 'description')
        depth = 1

    def validate(self, data):
        if data['name'] is None:
            raise ValidationError("No name")
        if data['description'] is None:
            raise ValidationError("No description")
        return data
