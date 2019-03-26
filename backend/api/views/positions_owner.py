from ..serializers.position_owner import *
from ..models.position import Position
from ..models import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins
from ..permissions import *
from rest_framework.response import Response

User = get_user_model()


class PositionsOwnerView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    serializer_class = PositionOwnerSerializer
    permission_classes = (IsBusinessOwner,)
    lookup_field = 'id'
    queryset = Position.objects.all()

    def list(self, request, slug):
        if not Company.objects.filter(slug=slug).exists():
            return Response({'msg': 'Denne startupen finnes ikke'})
        company = Company.objects.get(slug=slug)
        if company.owner != request.user:
            return Response({'msg': 'Du er ikke eieren til dette firmaet'})
        positions = Position.objects.filter(company=company)
        serializer = PositionOwnerSerializer(positions, context={'request': request}, many=True)
        return Response(serializer.data)

    def create(self, request, slug):
        if not Company.objects.filter(slug=slug).exists():
            return Response({'msg': 'Denne startupen finnes ikke'})
        company = Company.objects.get(slug=slug)
        if company.owner != request.user:
            return Response({'msg': 'Du er ikke eieren til dette firmaet'})
        validation_serializer = PositionOwnerSerializer(data=request.data, context={'request': request})
        validation_serializer.is_valid(raise_exception=True)
        data = validation_serializer.validated_data
        pos = Position(name=data['name'], company=company, description=data['description'])
        pos.save()
        positions = Position.objects.filter(company=company)
        serializer = PositionOwnerSerializer(positions, context={'request': request}, many=True)
        return Response(serializer.data)

