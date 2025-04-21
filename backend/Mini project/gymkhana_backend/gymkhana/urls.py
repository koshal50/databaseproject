from django.urls import path
from . import views
from django.urls import path

from .views import (
    UserRegistrationView,
    UserLoginView,
    UserListView,
    UserDetailView,
    EventListCreateView,
    EventRetrieveUpdateDeleteView,
    MatchListCreateView,
    MatchRetrieveUpdateDeleteView,
    ClassworkFormCreateView,
    FacultyApproveFormView,
    SecretaryApproveFormView,
    SportsMaterialListCreateView,
    SportsMaterialRetrieveUpdateDeleteView,
    FacultyListCreateView,
    FacultyRetrieveUpdateDestroyView,
    StudentDashboardView,
    FacultyDashboardView,
    SecretaryDashboardView,
    AdminDashboardView,
)


urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name='user-register'),
    path('login/', views.UserLoginView.as_view(), name='user-login'),

    # Users
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/<int:id>/', views.UserDetailView.as_view(), name='user-detail'),

    # Events
    path('events/', views.EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:id>/', views.EventRetrieveUpdateDeleteView.as_view(), name='event-detail'),

    # Matches
    path('matches/', views.MatchListCreateView.as_view(), name='match-list-create'),
    path('matches/<int:id>/', views.MatchRetrieveUpdateDeleteView.as_view(), name='match-detail'),

    # Sports Materials
    path('materials/', views.SportsMaterialListCreateView.as_view(), name='material-list-create'),
    path('materials/<int:pk>/', views.SportsMaterialRetrieveUpdateDeleteView.as_view(), name='material-detail'),

    # Classwork Forms
    path('forms/', views.ClassworkFormCreateView.as_view(), name='form-create-list'),
    path('forms/<int:pk>/faculty-approve/', views.FacultyApproveFormView.as_view(), name='form-faculty-approve'),
    path('forms/<int:pk>/secretary-approve/', views.SecretaryApproveFormView.as_view(), name='form-secretary-approve'),

    # Dashboards
    path('dashboard/student/', views.StudentDashboardView.as_view(), name='student-dashboard'),
    path('dashboard/faculty/', views.FacultyDashboardView.as_view(), name='faculty-dashboard'),
    path('dashboard/secretary/', views.SecretaryDashboardView.as_view(), name='secretary-dashboard'),
    path('dashboard/admin/', views.AdminDashboardView.as_view(), name='admin-dashboard'),

    # Faculties
    path('faculties/', views.FacultyListCreateView.as_view(), name='faculty-list-create'),
    path('faculties/<int:pk>/', views.FacultyRetrieveUpdateDestroyView.as_view(), name='faculty-retrieve-update-destroy'),
]
