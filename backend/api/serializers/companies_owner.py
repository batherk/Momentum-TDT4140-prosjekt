from api.models.company import *
from rest_framework.serializers import ModelSerializer, SerializerMethodField


# from api.urls import *


class CompanyOwnerSerializer(ModelSerializer):
    owner_url = SerializerMethodField()

    class Meta:
        model = Company
        fields = ('id', 'name', 'email', 'info', 'owner_url', 'slug')

    def get_owner_url(self, obj):
        return 'http://' + str(self.context['request'].get_host()) + '/api/mycompanies/' + str(obj.id)

    # def get_

    def create(self, validated_data):
        company = Company.objects.create(**validated_data)
        company.owner = self.context['request'].user
        company.save()
        return company
