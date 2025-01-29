from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers.LoginSerializer import LoginSerializer
from ..serializers.UtilisateurSerializers import UtilisateurSerializer

class LoginView(APIView):
    """
    Point d'entrée API qui permet aux utilisateurs de se connecter.
    """
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        """
        Connecte un utilisateur.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response({"user": UtilisateurSerializer(user).data})
