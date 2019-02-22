from api.models.company import *
from rest_framework.serializers import ModelSerializer


class CompanyOwnerSerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = ('__all__')
        depth = 1