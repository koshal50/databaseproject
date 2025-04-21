from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Event, Match, SportsMaterial, ClassworkForm, Faculty

# Event Serializer
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'date', 'venue', 'description', 'faculty']

# Match Serializer
class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'event', 'date', 'team_1', 'team_2', 'venue']

# User Registration Serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password', 'role', 'department']

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role'],
            department=validated_data.get('department', '')  # Default to empty string if not provided
        )
        return user

# JWT Token Serializer
class TokenSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

# User Detail Serializer
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'role', 'department']

# Sports Material Serializer
class SportsMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportsMaterial
        fields = ['id', 'name', 'quantity', 'added_by']

# Classwork Form Serializer
class ClassworkFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassworkForm
        fields = ['id', 'student', 'event', 'reason', 'submitted_at', 'status']
        read_only_fields = ['student', 'submitted_at', 'faculty_approved_at', 'final_approved_at', 'rejected_at']

# Faculty Serializer
class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ['id', 'user', 'available_dates']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'role', 'department']
