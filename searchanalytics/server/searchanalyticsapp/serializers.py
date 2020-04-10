from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, ParseError
from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler
from rest_framework_jwt.serializers import JSONWebTokenSerializer, VerificationBaseSerializer
from .models import SearchMetricsModel


class LoginIntelliaptUserJWTSerializer(JSONWebTokenSerializer):

    email = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    role = serializers.CharField(required=False, allow_blank=True)

    def validate(self, attrs):
        """
        Overriding the validate method of the base class JSONWebTokenSerializer from the JWT package
        to handle the social accounts authentication and also for custom exception messages.
        (this can later be used in all the other IntelliApt apps)

        :arg attrs: request attributes
        :return a dict object containing the JWT token, if successful else raise the ValidationError
        """

        credentials = {
            self.username_field: attrs.get(self.username_field),
            'password': attrs.get('password'),
        }

        if attrs.get('role', None):
            credentials['role'] = attrs['role']

        if all(credentials.values()):
            intelliapt_user = authenticate(**credentials)

            if intelliapt_user:
                if not intelliapt_user.is_active:
                    raise AuthenticationFailed({
                        'message': 'User account is disabled'
                    }, code=status.HTTP_403_FORBIDDEN)

                if intelliapt_user.is_oauth:
                    raise AuthenticationFailed({
                        'message': 'You have signed up through %s. Please login using %s' %
                                   (intelliapt_user.oauth_server, intelliapt_user.oauth_server)},
                        code=status.HTTP_403_FORBIDDEN)

                payload = jwt_payload_handler(intelliapt_user)

                return {
                    'token': jwt_encode_handler(payload),
                    'user': intelliapt_user
                }
            else:
                raise AuthenticationFailed({
                    'message': 'Invalid credentials'
                }, code=status.HTTP_403_FORBIDDEN)
        else:
            raise ParseError({
                'message': 'Must include "{username_field}" and "password".'.format(username_field=self.username_field)
            }, code=status.HTTP_400_BAD_REQUEST)


class SearchMetricsSerializer(serializers.ModelSerializer):

    class Meta:
        model = SearchMetricsModel
        fields = ("metric_date", "metric")
        read_only_fields = [field.name for field in SearchMetricsModel._meta.get_fields()]