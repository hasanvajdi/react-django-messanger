import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from datetime import datetime


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        user = self.scope["query_string"].decode("utf-8")
        if user:
            self.room_group_name = f"private_{user}"
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )  
            print("room_name: ", self.room_group_name)
            self.accept()


    def disconnect(self, close_code):
         async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )  


    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        send_to_user = text_data_json["user"]
        self.send_to_user_room = f"private_{send_to_user}"
        print("room : ", self.send_to_user_room)
        print("message : ", message)
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.send_to_user_room,
            {
                'type': 'chat_message',
                'message': message
            }
        )




    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        print("messaage2:", message)
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message'   : message,
            'time'      : datetime.now().time().strftime("%H:%M")
        }))





