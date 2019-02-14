from rest_framework import permissions


class IsBusinessOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.role == "BusinessOwner"


class IsGet(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.method == 'GET'
