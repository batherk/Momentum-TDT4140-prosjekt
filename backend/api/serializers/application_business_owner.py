from rest_framework.serializers import ModelSerializer, SerializerMethodField
from ..models.application import Application
from .user import UserSerializer


class ApplicationBusinessOwnerSerializer(ModelSerializer):
    applicant = SerializerMethodField()

    class Meta:
        model = Application
        fields = ('text', 'id', 'applicant')
        depth = 1

    def get_applicant(self, obj):
        return UserSerializer(obj.user).data
