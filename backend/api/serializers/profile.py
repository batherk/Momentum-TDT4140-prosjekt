from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email','first_name','last_name','role',)

