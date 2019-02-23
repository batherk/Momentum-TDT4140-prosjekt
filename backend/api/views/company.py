from api.serializers.company import *
from api.models.company import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins


User = get_user_model()


class CompanyView(viewsets.GenericViewSet, mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    #lookup_field = 'slug'
