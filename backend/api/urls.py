from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from api.views.applicant import ApplicantView
from api.views.company import CompanyView
from api.views.position import PositionView
from api.views.login import LoginView
from api.views.logout import *
from api.views.user_create import *
from api.views.company_owner import CompanyOwnerView
from api.views.profile import ProfileView
from .views.positions_owner import PositionsOwnerView


router = routers.DefaultRouter()
router.register('api/startups', CompanyView)
router.register('api/positions', PositionView)
router.register('api/applicants', ApplicantView)
router.register('api/mycompanies',CompanyOwnerView,base_name='CompanyOwner')
router.register('api/profile',ProfileView,base_name='profile')
router.register(r'api/mycompanies/(?P<slug>[-\w]+)/positions',PositionsOwnerView , base_name="position_owner")

urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', LoginView.as_view()),
    path('api/logout/', LogoutView.as_view()),
    path('api/register/', CreateUserView.as_view()),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
