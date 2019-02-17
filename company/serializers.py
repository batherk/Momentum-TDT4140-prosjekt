from rest_framework.serializers import Serializer,ModelSerializer, CharField, EmailField
from .models import Company, Position
from django.contrib.auth import authenticate
from rest_framework import exceptions

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


class LoginSerializer(Serializer):
    username = EmailField()
    password = CharField()

    def validate(self, data):
        username = data.get("username", "")
        password = data.get("password", "")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data["user"] = user
                else:
                    msg = "User is deactivated."
                    raise exceptions.ValidationError(msg)
            else:
                msg = "Unable to login with given credentials."
                raise exceptions.ValidationError(msg)
        else:
            msg = "Must provide username and password both."
            raise exceptions.ValidationError(msg)
        return data
