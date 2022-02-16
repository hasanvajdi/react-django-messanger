import React, {useRef, useState} from 'react';
import {Row, Col, Popover, message as messageSuccess, Modal, Button, Input} from 'antd';
import './../static/css/MessageFormat.css';
import {RollbackOutlined, CopyOutlined, PushpinOutlined,
        ArrowLeftOutlined, DeleteOutlined, CheckCircleOutlined,
        EditOutlined} from '@ant-design/icons';
import axios from 'axios';

const MessageFormat = (props)=>{
    const messageTextEdit=useRef();
    const editInputRef=useRef();
    const popOverRef=useRef();

    const [message, setMessage] = useState(props.message);
    const [popOverVisiblity, setPopOverVisiblity]=useState(false);
    const [editeModalVisibilty, setEditeModalVisibilty]=useState(false);
    const [messageCurrentText, setMessageCurrentText]=useState();





    const handlePopover=()=>{
        setPopOverVisiblity(!popOverVisiblity)
    }

    const handleReply = (id)=>{
        console.log(id)
    }



    const handleEdit=(messageText)=>{
        setPopOverVisiblity(!popOverVisiblity)
        setEditeModalVisibilty(true)
        setMessageCurrentText(messageText)
    }

    const handleEditSubmit=(id)=>{
        axios.put(`http://127.0.0.1:8000/chat/messages/${id}/`, {text:editInputRef.current.state.value, edited:true})
        .then(res_successEdit=>{
            setMessage({...message, edited:true, text:editInputRef.current.state.value})
            setEditeModalVisibilty(false)

        })
        .catch(res_errorEdit=>{
            console.log("error in editing message", res_errorEdit);
        })
    }


    const copyMessageSuccess = () => {
      messageSuccess.success('Message text was copied', 1.5);
    };

    const handleCopyText = (id)=>{
        setPopOverVisiblity(false)
        navigator.clipboard.writeText(messageTextEdit.current.innerText);
        copyMessageSuccess()
    }


    const handlePin = (id)=>{
        console.log(id)
    }

    const handleForward = (id)=>{
        console.log(id)
    }

    const handleDelete = (id)=>{
        console.log(id)
    }

    const handleSelect = (id)=>{
        console.log(id)
    }

    const messageOption1 = (
        <div className="message-menu-content">
            <div onClick={()=>handleReply(message.id)}    key="1"  className="message-menu-option"><div><RollbackOutlined className="message-menu-icon"/>Reply</div></div>
            <div onClick={()=>handleCopyText(message.id)} key="2"  className="message-menu-option"><div><CopyOutlined className="message-menu-icon"/>CopyText</div></div>
            <div onClick={(e)=>handleEdit(message.text)}     key="7"  className="message-menu-option"><div><EditOutlined className="message-menu-icon"/>Edit</div></div>
            <div onClick={()=>handlePin(message.id)}      key="3"  className="message-menu-option"><div><PushpinOutlined className="message-menu-icon"/>Pin</div></div>
            <div onClick={()=>handleForward(message.id)}  key="4"  className="message-menu-option"><div><ArrowLeftOutlined className="message-menu-icon"/>Forward</div></div>
            <div onClick={()=>handleDelete(message.id)}   key="5"  className="message-menu-option"><div><DeleteOutlined className="message-menu-icon"/>Delete</div></div>
            <div onClick={()=>handleSelect(message.id)}   key="6"  className="message-menu-option"><div><CheckCircleOutlined className="message-menu-icon"/> Select</div></div>
        </div>
    );

    const messageOption2 = (
        <div className="message-menu-content">
            <div onClick={()=>handleReply(message.id)}    key="1"  className="message-menu-option"><div><RollbackOutlined className="message-menu-icon"/>Reply</div></div>
            <div onClick={()=>handleCopyText(message.id)} key="2"  className="message-menu-option"><div><CopyOutlined className="message-menu-icon"/>CopyText</div></div>
            <div onClick={()=>handlePin(message.id)}      key="3"  className="message-menu-option"><div><PushpinOutlined className="message-menu-icon"/>Pin</div></div>
            <div onClick={()=>handleForward(message.id)}  key="4"  className="message-menu-option"><div><ArrowLeftOutlined className="message-menu-icon"/>Forward</div></div>
            <div onClick={()=>handleSelect(message.id)}   key="6"  className="message-menu-option"><div><CheckCircleOutlined className="message-menu-icon"/> Select</div></div>
        </div>
    );

    return(
        <React.Fragment>
            <Modal
              visible={editeModalVisibilty}
              title="Edit Message"
              onCancel={()=>setEditeModalVisibilty(false)}
              footer={[
                <Button onClick={()=>setEditeModalVisibilty(false)} className="edit-footer-buton cancel-edit-btn" key="cancel-edit">cancel</Button>,
                <Button onClick={()=>handleEditSubmit(message.id)} className="edit-footer-buton sumbit-edit-btn" key="sumbit-edit">Edit</Button>,

              ]}
            >
                <Input defaultValue={messageCurrentText} ref={editInputRef} />

            </Modal>

            <Row className={message.user==props.user.pk ? "message-col right-side-message" : "message-col left-side-message"}>
                <Col>
                    <Popover
                        placement={message.user===props.user.pk ? "left" : "right"}
                        content={message.user===props.user.pk ? messageOption1 : messageOption2}
                        trigger="click"
                        ref={popOverRef}
                        visible={popOverVisiblity}
                        onVisibleChange={handlePopover}
                    >
                        <Row className="message-self-col" onClick={handlePopover}>
                            <Col lg={24} className="message-text" ref={messageTextEdit}>{message.text}</Col>
                            <Col lg={10} className="message-time">{message.time}</Col>
                            <Col style={{textAlign:"center", width:"20px", }}>{message.edited?<EditOutlined />:null}</Col>
                        </Row>
                    </Popover>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default MessageFormat;
