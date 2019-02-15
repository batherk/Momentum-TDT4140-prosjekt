from rest_framework.serializers import ModelSerializer, CharField, EmailField
from .models import Company, Position
# from django.contrib.auth.models import User

from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'url', 'name', 'company', 'description')


class CompanySerializer(ModelSerializer):
    positions = PositionSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ('id', 'url', 'name', 'email', 'info', 'positions')
        depth = 1

"""

class UserLoginSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    email = EmailField(label='Email Address')

    class Meta:
        model = User
        fields = [
            'email',
            'password',
            'token'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        return data
"""