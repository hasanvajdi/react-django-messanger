from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


from users.models import SentEmail
from .models import Profile


@receiver(post_save, sender=SentEmail)
def create_profile(sender, instance, created, **kwargs):
    if not created:
        print("ins:", instance)
        print("ins:", instance.__dict__)
        user = User.objects.filter(pk=instance.user_id)
        Profile.objects.create(user=user[0], email=instance.email)