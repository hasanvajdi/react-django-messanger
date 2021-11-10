from django.db import models
from django.contrib.auth.models import User


class SentEmail(models.Model):
    user        = models.OneToOneField(User, on_delete = models.CASCADE, primary_key = True)
    email       = models.EmailField(blank = False, default="blank")
    sent_date   = models.DateField(auto_now_add = True)
    status      = models.BooleanField(default=True)