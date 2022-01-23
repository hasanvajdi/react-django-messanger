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

    const [messages, setMessages] = useState([]);

    // getting a list of messages, if any
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/chat/messages/?one=${props.user.pk}&two=${props.selectedChat.user.id}`)
        .then((resultGetMessages)=>{
            setMessages(resultGetMessages.data)
            console.log(resultGetMessages.data)
        })
        .catch((errorGetMessages)=>{
            console.log("get messages error : ", errorGetMessages)
        })
    },[])

    if(props.chatSocket) {props.chatSocket.onmessage = message=>{
        setMessages([...messages, JSON.parse(message.data)])
    }}

    const sendMessage = (e)=>{
        var messageText = messageTextRef.current.state.value
        var today = new Date();
        var currentTime = `${today.getHours()}:${today.getMinutes()}`
        setMessages([...messages, {"text":messageText, "time":currentTime,                     'user' : props.user.pk
}])
        props.chatSocket.send(JSON.stringify(
                {
                    'text' : messageText,
                    'from' : props.user.pk,
                    'to'   : props.selectedChat.id,
                }
            )
        );
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

            <Col className = "chat-box-messages">
                {messages && messages.map((message, key)=>{
                    return <div
                                key={key}
                                className={message.user==props.user.pk ? "right-side-message" : "left-side-message"}
                            >
                                <p>{message.text}</p>
                            </div>
                })}
            </Col>


            <Col className="chat-box-footer">
                <Row className="footer-content">
                    <Col  className="footer-embed-col"  md={2}>
                        <AiOutlinePaperClip />
                    </Col>
                    <Col  className="footer-input-col" md={20}>
                        <Input className="footer-input-input" ref={messageTextRef}/>
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
