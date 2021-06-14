import React, { useState } from "react";
import Axios from 'axios';
import { Form, Input, Button, Card } from 'antd';

const base_url ="http://127.0.0.1:8000/";
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    }
};
const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    }
};

const onFinishFailed = () => {};
const onFinish = () => {};
function SignupComponent(props) {
    let [first_name, setFirstName] = useState("");
    let [last_name, setLastName] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let clearForm = function() {
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
    }

    let sendRegistration = function(values) {
        Axios.post(base_url+ 'api/users/create', {
            'user': values
        }).then(response => {
            console.log(response);
        }).catch(error => {
            props.handleLogout();
            console.log(error);
        });

        clearForm();
    }
    return (
        <div>
            <Card title="New Users (Create Account)" className="form-layout">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={sendRegistration}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                    label="First Name"
                    name="first_name"
                    id="first_name"
                    value={first_name}
                    rules={[
                        {
                        required: true,
                        message: 'First Name',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                    label="Last Name"
                    name="last_name"
                    id="last_name"
                    value={last_name}
                    rules={[
                        {
                        required: true,
                        message: 'Last Name',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                    label="Username"
                    name="username"
                    value={username}
                    rules={[
                        {
                        required: true,
                        message: 'Please input your username!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>
            
                    <Form.Item
                    label="Password"
                    name="password"
                    value={password}
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>
            
                    <Form.Item
                    label="Confirm Password"
                    name="confirm_password"
                    rules={[
                        {
                        required: true,
                        message: 'Please reenter your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Create Account
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )

}

export default SignupComponent;