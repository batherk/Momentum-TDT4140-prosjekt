from api.models.position import *
from api.serializers.company import *
from rest_framework.serializers import ModelSerializer, CharField, SerializerMethodField


class PositionSerializer(ModelSerializer):
    is_owner = SerializerMethodField()

    class Meta:
        model = Position
        fields = ('id', 'url', 'name', 'description', 'company','is_owner')
        depth = 1

    def get_is_owner(self,obj):
        return self.context['request'].user == obj.company.owner


class PositionSerializerDepth0(ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'url', 'name', 'description')
        depth = 0


class ApplicantPositionSerializer(ModelSerializer):
    text = CharField(write_only=True, required=True)
    position_name = SerializerMethodField()
    position_description = SerializerMethodField()

    class Meta:
        model = Position
        fields = ('id', 'url', 'position_name', 'position_description', 'company', 'text')
        depth = 1

    def get_position_name(self, obj):
        return obj.name

    def get_position_description(self, obj):
        return obj.description
