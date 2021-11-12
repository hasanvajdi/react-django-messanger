from django.db import models
from django.contrib.auth.models import User
import uuid

class SentEmail(models.Model):
    uuid        = models.UUIDField(default = uuid.uuid4, editable = False)
    user        = models.OneToOneField(User, on_delete = models.CASCADE, primary_key = True)
    email       = models.EmailField(blank = False, default="blank")
    sent_date   = models.DateField(auto_now_add = True)
    status      = models.BooleanField(default=True)