from django.db import models
from django.contrib.auth.models import User
import uuid
import random
import string


def current_user():
    return [instance.user]

def profile_avatar(instance, filename):
    return f'profile_avatar/{instance.user.id}_avatar.jpg'
    
class Profile(models.Model):
    user        = models.OneToOneField(User, on_delete = models.CASCADE)
    email       = models.EmailField(blank = True, null = True)
    avatar      = models.FileField(upload_to = profile_avatar, blank = True, null = True)
    biograhpy   = models.CharField(max_length = 100, blank = True, null = False)
    last_seen   = models.DateTimeField(editable = False, auto_now = True)



##########################################################################################
##########################################################################################
##########################################################################################
##########################################################################################
##########################################################################################



def GroupAvatr(instance, filename):
    
    return f'group_avatar/{instance.group_id}_avatar.jpg'

def GroupIdCreator():
    print("group id")
    return int(''.join(random.sample("0123456789", 10)))

def GroupLinkCreator():
    print("group link")
    return ''.join(random.sample("0123456789" + string.ascii_lowercase + string.ascii_uppercase, 17))


class GroupStructure(models.Model):
    group_id    = models.CharField(max_length = 100, default = GroupIdCreator, unique=True, primary_key = True, editable=False)
    link        = models.CharField(max_length=100, default = GroupLinkCreator, unique=True, editable=False)
    name        = models.CharField(max_length = 50, blank = False, null = False)
    avatar      = models.ImageField(upload_to = GroupAvatr, blank = True, null = True, max_length = 500)
    biograhpy   = models.CharField(max_length = 400, blank = True, null = True)
    owner       = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "group_owner")
    admins      = models.ManyToManyField(User, blank = True, null=True, related_name="group_admins", default=current_user)
    members     = models.ManyToManyField(User, blank=True, null=True, related_name="group_members", default=current_user)




   
    



##########################################################################################
##########################################################################################
##########################################################################################
##########################################################################################
##########################################################################################


def ChannelAvatr(instance, filename):
    return f'channel_avatr/{instance.channel_id}_avatar.jpg'

def ChannelIdCreator():
    return "-" + str(''.join(random.sample("0123456789", 10)))

def ChannelLinkCreator():
    return ''.join(random.sample("0123456789" + string.ascii_lowercase + string.ascii_uppercase, 19))

class ChannelStructure(models.Model):
    channel_id  = models.CharField(max_length = 100, unique=True, primary_key = True, editable=False, default=ChannelIdCreator)
    link        = models.CharField(max_length=100, blank=True, null=True, default=ChannelLinkCreator)
    name        = models.CharField(max_length=50, blank=False, null=False)
    avatar      = models.FileField(upload_to = ChannelAvatr,  blank = True, null = True, max_length = 500)
    biograhpy   = models.CharField(max_length = 400, blank = True, null = True)
    owner       = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "channel_owner")
    admins      = models.ManyToManyField(User, blank=True, related_name="channel_admins")
    members     = models.ManyToManyField(User, blank=True, related_name="channel_members")


