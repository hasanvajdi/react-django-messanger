import React, {useState} from 'react';
import '../static/css/Groups.css';
import {BsPlusLg} from "react-icons/bs";
import {Modal, Form, Input, Upload, Button} from 'antd';
import 'antd/dist/antd.css';

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
            <p className = "group-name">{props.group.name}</p>
        </React.Fragment>


    )
}

const GroupsModal = (props)=>{
    const [fileList, setFileList] = useState()
    console.log("filelist :", fileList)
    const submitForm = (e)=>{
        console.log(e)
    }

    const normFile=  (e)=>{
        console.log("e : ", e)
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

    const handleChange = ({ fileList }) => setFileList({ fileList });


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
                    name = {"group-name"}
                    rule = {[
                        {required : true}
                    ]}
                >
                    <Input placeholder = "enter group name" className = "group-name-input"/>
                </Form.Item>


                <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        className = "upload-input"
                >
                    <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                    >
                            {fileList&&fileList.fileList.length == 1 ? null : uploadButton}
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
