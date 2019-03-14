from ..serializers.user import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins

import api.permissions as custom_perm

User = get_user_model()


class UserView(viewsets.GenericViewSet,mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (custom_perm.IsBusinessOwner,)
