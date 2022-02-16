import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from datetime import datetime
from chat.models import Message, PrivateMessage
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from channels.db import database_sync_to_async




def create_new_message(message):
    from_user = User.objects.get(pk=message["from"])
    to_user = User.objects.get(pk=int(message["to"]))

    #create new message
    new_message = Message.objects.create(user=from_user, text=message["text"])

    #create new record in Private message
    try:
        private_chat = PrivateMessage.objects.get(user_one=from_user, user_two=to_user)
        private_chat.messages.add(new_message)
    except ObjectDoesNotExist:
        try:
            private_chat = PrivateMessage.objects.get(user_one=to_user, user_two=from_user)
            private_chat.messages.add(new_message)
        except ObjectDoesNotExist:
            private_chat = PrivateMessage.objects.create(user_one=from_user, user_two=to_user)
            private_chat.messages.add(new_message)
            
    return new_message.__dict__["id"]


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        user = user = self.scope["query_string"].decode("utf-8")
        if user:
            self.room_group_name = f"private_{user}"
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )  
            self.accept()


    def disconnect(self, close_code):
         async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )  


    def receive(self, text_data):
        send_from_user = json.loads(text_data)["from"]
        send_to_user = json.loads(text_data)["to"]
        self.send_from_user_room =  f"private_{send_from_user}"
        self.send_to_user_room = f"private_{send_to_user}"

        message = create_new_message(json.loads(text_data))
        print("in recieve : ", message)

        #send to message author
        async_to_sync(self.channel_layer.group_send)(
                self.send_from_user_room,
                {
                    'type': 'chat_message',
                    'message': message,
                    
                }
        )
        
        #send to target user
        async_to_sync(self.channel_layer.group_send)(
                self.send_to_user_room,
                {
                    'type': 'chat_message',
                    'message': message,
                    
                }
        )
         

    def chat_message(self, event):
        print("in recieve : ", event["message"])

        self.send(text_data=json.dumps({
                "message":event["message"]
            }))
        
        





