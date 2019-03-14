from ..serializers.user import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins

from ..permissions import *

User = get_user_model()


class ApplicantView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = User.objects.filter(role__name="Applicant")
    serializer_class = UserSerializer
    permission_classes = (IsBusinessOwner,)
