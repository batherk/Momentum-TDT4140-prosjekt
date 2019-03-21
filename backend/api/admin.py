from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from api.forms.user_admin_change import UserAdminChangeForm
from api.forms.user_admin_creation import UserAdminCreationForm
from api.models.company import Company
from api.models.position import Position
from api.models.user import *
from .models.application import Application
from api.models.tags import *


admin.site.register(Company)
admin.site.register(Position)
admin.site.register(Role)
admin.site.register(Tags)
admin.site.register(Application)


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('email', 'first_name', 'last_name', 'admin', 'certified', 'role')
    list_filter = ('admin', 'role', 'certified')
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'role', 'certified')}
         ),
    )
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    filter_horizontal = ()

    def get_fieldsets(self, request, obj):
        if obj.is_applicant:
            return (
                ('Info', {'fields': ('email', 'first_name', 'last_name', 'role', 'certified', 'password','education','cv')}),
                ('Permissions', {'fields': ('admin', 'staff')}),
            )
        else:
            return (
                ('Info', {'fields': ('email', 'first_name', 'last_name', 'role', 'certified', 'password')}),
                ('Permissions', {'fields': ('admin', 'staff')}),
            )


admin.site.register(User, UserAdmin)
