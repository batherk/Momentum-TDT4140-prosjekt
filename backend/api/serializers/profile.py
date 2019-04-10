from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth import get_user_model
from api.serializers.base64imagefield import Base64ImageField

User = get_user_model()


class ProfileSerializer(ModelSerializer):
    photo = Base64ImageField(max_length=None, use_url=True)
    is_certified = SerializerMethodField()

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'role', 'photo', 'visible', 'education', 'cv', 'is_certified')

    def to_representation(self, user):
        if not user.is_applicant:
            self.fields.pop('visible')
            self.fields.pop('education')
            self.fields.pop('cv')
        return super().to_representation(user)

    def get_is_certified(self, user):
        return user.certified
