from api.models.position import *
from api.serializers.company import *
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class PositionsOwnerSerializer(ModelSerializer):
    owner_url = SerializerMethodField()
    company_details = SerializerMethodField()

    def get_owner_url(self, obj):
        return 'http://' + str(self.context['request'].get_host()) + '/api/mypositions/' + str(obj.id)

    def get_company_details(self,obj):
        req = self.context['request']
        company = [Company.objects.get(id=obj.company.id)]
        return CompanyDetailsSerializer(company, context={'request': req}, many=True).data

    class Meta:
        model = Position
        fields = ('id', 'owner_url', 'name', 'description', 'company', 'company_details')
        depth = 0
