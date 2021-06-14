import React, {useEffect, useState} from "react";
import { Form, Input, Button, Card, Upload } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Table, Tag, Space } from 'antd';
import Axios from 'axios';

const base_url ="http://127.0.0.1:8000/";

export default function DataList(props) {
    let columns = [
        {
          title: 'UserID',
          dataIndex: 'userId',
          key: 'userId',
        },
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Body',
            key: 'body',
          dataIndex: 'body'
        },
    ];
    let [data, setData] = useState([]);
    let fetchDataFromServer = function() {
        fetch(base_url + 'api/list/', {
			method : 'GET',
			headers : {
                Authorization : `JWT ${localStorage.getItem('token')}`
			},
		})
		.then(response => response.json())
		.then(json => {
            setData(json);
		})
		.catch(error => {
			console.log(error)
		})
    }

    let sendDataToServer = function(data) {
        Axios.post(base_url+ 'api/set_list/', {body: data}, {
            headers: {
                Authorization : `JWT ${localStorage.getItem('token')}`
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            props.handleLogout();
            console.log(error);
        });

    }
    let uploadProps = {
        accept: ".json",
        showUploadList:false ,
        action: base_url+"api/list",
        beforeUpload(file, fileList) {
                let reader = new FileReader();
                reader.readAsText(file);
                reader.onload = () => {
                    sendDataToServer(JSON.parse(reader.result));
                }
            return false;
        }
    }
    // fetchDataFromServer();
    useEffect(()=> {
        fetchDataFromServer();
    }, []);
    return (
        <div>
            <Button type="primary" onClick={props.handleLogout} >
                Logout
            </Button>
            <Form>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="file"
                    // getValueFromEvent={}
                    extra=""
                >
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}