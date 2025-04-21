from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Custom permission to allow access only to users with an 'admin' role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'


class IsFaculty(BasePermission):
    """
    Custom permission to allow access only to users with a 'faculty' role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'faculty'


class IsStudent(BasePermission):
    """
    Custom permission to allow access only to users with a 'student' role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'


class IsSportsSecretary(BasePermission):
    """
    Custom permission to allow access only to users with a 'sports_secretary' role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'sports_secretary'


class IsSecretary(BasePermission):
    """
    Custom permission to allow access only to users with a 'Secretary' role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Secretary'
