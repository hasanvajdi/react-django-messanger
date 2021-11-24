import {useEffect, useState} from 'react';
import {Container, Row, Col, UncontrolledTooltip} from 'reactstrap';
import {Modal} from 'antd';
import './../static/css/Home.css';
import { BsTextLeft, BsFillPersonFill, BsFillPeopleFill, BsMegaphoneFill, BsPlusLg, BsFillPersonCheckFill } from "react-icons/bs";
import { AiFillRobot } from "react-icons/ai";
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Groups, GroupsModal} from './Groups'


const Home = (props)=>{
    const cookies = new Cookies();
    const [chats, setChats] = useState();
    const [type, setType] = useState();
    const [groupIsOpen, setGroupIsOpen] = useState(false)



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


    const createNewGroup = ()=>{
        setGroupIsOpen(true)
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
                        <BsMegaphoneFill id = "channel-tooltip" className = "category-icon"/>
                        <AiFillRobot id = "robot-tooltip" className = "category-icon"/>
                    </Col>

                    <Col lg = "10" className = "dialogs">
                        <GroupsModal groupIsOpen = {groupIsOpen} setGroupIsOpen = {setGroupIsOpen}/>


                        {
                            type ? (type == "privates"?(<p>start new chat</p>):(<p className = "plus-news-group-channel" onClick = {createNewGroup}>
                                                                                    <BsPlusLg style = {{color : "#444444;", fontSize : "17px"}}/>
                                                                                    <span className = "new-group-channel">create new {type}
                                                                                    </span>
                                                                                </p>))
                                                                                : ('')

                        }
                        {
                            chats && chats.map((item, key)=>{
                                return <Groups group = {item}/>
                            })
                        }
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
