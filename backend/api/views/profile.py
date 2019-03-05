from api.serializers.profile import ProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework.viewsets import mixins,GenericViewSet
from django.shortcuts import get_object_or_404

from api.permissions import *

User = get_user_model()


class ProfileView(GenericViewSet,mixins.DestroyModelMixin,mixins.UpdateModelMixin,mixins.RetrieveModelMixin):

    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,IsUser)
    queryset = User.objects.all()

