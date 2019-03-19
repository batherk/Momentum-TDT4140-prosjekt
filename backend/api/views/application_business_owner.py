from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins
from rest_framework.response import Response

from ..models import *
from ..models.application import Application
from ..permissions import *
from ..serializers.application_business_owner import ApplicationBusinessOwnerSerializer

User = get_user_model()


class ApplicationBusinessOwnerView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    serializer_class = ApplicationBusinessOwnerSerializer
    permission_classes = (IsBusinessOwner,)
    lookup_field = 'id'
    queryset = Application.objects.all()

    def list(self, request, slug, id_pos):
        if not Company.objects.filter(slug=slug).exists():
            return Response({'msg': 'Denne startupen finnes ikke'})
        company = Company.objects.get(slug=slug)
        if company.owner != request.user:
            return Response({'msg': 'Du er ikke eieren til dette firmaet'})
        if not Position.objects.filter(id=id_pos).exists():
            return Response({'msg': 'Denne stillingen finnes ikke'})
        if company != Position.objects.get(id=id_pos).company:
            return Response({'msg': 'Denne stillingen hører ikke til ditt firma'})
        applications = Application.objects.filter(position=id_pos)
        serializer = ApplicationBusinessOwnerSerializer(applications, context={'request': request}, many=True)
        return Response(serializer.data)

    def retrieve(self, request, slug, id_pos, id):
        if not Company.objects.filter(slug=slug).exists():
            return Response({'msg': 'Denne startupen finnes ikke'})
        company = Company.objects.get(slug=slug)
        if company.owner != request.user:
            return Response({'msg': 'Du er ikke eieren til dette firmaet'})
        if not Position.objects.filter(id=id_pos).exists():
            return Response({'msg': 'Denne stillingen finnes ikke'})
        if company != Position.objects.get(id=id_pos).company:
            return Response({'msg': 'Denne stillingen hører ikke til ditt firma'})
        if not Application.objects.filter(id=id).exists():
            return Response({'msg': 'Denne søknaden finnes ikke'})
        application = Application.objects.get(id=id)
        if application.position != Position.objects.get(id=id_pos):
            return Response({'msg': 'Denne søknaden er ikke sendt til denne stillingen'})
        serializer = ApplicationBusinessOwnerSerializer(application, context={'request': request})
        return Response(serializer.data)
