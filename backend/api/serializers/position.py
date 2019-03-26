from api.models.position import *
from api.serializers.company import *
from rest_framework.serializers import ModelSerializer, CharField, SerializerMethodField
from ..models.application import Application
from ..serializers.application_business_owner import ApplicationBusinessOwnerSerializer


class PositionSerializer(ModelSerializer):
    is_owner = SerializerMethodField()
    applications = SerializerMethodField()

    class Meta:
        model = Position
        fields = ('id', 'url', 'name', 'description', 'company', 'is_owner', 'applications')
        depth = 1

    def get_is_owner(self, obj):
        return self.context['request'].user == obj.company.owner

    def get_applications(self, obj):
        if self.context['request'].user == obj.company.owner:
            applications = Application.objects.filter(position=obj)
            ser = ApplicationBusinessOwnerSerializer(applications, many=True)
            return ser.data
        return None

    def to_representation(self, obj):
        output = super(ModelSerializer, self).to_representation(obj)
        user = self.context['request'].user
        if (not user.is_business_owner) or user != obj.company.owner:
            output.pop('applications')
        return output


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
