from rest_framework import viewsets
from rest_framework import filters
from ..serializers.position import *
from ..models.position import *
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models.application import Application
from ..serializers.position_owner import PositionOwnerSerializer

from ..permissions import *


class PositionView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (IsApplicant | IsBusinessOwner,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'description')

    def update(self, request, pk):
        if not Position.objects.filter(id=pk).exists():
            return Response({'msg': 'Denne stillingen finnes ikke'})
        pos = Position.objects.get(id=pk)
        if pos.company.owner != request.user:
            return Response({'msg': 'Du er ikke eieren til dette firmaet'})
        validation_serializer = PositionOwnerSerializer(data=request.data, context={'request': request})
        validation_serializer.is_valid(raise_exception=True)
        data = validation_serializer.validated_data
        pos.name = data['name']
        pos.description = data['description']
        pos.save()
        serializer = PositionOwnerSerializer(pos, context={'request': request}, many=False)
        return Response(serializer.data)

    def destroy(self, request, pk):
        if not Position.objects.filter(id=pk).exists():
            return Response({'msg': 'Denne stillingen finnes ikke'})
        pos = Position.objects.get(id=pk)
        if pos.company.owner != request.user:
            return Response({'msg': 'Du er ikke eieren til dette firmaet'})
        return super(viewsets.ModelViewSet, self).destroy(self, request, pk)

    @action(detail=True, url_path="apply", serializer_class=ApplicantPositionSerializer, methods=('GET', 'POST'))
    def apply(self, request, pk):
        msg = ''
        if not Position.objects.filter(id=pk).exists():
            return Response({'msg': 'Stillingen finnes ikke'})
        if request.method == 'POST':
            pos = Position.objects.get(id=pk)
            ser = ApplicantPositionSerializer(data=request.data)
            ser.is_valid(raise_exception=True)
            Application(user=request.user, position=pos, text=ser.validated_data['text']).save()
            return Response({'msg': 'Du har sendt inn søknaden'})
        pos = Position.objects.get(id=pk)
        ser = ApplicantPositionSerializer(pos, context={'request': request})
        return Response(ser.data)


class CompanyPositionView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (IsApplicant,)
    lookup_field = 'id'
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'description')

    def list(self, request, slug):
        if not Company.objects.filter(slug=slug).exists():
            return Response({'msg': 'Denne startupen finnes ikke'})
        company = Company.objects.get(slug=slug)
        return super(viewsets.GenericViewSet, self).list(self, request, slug)

    def retrieve(self, request, slug, id):
        if not Company.objects.filter(slug=slug).exists():
            return Response({'msg': 'Denne startupen finnes ikke'})
        company = Company.objects.get(slug=slug)
        if not Position.objects.filter(id=id).exists():
            return Response({'msg': 'Denne stillingen finnes ikke'})
        if company != Position.objects.get(id=id).company:
            return Response({'msg': 'Denne stillingen hører ikke til ditt firma'})
        return super(viewsets.GenericViewSet, self).retrieve(self, request, slug, id)
