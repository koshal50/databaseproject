from rest_framework import permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import UserDetailSerializer, UserRegistrationSerializer, TokenSerializer, EventSerializer, MatchSerializer, SportsMaterialSerializer, ClassworkFormSerializer, FacultySerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin, IsFaculty, IsSecretary
from .models import CustomUser, Event, Match, SportsMaterial, ClassworkForm, Faculty
from rest_framework import generics, status
from rest_framework import mixins



User = get_user_model()

# User Registration View
class UserRegistrationView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Login View
class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = get_user_model().objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Admin Views
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

class UserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    lookup_field = 'id'

# Event Views
class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

class EventRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    lookup_field = 'id'

# Match Views
class MatchListCreateView(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

class MatchRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    lookup_field = 'id'

# Classwork Form Views
class ClassworkFormCreateView(generics.ListCreateAPIView):
    serializer_class = ClassworkFormSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ClassworkForm.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

# Faculty Approve Form
class FacultyApproveFormView(generics.UpdateAPIView):
    queryset = ClassworkForm.objects.all()
    serializer_class = ClassworkFormSerializer
    permission_classes = [IsAuthenticated, IsFaculty]
    
    def patch(self, request, *args, **kwargs):
        form = self.get_object()
        action = request.data.get("action")
        if action == "approve":
            form.status = "Faculty Approved"
            form.faculty_approved_at = timezone.now()
        elif action == "reject":
            form.status = "Rejected"
            form.rejected_at = timezone.now()
        else:
            return Response({"error": "Invalid action"}, status=400)
        form.save()
        return Response(ClassworkFormSerializer(form).data)

# Secretary Approve Form
class SecretaryApproveFormView(generics.UpdateAPIView):
    queryset = ClassworkForm.objects.all()
    serializer_class = ClassworkFormSerializer
    permission_classes = [IsAuthenticated, IsSecretary]
    
    def patch(self, request, *args, **kwargs):
        form = self.get_object()
        action = request.data.get("action")
        if action == "approve":
            form.status = "Final Approved"
            form.final_approved_at = timezone.now()
        else:
            return Response({"error": "Invalid action"}, status=400)
        form.save()
        return Response(ClassworkFormSerializer(form).data)


# Sports Material Views
class SportsMaterialListCreateView(generics.ListCreateAPIView):
    queryset = SportsMaterial.objects.all()
    serializer_class = SportsMaterialSerializer
    permission_classes = [IsAuthenticated]

class SportsMaterialRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SportsMaterial.objects.all()
    serializer_class = SportsMaterialSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

# Faculty Views
class FacultyListCreateView(generics.ListCreateAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [IsAuthenticated]

class FacultyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [IsAuthenticated]

# Dashboard Views (Simple response for now, customize later)
class StudentDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({"message": "Student Dashboard"})

class FacultyDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({"message": "Faculty Dashboard"})

class SecretaryDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({"message": "Secretary Dashboard"})

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def get(self, request):
        return Response({"message": "Admin Dashboard"})