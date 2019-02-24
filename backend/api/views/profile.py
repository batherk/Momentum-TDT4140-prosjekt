from api.serializers.profile import ProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework import viewsets,mixins

from api.permissions import *

User = get_user_model()


class ProfileView(viewsets.GenericViewSet,mixins.DestroyModelMixin,mixins.UpdateModelMixin,mixins.RetrieveModelMixin):
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,IsUser)

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
