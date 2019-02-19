from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from api.views.applicant import ApplicantView
from api.views.company import CompanyView
from api.views.position import PositionView
from api.views.login import LoginView
from api.views.logout import *

router = routers.DefaultRouter()
router.register('api/startup', CompanyView)
router.register('api/position', PositionView)
router.register('api/applicants', ApplicantView)

urlpatterns = [
    path('', include(router.urls)),
    path('api/login', LoginView.as_view()),
    path('api/logout', LogoutView.as_view()),
]
