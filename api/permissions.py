from rest_framework import permissions


class IsBusinessOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            if request.user.is_admin:
                return True
            return request.user.role.is_business_owner
        except(Exception):
            return False


class IsApplicant(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            if request.user.is_admin:
                return True
            return request.user.role.is_applicant
        except(Exception):
            return False


class IsInvestor(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            if request.user.is_admin:
                return True
            return request.user.role.is_investor
        except(Exception):
            return False


class IsGet(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method == 'GET'
