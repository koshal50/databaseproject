from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Event
from datetime import date
from django.contrib.auth import get_user_model

class BasicAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create sample users
        self.admin = get_user_model().objects.create_user(
            username='adminuser',
            password='adminpass',
            role='Admin'
        )

        self.faculty = get_user_model().objects.create_user(
            username='facultyuser',
            password='facultypass',
            role='Faculty'
        )

        # Authenticate
        self.client.login(username='adminuser', password='adminpass')

    def test_create_event(self):
        data = {
            "name": "Football Tournament",
            "date": "2025-05-10",
            "venue": "Main Ground",
            "description": "Inter-department football tournament",
            "faculty": self.faculty.id
        }
        response = self.client.post(reverse('event-list-create'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Football Tournament")

    def test_get_events(self):
        Event.objects.create(
            name="Cricket Match",
            date=date.today(),
            venue="Field 1",
            description="Test",
            faculty=self.faculty
        )
        response = self.client.get(reverse('event-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_unauthorized_access(self):
        self.client.logout()
        response = self.client.get(reverse('event-list-create'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

