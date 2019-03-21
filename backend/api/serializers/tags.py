from api.models.tags import *
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .position import *


class TagsSerializer(ModelSerializer):
    class Meta:
        model = Tags
        fields = ('id', 'name','times_used', 'color')
        depth = 0

    #def get_positions(self, obj):
      #  req = self.context['request']
      #  if req.user.is_anonymous:
      #      return None
      #  if req.user.role.is_applicant:
      #      positions_queryset = Position.objects.filter(company=obj)
      #      return PositionSerializerDepth0(positions_queryset, context={'request': req}, many=True).data
     #   else:
     #       return None


