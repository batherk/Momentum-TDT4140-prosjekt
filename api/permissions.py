from rest_framework import permissions


class IsBusinessOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return request.user.role.is_business_owner


class IsApplicant(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return request.user.role.is_applicant


class IsInvestor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return request.user.role.is_applicant


class IsGet(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return request.method == 'GET'
