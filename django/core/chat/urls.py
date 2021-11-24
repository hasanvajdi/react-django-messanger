from rest_framework import routers
from .views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

router = routers.SimpleRouter()


router.register("profile", ProfileViewSet, basename = "profile")
router.register("groups", GroupStructureViewSet, basename = "group")
router.register("channels", ChannelStructureViewSet, basename = "channel")

urlpatterns = router.urls
urlpatterns += staticfiles_urlpatterns()
