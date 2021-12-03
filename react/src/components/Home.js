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



const Home = (props)=>{
    const cookies = new Cookies();
    const [chats, setChats] = useState();
    const [type, setType] = useState();
    const [groupIsOpen, setGroupIsOpen] = useState(false)
    const [channelIsOpen, setChannelIsOpen] = useState(false)


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
                setType("channel")
            })
            .catch(err=>{
                console.log("channel eroror")
                console.log(err.response)
            })

    }

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
        })
        .catch(err=>{
            console.log("errrrrror")
        })
    }


    const createNewGroupChannel = ()=>{
        if (type == "group"){
            setGroupIsOpen(true)
        }
        else if (type == "channel"){
            setChannelIsOpen(true   )
        }
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
                        <BsFillPersonCheckFill id = "your-username" style = {{fontSize : "25px"}}/> <span style = {{fontSize : "24px", marginLeft : "3px"}}></span>
                    </Col>
                </Row>

                <Row className = "dialogs-category-box">
                    <Col lg = "2" className = "categorys">
                        <UncontrolledTooltip placement="top"target="private-tooltip">pivate chats</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top"target="group-tooltip">groups</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top"target="channel-tooltip">channels</UncontrolledTooltip>
                        <UncontrolledTooltip placement="top"target="robot-tooltip">bots</UncontrolledTooltip>

                        <BsFillPersonFill id = "private-tooltip" className = "category-icon"/>
                        <BsFillPeopleFill id = "group-tooltip" className = "category-icon" onClick={GroupsChats}/>
                        <BsMegaphoneFill id = "channel-tooltip" className = "category-icon" onClick={ChannelChats}/>
                        <AiFillRobot id = "robot-tooltip" className = "category-icon"/>
                    </Col>

                    <Col lg = "10" className = "dialogs">
                            {
                                type === "channel" && <ChannelsModal setChats = {setChats} user = {props.user} channelIsOpen = {channelIsOpen} setChannelIsOpen = {setChannelIsOpen}/>
                                || type === "group" && <GroupsModal setChats = {setChats} user = {props.user} groupIsOpen = {groupIsOpen} setGroupIsOpen = {setGroupIsOpen}/>

                            }




                            {
                                type ? (type == "privates"?(<p>start new chat</p>):(<p className = "plus-news-group-channel" onClick = {createNewGroupChannel}>
                                                                                        <BsPlusLg style = {{color : "#444444;", fontSize : "17px"}}/>
                                                                                        <span className = "new-group-channel">create new {type}
                                                                                        </span>
                                                                                    </p>))
                                                                                    : (null)

                            }

                            <div >
                                {
                                    chats && chats.map((item, key)=>{
                                        return type === "group" && <Groups group={item} key={key} />||
                                        type === "channel" && <Channels channel={item} key={key} />
                                    })
                                }
                            </div>
                    </Col>
                </Row>

            </Row>


            <Row className = "chat-box">

            </Row>


            <Row className = "imoji">
            </Row>




        </Container>
    )
}


export default Home;
