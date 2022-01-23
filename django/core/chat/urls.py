from rest_framework import routers
from .views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

router = routers.SimpleRouter()


router.register("users", UserViewSet, basename = "users")
router.register("profile", ProfileViewSet, basename = "profile")
router.register("groups", GroupStructureViewSet, basename = "group")
router.register("channels", ChannelStructureViewSet, basename = "channel")
router.register("messages", MessageViewSet, basename="message")


urlpatterns = router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)