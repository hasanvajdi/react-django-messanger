import React, {useState, useRef} from 'react';
import '../../static/css/Groups.css';
import {BsPlusLg} from "react-icons/bs";
import {Modal, Form, Input, Upload, Button, Image, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import axios, * as other from 'axios';
import Cookies from 'universal-cookie';
import { AiOutlineCloudUpload } from "react-icons/ai";



const Channels = (props)=>{
    const AvatarUrl = `http://localhost:8000${props.channel.avatar}`
    return(
        <React.Fragment>
            <Row style = {{marginTop : "12px"}}>

                <Col lg={6} >
                    {
                        props.channel.avatar &&
                        props.channel.avatar != null?
                        <Image className = "group-avatar" src = {AvatarUrl}/>
                        :<div className = "group-avatar" style = {{backgroundColor : "#444444"}}></div>
                    }
                </Col>

                <Col  lg={18} className = "group-name-col">
                    <span className = "group-name">{props.channel.name}</span>
                </Col>
            </Row>


        </React.Fragment>
    )
}



const ChannelsModal = (props)=>{
    const [fileList, setFileList] = useState()
    const [fileName, setFileName] = useState();
    const cookies = new Cookies();


    const submitForm = (e)=>{
        const formData = new FormData();
        if(e["name"]){
            if(fileList){
                formData.append("avatar", fileList)
            }
            formData.append("owner", props.user.pk)
            formData.append("name", e.name)

            const access_token = cookies.get("access")

            axios.post("http://127.0.0.1:8000/chat/channels/", formData, {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization" : 'Bearer' + access_token
                }
            })

            .then(res_newgroup=>{
                axios.get("http://127.0.0.1:8000/chat/channels/",{
                    headers : {
                            "Authorization": 'Bearer ' + access_token,
                        }
                })
                .then(res_group=>{
                    props.setChats(res_group.data)
                })
                .catch(res_group_err=>{
                    console.log("res_group_err :", res_group_err.response)
                })
            })
            .catch(err_newgroup=>{
                console.log("err_newgroup", err_newgroup)
            })
        }

    }

    const normFile=  (e)=>{
        console.log("normFile :", e)
    }



    const uploadButton = (
      <div>
          <BsPlusLg />
          <div style={{ marginTop: 8,fontSize: "20px" }}>Upload</div>
      </div>
    );

    const handleChange = (image) => {
        console.log("image : ", image.target.files[0])
        setFileName(image.target.files[0].name)
        setFileList(image.target.files[0])
    }


    return(
        <Modal className = "create-group-modal" title="create new channel" visible={props.channelIsOpen} footer = {null} onCancel={()=>{props.setChannelIsOpen(false)}}>

            <Form
                name = "create-new-group"
                onFinish = {submitForm}
                layout = {"vertical"}
                className = "create-new-group"
            >
                <Form.Item
                    className = "group-name-label"
                    name = "name"
                    rule = {[
                        {required : true,},
                    ]}
                >
                    <Input placeholder = "enter group name" className = "group-name-input"/>
                </Form.Item>


                <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        className = "upload-input"
                >
                    <label onChange = {handleChange} for = "select-group-avatar" className = "select-group-avatar-label">
                        <AiOutlineCloudUpload />
                        {fileName? fileName: <span>upload avatar </span>}
                    </label>
                    <input id = "select-group-avatar" name = "file" type = "file" onChange = {handleChange} style = {{display : "none"}}/>
                </Form.Item>

                <Button className="group-submit-button" htmlType = "submit" block>
                    submit
                </Button>
            </Form>
        </Modal>
    )
}

export {Channels, ChannelsModal};
