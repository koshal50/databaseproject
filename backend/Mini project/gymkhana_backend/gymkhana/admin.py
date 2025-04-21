from django.contrib import admin
from .models import User, Event, Match, SportsMaterial, ClassworkForm, Faculty

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'department')  # List display in the admin panel
    search_fields = ('user__email', 'role')  # Search by email or role

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'venue')
    search_fields = ('name', 'venue')

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('team_1', 'team_2', 'date', 'venue')
    search_fields = ('team_1', 'team_2', 'venue')

@admin.register(SportsMaterial)
class SportsMaterialAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'added_by')
    search_fields = ('name',)

@admin.register(ClassworkForm)
class ClassworkFormAdmin(admin.ModelAdmin):
    list_display = ('student', 'event', 'status', 'submitted_at')
    search_fields = ('student__user__email', 'event__name')

    
@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_available_dates')
    search_fields = ('user__email',)

    def get_available_dates(self, obj):
        return ", ".join([str(date) for date in obj.available_dates.all()])
    get_available_dates.short_description = "Available Dates"

# Register the rest of the models
#admin.site.register(Event)
#dmin.site.register(Match)
#admin.site.register(SportsMaterial)
#admin.site.register(ClassworkForm)
#admin.site.register(Faculty)
