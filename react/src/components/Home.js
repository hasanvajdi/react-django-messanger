import React, {useEffect, useState} from 'react';
import {Container, Row, Col, UncontrolledTooltip} from 'reactstrap';
import {Modal} from 'antd';
import './../static/css/Home.css';
import { BsTextLeft, BsFillPersonFill, BsFillPeopleFill, BsMegaphoneFill, BsPlusLg, BsFillPersonCheckFill } from "react-icons/bs";
import { AiFillRobot } from "react-icons/ai";
import axios from 'axios';
import Cookies from 'universal-cookie';
import {BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';

import {Groups, GroupsModal} from './chats/Groups';
import {Channels, ChannelsModal} from './chats/Channels';
import {Privates, PrivatesModal} from './chats/Privates';
import ChatBox from './ChatBox';
import UserCheck from './UserCheck';    

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';








const actions = [
    { icon: <BsFillPersonFill />, name: 'private' },
    { icon: <BsFillPeopleFill />, name: 'group' },
    { icon: <BsMegaphoneFill />, name: 'Share' },
];



const Home = (props)=>{
    const cookies = new Cookies();
    const [chats, setChats] = useState();
    const [type, setType] = useState();

    const [chatSocket, setChatSocket] = useState();
    const [groupIsOpen, setGroupIsOpen] = useState(false)
    const [channelIsOpen, setChannelIsOpen] = useState(false)
    const [privateIsOpen, setPrivateIsOpen] = useState(false)
    const [selectedChat, setSelectedChat] = useState();
    const [chatTypeValue, setChatTypeValue] = useState();

    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const [direction, setDirection] = React.useState('up');

    const GroupsChats = ()=>{
        let access_token = cookies.get("access");
        axios.get("http://127.0.0.1:8000/chat/groups/",{
            headers : {
                    "Authorization": 'Bearer ' + access_token,
                }
        })
        .then(res=>{
            setChats(res.data)
            setType("group")
            var chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/?${props.user.pk}`);
            setChatSocket(chatSocket)
        })
        .catch(err=>{
            console.log("errrrrror")
        })
    }

    const ChannelChats = ()=>{
        setType("channel")
        let access_token = cookies.get("access");
            axios.get("http://127.0.0.1:8000/chat/channels/",{
                headers : {
                        "Authorization": 'Bearer ' + access_token,
                    }
            })
            .then(res=>{
                setChats(res.data)
                var chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/?${props.user.pk}`);
                setChatSocket(chatSocket)
            })
            .catch(err=>{
                console.log("channel eroror")
                console.log(err.response)
            })

    }

    const PrivateChats = ()=>{
        <UserCheck />
        setType("private")
        let access_token = cookies.get("access");
        axios.get("http://127.0.0.1:8000/chat/users/",{
            headers : {
                    "Authorization": 'Bearer ' + access_token,
                }
        })
        .then(res=>{
            setChats(res.data)
            setType("private")
            var chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/?${props.user.pk}`);
            setChatSocket(chatSocket)

        })
        .catch(err=>{
            console.log("private eroror")
            console.log(err.response)
        })
    }

    const createNewGroupChannel = ()=>{
        if (type == "group"){
            setGroupIsOpen(true)
        }
        else if (type == "channel"){
            setChannelIsOpen(true   )
        }
        else if (type === "private"){
            setPrivateIsOpen(true)
        }
    }

    const selectedChatFunc = (chat)=>{
        var selectedChatUrl=null
        if(type === "private"){
            selectedChatUrl = `http://localhost:8000/chat/users/${chat}/`
        }else{selectedChatUrl = `http://localhost:8000/chat/${type}/${chat}/`}
        console.log('chat : ', selectedChatUrl)
        let access_token = cookies.get("access")
        axios.get(selectedChatUrl, {
            headers : {
                "Authorization": 'Bearer ' + access_token,
            }
        })
        .then(res_selectedchat=>{
            console.log(res_selectedchat.data)

            //getting user profile to showing in chat box
            axios.get(`http://localhost:8000/chat/profile/${res_selectedchat.data.id}/`,{
                headers : {
                    "Authorization": 'Bearer ' + access_token,
                }
            })

            .then(res_selectedprofile=>{
                setSelectedChat(res_selectedprofile.data);
            })
        })
    }

    const chatTypeHandleChange = (e, chatType)=>{
        setChatTypeValue(chatType)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return(
        <Container className = "main-chat-container" fluid>
            <Row className = "dialogs-category">
                <Row className = "header-row">
                    <Col lg = "2" className = "header-icon-col">
                        <BsTextLeft />
                    </Col>
                    <div className = "header-divider"></div>
                    <Col lg = "9" className = "header-username-col">
                        <UncontrolledTooltip placement="top"target="your-username">your username</UncontrolledTooltip>
                        <BsFillPersonCheckFill id = "your-username" style = {{fontSize : "25px"}}/> <span style = {{fontSize : "24px", marginLeft : "8px"}}>{props.user && props.user.username}</span>
                    </Col>
                </Row>

                <Row className = "dialogs-category-box">
                    <Col lg = "2" className = "categorys">
                        <UncontrolledTooltip placement="top" target="private-tooltip">pivate chats</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top" target="group-tooltip">groups</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top" target="channel-tooltip">channels</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top" target="robot-tooltip">bots</UncontrolledTooltip>


                        <BottomNavigation value={chatTypeValue} onChange={chatTypeHandleChange} className={"chat-type"}>
                            <BottomNavigationAction value="private" icon={<BsFillPersonFill id = "private-tooltip" className = "category-icon" onClick={PrivateChats}/>} />
                            <BottomNavigationAction value="group" icon={<BsFillPeopleFill id = "group-tooltip" className = "category-icon" onClick={GroupsChats}/>} />
                            <BottomNavigationAction value="channel" icon={<BsMegaphoneFill id = "channel-tooltip" className = "category-icon" onClick={ChannelChats}/>} />
                            <BottomNavigationAction value="bot" icon={<AiFillRobot id = "robot-tooltip" className = "category-icon"/> } />
                        </BottomNavigation>
                        
                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            hidden={hidden}
                            icon={<SpeedDialIcon />}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            open={open}
                            direction={direction}
                            className="create-chat-button"
                            >

                            {
                                actions.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        onClick={handleClose}
                                    />
                                ))
                            }
                        </SpeedDial>
                    </Col>

                    <Col lg = "10" className = "dialogs">
                            {
                                type === "channel" && <ChannelsModal setChats = {setChats} user = {props.user} channelIsOpen = {channelIsOpen} setChannelIsOpen = {setChannelIsOpen}/>
                                || type === "group" && <GroupsModal setChats = {setChats} user = {props.user} groupIsOpen = {groupIsOpen} setGroupIsOpen = {setGroupIsOpen}/>
                                || type === "private" && <PrivatesModal privateIsOpen={privateIsOpen} setPrivateIsOpen={setPrivateIsOpen} />

                            }

                            {
                                type ?
                                (type === "private"?(<p onClick={createNewGroupChannel} className = "new-group-channel"></p>)
                                :(<p className = "plus-news-group-channel" onClick = {createNewGroupChannel}>
                                        <BsPlusLg style = {{color : "#444444;", fontSize : "17px"}}/>
                                        <span className = "new-group-channel">create new {type}</span>
                                    </p>
                                ))
                                : (null)

                            }

                            <div>
                                {
                                    chats && chats.map((item, key)=>{
                                        return type === "group" && <Groups setSelectedChat={setSelectedChat} group={item} key={item.group_id}  />||
                                        type === "channel" && <Channels setSelectedChat={setSelectedChat} channel={item} key={item.channel_id}  /> ||
                                        type === "private" && <Privates setSelectedChat={selectedChatFunc} private={item} key={item.id} />
                                    })
                                }
                            </div>
                    </Col>
                </Row>

            </Row>


            <Row className = "chat-box">
                {
                    selectedChat && <ChatBox selectedChat={selectedChat}
                                             user={props.user}
                                             chatSocket={chatSocket}
                                    />
                }

            </Row>


            <Row className = "imoji">
            </Row>




        </Container>
    )
}


export default Home;
