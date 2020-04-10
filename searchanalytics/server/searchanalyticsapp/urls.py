from . import views
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
# from rest_framework_jwt.views import VerifyJSONWebToken

router = DefaultRouter()
router.register(r'fetchsearchmetrics', views.FetchSearchMetrics, base_name='fetch_search_metrics')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^login', views.LoginIntelliaptUserAPIView.as_view(), name='login'),
    url(r'^logout', views.LogoutIntelliaptUserAPIView.as_view(), name='logout'),
    url(r'^datausage', views.DataUsageAPI.as_view(), name='datausage'),
]
