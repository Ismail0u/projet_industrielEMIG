from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from ..models.utilisateur import Utilisateur
from rest_framework import serializers, views, status
from rest_framework.decorators import api_view, permission_classes
from ..serializers.UtilisateurSerializers import UtilisateurSerializer
from ..serializers.LoginSerializer import LoginSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

User = get_user_model()

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            print(f"🚨 Erreurs de validation: {serializer.errors}")  # Debugging
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data["user"]  # Récupération correcte de l'utilisateur validé
        print(f"✅ Connexion réussie pour: {user.email}")

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": UtilisateurSerializer(user).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK)

class UserProfileView(RetrieveAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user  # Récupère l'utilisateur connecté

class UserView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(UtilisateurSerializer(user).data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data['refresh']
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Déconnexion réussie'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': 'Échec de la déconnexion'}, status=status.HTTP_400_BAD_REQUEST)

