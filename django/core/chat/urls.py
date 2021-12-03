from rest_framework import routers
from .views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

router = routers.SimpleRouter()


router.register("profile", ProfileViewSet, basename = "profile")
router.register("groups", GroupStructureViewSet, basename = "group")
router.register("channels", ChannelStructureViewSet, basename = "channel")

urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)