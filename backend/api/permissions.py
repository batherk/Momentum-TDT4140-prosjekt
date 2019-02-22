from rest_framework import permissions


class IsBusinessOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return False
        if request.user.is_admin:
            return True
        return request.user.role.is_business_owner


class IsApplicant(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return False
        if request.user.is_admin:
            return True
        return request.user.role.is_applicant


class IsInvestor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return False
        if request.user.is_admin:
            return True
        return request.user.role.is_investor


class IsGet(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method == 'GET'


class IsAnonymous(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_authenticated
