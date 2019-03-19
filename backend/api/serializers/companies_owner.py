from api.models.company import *
from api.models.position import *
from .position import PositionSerializerDepth0
from rest_framework.serializers import ModelSerializer, SerializerMethodField


# from api.urls import *


class CompanyOwnerSerializer(ModelSerializer):
    owner_url = SerializerMethodField()
    positions = SerializerMethodField()

    class Meta:
        model = Company
        fields = ('id', 'name', 'email', 'info', 'owner_url', 'positions', 'slug', 'certified')

    def get_owner_url(self, obj):
        return 'http://' + str(self.context['request'].get_host()) + '/api/mycompanies/' + str(obj.slug)

    # def get_

    def create(self, validated_data):
        company = Company.objects.create(**validated_data)
        company.owner = self.context['request'].user
        company.save()
        return company

    def get_positions(self, obj):
        req = self.context['request']
        positions_queryset = Position.objects.filter(company=obj)
        return PositionSerializerDepth0(positions_queryset, context={'request': req}, many=True).data
