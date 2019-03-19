from rest_framework.serializers import ModelSerializer, SerializerMethodField
from ..models.application import Application


class ApplicationApplicantSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ('text', 'position', 'id')
        depth = 1
