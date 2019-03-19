from ..serializers.application_applicant import ApplicationApplicantSerializer
from ..permissions import *
from ..models.application import Application
from rest_framework import viewsets, mixins
from rest_framework import filters


class ApplicantApplicationView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                               mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    serializer_class = ApplicationApplicantSerializer
    permission_classes = (IsApplicant,)

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)
