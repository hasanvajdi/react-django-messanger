import React, {useEffect, useRef} from 'react';
import {Row, Col, Image, Form, Input} from 'antd';
import './../static/css/ChatBox.css';
import { AiFillPhone, AiOutlineMore, AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import Cookies from 'universal-cookie';


const ChatBox = (props)=>{
    const messageTextRef = useRef();
    let cookies =  new Cookies();

    const sendMessage = (e)=>{
        console.log("chat", props.chatSocket)

        if(props.chatSocket) {props.chatSocket.onmessage = message=>{
            console.log("onmessage28 :", JSON.parse(message.data))
        }}
        var message_text = messageTextRef.current.state.value

        props.chatSocket.send(JSON.stringify(
                {
                    'message' : message_text,
                    'user' : props.selectedChat.id
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

            <Col className = "chat-box-messages"></Col>
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
