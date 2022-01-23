import {useEffect, useState} from 'react';
import {Container, Row, Col, UncontrolledTooltip} from 'reactstrap';
import {Modal} from 'antd';
import './../static/css/Home.css';
import { BsTextLeft, BsFillPersonFill, BsFillPeopleFill, BsMegaphoneFill, BsPlusLg, BsFillPersonCheckFill } from "react-icons/bs";
import { AiFillRobot } from "react-icons/ai";
import axios from 'axios';
import Cookies from 'universal-cookie';


import {Groups, GroupsModal} from './chats/Groups';
import {Channels, ChannelsModal} from './chats/Channels';
import {Privates, PrivatesModal} from './chats/Privates';
import ChatBox from './ChatBox';



const Home = (props)=>{
    const cookies = new Cookies();
    const [chats, setChats] = useState();
    const [type, setType] = useState();

    const [chatSocket, setChatSocket] = useState();
    const [groupIsOpen, setGroupIsOpen] = useState(false)
    const [channelIsOpen, setChannelIsOpen] = useState(false)
    const [privateIsOpen, setPrivateIsOpen] = useState(false)
    const [selectedChat, setSelectedChat] = useState();


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

        let access_token = cookies.get("access")
        axios.get(selectedChatUrl, {
            headers : {
                "Authorization": 'Bearer ' + access_token,
            }
        })
        .then(res_selectedchat=>{
            //getting user profile to showing in chat box
            axios.get(`http://localhost:8000/chat/profile/${res_selectedchat.data.id}/`,{
                headers : {
                    "Authorization": 'Bearer ' + access_token,
                }
            })
            .then(res_selectedprofile=>{
                console.log("res ", res_selectedprofile.data)
                console.log("user : ", props.user)
                setSelectedChat(res_selectedprofile.data);
            })
        })
    }

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
                        <UncontrolledTooltip placement="top"target="private-tooltip">pivate chats</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top"target="group-tooltip">groups</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top"target="channel-tooltip">channels</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top"target="robot-tooltip">bots</UncontrolledTooltip>

                        <BsFillPersonFill id = "private-tooltip" className = "category-icon" onClick={PrivateChats}/>
                        <BsFillPeopleFill id = "group-tooltip" className = "category-icon" onClick={GroupsChats}/>
                        <BsMegaphoneFill id = "channel-tooltip" className = "category-icon" onClick={ChannelChats}/>
                        <AiFillRobot id = "robot-tooltip" className = "category-icon"/>
                    </Col>

                    <Col lg = "10" className = "dialogs">
                            {
                                type === "channel" && <ChannelsModal setChats = {setChats} user = {props.user} channelIsOpen = {channelIsOpen} setChannelIsOpen = {setChannelIsOpen}/>
                                || type === "group" && <GroupsModal setChats = {setChats} user = {props.user} groupIsOpen = {groupIsOpen} setGroupIsOpen = {setGroupIsOpen}/>
                                || type === "private" && <PrivatesModal privateIsOpen={privateIsOpen} setPrivateIsOpen={setPrivateIsOpen} />

                            }

                            {
                                type ?
                                (type === "private"?(<p onClick={createNewGroupChannel} className = "new-group-channel"> <BsPlusLg style = {{color : "#444444;", fontSize : "17px"}}/> start new chat</p>)
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
