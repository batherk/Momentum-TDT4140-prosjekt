from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from api.serializers.base64imagefield import Base64ImageField

User = get_user_model()


class ProfileSerializer(ModelSerializer):

    photo = Base64ImageField(
        max_length=None, use_url=True,
    )
    class Meta:
        model = User
        fields = ('email','first_name','last_name','role', 'photo')

