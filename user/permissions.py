from rest_framework import permissions


class IsBusinessOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return request.user.role == "Business Owner"


class IsApplicant(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return request.user.role == "Applicant"


class IsGet(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return request.method == 'GET'
