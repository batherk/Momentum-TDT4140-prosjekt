from django.urls import path,include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('startup',views.CompanyView)
router.register('position',views.PositionView)
router.register('user',views.UserView)



urlpatterns = [
    #path('',),
    path('api/',include(router.urls)),
    path('api/login',views.LoginView.as_view()),
    path('api/logout',views.LogoutView.as_view())
]