import {useState} from 'react';
import {Modal, Form, Input, Space, Row, Col, Image} from 'antd';
import {AudioOutlined} from '@ant-design/icons';
import './../../static/css/Privates.css'
import axios from 'axios';
import Cookies from 'universal-cookie';



const Privates = (props)=>{
    const AvatarUrl = `http://localhost:8000${props.private.avatar}`

    const getKey = ()=>{
        props.setSelectedChat(props.private.id)
    }


    return(
        <Row style = {{marginTop : "12px"}} onClick={getKey}>
            <Col lg={6} >
                {
                    props.private.avatar &&
                    props.private.avatar != null?
                    <Image className = "group-avatar" src = {AvatarUrl}/>
                    :<div className = "group-avatar" style = {{backgroundColor : "#444444"}}></div>
                }
            </Col>

            <Col  lg={18} className = "group-name-col">
                <span className = "group-name">{props.private.username}</span>
            </Col>
        </Row>

    )
}


const PrivatesModal = (props)=>{
    const [searchUsername, setSearchUsername] = useState();
    const [users, setUsers] = useState();

    const cookies = new Cookies();


    const searchUser = (se)=>{
        if (se.target.value.length === 0)
        {
            setUsers(null)
        }
        else{
            setSearchUsername(se.target.value)
            var access_token = cookies.get("access")
            axios.get(`http://localhost:8000/chat/users/?search=${searchUsername}`, {
                headers : {
                    "Authorization": 'Bearer ' + access_token,
                }
            })
            .then(res_usersearch=>{
                setUsers(res_usersearch.data)
            })
        }
    }

    return(
        <Modal className = "create-group-modal" title="find your friends" visible={props.privateIsOpen} footer = {null} onCancel={()=>{props.setPrivateIsOpen(false)}}>
            <Row className = "user-search-row" >
                <Col md={24} lg={24}>
                    <Space className = "search-tag">
                        <Input.Search placeholder="search" onChange = {searchUser} />
                    </Space>
                </Col>
                <Col>
                    {
                        users && users.map((item, key)=>{
                            return <p>{item.username}</p>
                        })
                    }
                </Col>
            </Row>
        </Modal>
    )
}

export {Privates, PrivatesModal}
