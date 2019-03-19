from api.models.company import *
from api.models.position import *
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from api.serializers.tags import TagsSerializer
from .position import *
from api.models.tags import Tags


class CompanySerializer(ModelSerializer):
    positions = SerializerMethodField()
    tags = TagsSerializer(many=True, read_only=True)
    tags_id = serializers.PrimaryKeyRelatedField(many=True, write_only=True, source='tags',queryset=Tags.objects.all())

    class Meta:
        model = Company
        fields = ('id', 'url', 'name', 'email', 'info', 'positions','slug','tags','tags_id')
        #fields = '__all__'
        depth = 1
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }

    def get_positions(self, obj):
        req = self.context['request']
        if req.user.is_anonymous:
            return None
        if req.user.role.is_applicant:
            positions_queryset = Position.objects.filter(company=obj)
            return PositionSerializerDepth0(positions_queryset, context={'request': req}, many=True).data
        else:
            return None


