import datetime
from rest_framework_jwt.views import ObtainJSONWebToken
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.renderers import StaticHTMLRenderer
from rest_framework import status
from django.http import JsonResponse

from .serializers import (
    LoginIntelliaptUserJWTSerializer,
    SearchMetricsSerializer,
)
from .utils import check_recaptcha
from .exceptions import (
    RequiredFieldException,
    RecaptchaException
)
from .models import (
    SearchMetricsModel,
)


class LoginIntelliaptUserAPIView(ObtainJSONWebToken):
    """
    Handles the non-social login.
    Extending the JWT package ObtainJSONWebToken APIView to have our own custom serializer
    """
    http_method_names = ['head', 'options', 'post']
    serializer_class = LoginIntelliaptUserJWTSerializer
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        try:
            check_recaptcha(data=self.request.data, required_field='recaptcha_response')
        except (RequiredFieldException, RecaptchaException) as e:
            return JsonResponse(e.message, status=e.status_code)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            response_data = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER(token, user, request)
            response_data['name'] = user.first_name
            # add the is_admin flag for the front end to make sure to only login admin users in dashboard
            if user.is_staff:
                response_data['is_admin'] = True
            response = Response(response_data)
            if api_settings.JWT_AUTH_COOKIE:
                expiration = (datetime.datetime.utcnow() +
                              api_settings.JWT_EXPIRATION_DELTA)
                response.set_cookie(api_settings.JWT_AUTH_COOKIE,
                                    token,
                                    expires=expiration,
                                    httponly=True, domain='analytics.searchsofts.com', path='/')
            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutIntelliaptUserAPIView(APIView):
    """
    Logout user by clearing the JWT token cookie
    """

    http_method_names = ['head', 'options', 'post']
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        response = Response()
        response.delete_cookie('token', '/', 'analytics.searchsofts.com')
        return response


class FetchSearchMetrics(ReadOnlyModelViewSet):
    """
    Fetch the search metrics data from db, distributed datewise
    """

    http_method_names = ['head', 'options', 'get']
    permission_classes = (IsAuthenticated,)
    authentication_classes = []
    serializer_class = SearchMetricsSerializer

    def get_queryset(self):
        from_date = self.request.query_params.get('from', None)
        to_date = self.request.query_params.get('to', None)

        # casting the date string to python datetime
        try:
            from_date = datetime.datetime.strptime(from_date, '%Y-%m-%d').date()
            to_date = datetime.datetime.strptime(to_date, '%Y-%m-%d').date()
        except TypeError:
            pass

        # setting the default from and to date if not passed through get params
        if not from_date or not to_date:
            from_date = datetime.date.today() - datetime.timedelta(days=9)
            to_date = datetime.date.today() - datetime.timedelta(days=2)

        queryset = SearchMetricsModel.objects.filter(metric_date__gte=from_date, metric_date__lte=to_date)
        return queryset


class DataUsageAPI(APIView):
    http_method_names = ['head', 'options', 'post', 'get']
    renderer_classes = [StaticHTMLRenderer]
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        json_data = self.request.data
        file_prefix = "withext-" if self.request.data.get('withext', False) else ''
        if 'withext' in json_data:
            del json_data['withext']
        with open("/var/www/%s%s.log" % (file_prefix, datetime.datetime.now().strftime('%Y-%m-%d')), 'a+') as f:
            f.write(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S') + ": " + str(json_data) + '\n')
        print(self.request.data)
        return Response(status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        with open("/var/www/%s.log" % datetime.datetime.now().strftime('%Y-%m-%d'), 'r') as f:
            lines = [l.strip() for l in f.readlines()][:-10]
        return Response('<br />'.join(lines))