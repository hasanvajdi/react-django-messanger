import React, {useState} from 'react';
import '../static/css/Groups.css';
import {BsPlusLg} from "react-icons/bs";
import {Modal, Form, Input, Upload, Button, Image} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import Cookies from 'universal-cookie';



function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


const Groups = (props)=>{

    return(
        <React.Fragment>
            <Image
                width = {50}
                
            />
            <p className = "group-name">{props.group.name}</p>
        </React.Fragment>


    )
}

const GroupsModal = (props)=>{
    const [fileList, setFileList] = useState()
    const cookies = new Cookies();


    const submitForm = (e)=>{
        if(e["name"]){
            if(fileList.fileList){
                e.avatar = fileList.fileList
            }
            console.log(fileList)
            e.owner = props.user.pk
            const access_token = cookies.get("access")
            axios.post("http://127.0.0.1:8000/chat/groups/", e, {
                header : {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" : 'Bearer' + access_token,
                }
            })
            .then(res_newgroup=>{
                console.log("res_newgroup : ", res_newgroup)
            })
            .catch(err_newgroup=>{
                console.log(err_newgroup.response)
            })
        }

    }

    const normFile=  (e)=>{
        console.log("normFile :", e)
    }

    const handlePreview = async file => {
       if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj);
    }}

    const uploadButton = (
      <div>
          <BsPlusLg />
          <div style={{ marginTop: 8,fontSize: "20px" }}>Upload</div>
      </div>
    );

    const handleChange = (image) => {
        setFileList(image.file)
    }


    return(
        <Modal className = "create-group-modal" title="create new group" visible={props.groupIsOpen} footer = {null} onCancel={()=>{props.setGroupIsOpen(false)}}>
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
                    <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                    >
                            {fileList ? null : uploadButton}
                    </Upload>
                </Form.Item>

                <Button className="group-submit-button" htmlType = "submit" block>
                    submit
                </Button>
            </Form>
        </Modal>
    )
}

export {Groups, GroupsModal};
