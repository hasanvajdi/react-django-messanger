import React, {useEffect, useRef, useState} from 'react';
import {Row, Col, Image, Form, Input} from 'antd';
import './../static/css/ChatBox.css';
import { AiFillPhone, AiOutlineMore, AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import Cookies from 'universal-cookie';
import axios from 'axios';


import MessageFormat from './MessageFormat';



const ChatBox = (props)=>{
    const messageTextRef = useRef();


    let cookies =  new Cookies();
    const [currentChat, setCurrentChat] = useState(props.selectedChat.id);
    const [messages, setMessages] = useState([]);

    useEffect(()=>{

        //getting messages
        axios.get(`http://127.0.0.1:8000/chat/messages/?one=${props.user.pk}&two=${props.selectedChat.id}`)
        .then((resultGetMessages)=>{
            if (typeof(resultGetMessages.data)=="object")
            {
                setMessages(resultGetMessages.data)
            }
            else setMessages(null)

        })
        .catch((errorGetMessages)=>{
            console.log("get messages error : ", errorGetMessages)
        })

    }, [props.selectedChat.id]);

    if(props.chatSocket) {props.chatSocket.onmessage = message=>{
        if(messages){
            var message_id = JSON.parse(message.data)["message"]
            axios.get(`http://127.0.0.1:8000/chat/messages/${message_id}/`)
            .then(res_newmessage=>{
                if(messages) setMessages([...messages, res_newmessage.data])
                else setMessages([res_newmessage.data])

            })
        }
    }}

    const sendMessage = (e)=>{
        console.log(e.type)
        console.log(e.key)
        if(e.type==="click" || e.key==="Enter"){
            var messageText = messageTextRef.current.state.value
            if(messageText.length > 0){
                messageTextRef.current.state.value = ""
                props.chatSocket.send(JSON.stringify(
                    {
                        'text' : messageText,
                        'from' : props.user.pk,
                        'to'   : props.selectedChat.id,
                    }
                )
            );
            }
        }

    }

    return(
        <React.Fragment>
            <Col className="chat-box-header">
                <Row style={{marginTop :"1.5%", marginLeft : "20px"}}>
                    <Col className = "user-profile-col" md={2}>
                        {
                            props.selectedChat.avatar ?
                            <Image className = "user-avatar" src = {`http://localhost:8000${props.selectedChat.avatar}`}/>:
                            <div className = "user-avatar" style = {{backgroundColor : "#444444"}}></div>
                        }
                    </Col>

                    <Col className="user-username-col" md={18}>
                        <span>{props.selectedChat.user.username}</span>
                    </Col>

                    <Col className="user-call-button-col" md={2}>
                        <AiFillPhone />
                    </Col>

                    <Col className="user-options-col" md={2}>
                        <AiOutlineMore />
                    </Col>
                </Row>
            </Col>

            <Col className = {messages ? "chat-box-messages" : "no-message chat-box-messages"}>
                {
                    messages ? messages.map((message, key)=>{
                        return <MessageFormat message={message} user={props.user} key={key} />
                        })
                        :<p className = "no-message-here-yet">No message here yet</p>
                }

            </Col>


            <Col className="chat-box-footer">
                <Row className="footer-content">
                    <Col  className="footer-embed-col"  md={2}>
                        <AiOutlinePaperClip />
                    </Col>
                    <Col  className="footer-input-col" md={20}>
                        <Input className="footer-input-input" ref={messageTextRef} onKeyDown = {sendMessage}/>
                    </Col>
                    <Col  className="footer-send-col" md={2} onClick={sendMessage}>
                        <AiOutlineSend />
                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    )
}



export default ChatBox;
