from rest_framework import permissions


class IsBusinessOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return str(request.user.role) == "Business Owner"


class IsApplicant(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return str(request.user.role) == "Applicant"


class IsInvestor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return str(request.user.role) == "Investor"


class IsGet(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin:
            return True
        return request.method == 'GET'
