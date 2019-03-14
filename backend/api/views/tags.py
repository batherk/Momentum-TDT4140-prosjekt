from api.serializers.tags import *
from api.models.tags import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins
from rest_framework.viewsets import mixins,GenericViewSet
from rest_framework import filters


class TagsView(GenericViewSet,mixins.DestroyModelMixin,mixins.UpdateModelMixin,mixins.RetrieveModelMixin, mixins.ListModelMixin,mixins.CreateModelMixin):
    serializer_class = TagsSerializer
    #ermission_classes = (IsAuthenticated,IsUser)
    queryset = Tags.objects.all().extra( order_by=['-times_used'])
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)

