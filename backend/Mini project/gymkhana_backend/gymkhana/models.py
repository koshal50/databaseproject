from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone

# Custom User model
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('faculty', 'Faculty'),
        ('student', 'Student'),
        ('sports_secretary', 'Sports Secretary'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    department = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.username

# Wrapper for extending user details
class User(models.Model):
    ROLE_CHOICES = [
        ('Student', 'Student'),
        ('Faculty', 'Faculty'),
        ('Admin', 'Admin'),
        ('Secretary', 'Secretary'),
    ]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    department = models.CharField(max_length=100)
    registered_at = models.DateTimeField(null=True, blank=True)  # New field for registration time

    def __str__(self):
        return f"{self.user.email} ({self.role})"

# Intermediate model for event-faculty mapping
class EventFaculty(models.Model):
    event = models.ForeignKey("Event", on_delete=models.CASCADE)
    faculty = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.faculty.user.username} for {self.event.name}"

# Event model with M2M relation via EventFaculty
class Event(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    venue = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    faculty = models.ManyToManyField(User, through='EventFaculty', related_name='managed_events')

    def __str__(self):
        return self.name

# Match model
class Match(models.Model):
    event = models.ForeignKey(Event, related_name='matches', on_delete=models.CASCADE)
    date = models.DateTimeField()
    team_1 = models.CharField(max_length=255)
    team_2 = models.CharField(max_length=255)
    venue = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.team_1} vs {self.team_2} ({self.event.name})"

    class Meta:
        unique_together = ('date', 'venue')

# Sports Material model
class SportsMaterial(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    added_by = models.ForeignKey(User, related_name='added_materials', on_delete=models.CASCADE, limit_choices_to={'role': 'Admin'})

    def __str__(self):
        return self.name

# Classwork Form model
class ClassworkForm(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Faculty Approved', 'Faculty Approved'),
        ('Rejected', 'Rejected'),
        ('Final Approved', 'Final Approved'),
    ]
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submitted_forms', limit_choices_to={'role': 'Student'})
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    reason = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    faculty_approved_at = models.DateTimeField(null=True, blank=True)
    final_approved_at = models.DateTimeField(null=True, blank=True)
    rejected_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Form: {self.student.user.email} - {self.event.name} - {self.status}"

# Faculty profile model
class Faculty(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    available_dates = models.ManyToManyField(Event, related_name='available_faculties', blank=True)

    def __str__(self):
        return self.user.email
