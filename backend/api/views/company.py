from api.serializers.company import *
from api.models.company import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins
from rest_framework import filters

User = get_user_model()


class CompanyView(viewsets.GenericViewSet, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'slug'
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name','info')
