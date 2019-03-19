from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(ModelSerializer):
    is_certified = SerializerMethodField()

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'is_certified', 'education', 'cv')

    def get_is_certified(self, user):
        return user.certified
