from rest_framework import routers
from .views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


router = routers.SimpleRouter()
router.register("send", EmailViewSet)

urlpatterns = router.urls
urlpatterns += staticfiles_urlpatterns()
