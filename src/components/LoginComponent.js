import React, {useState} from "react";
import { Form, Input, Button, Card } from 'antd';
import "./authStyles.css";

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
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
function LoginComponent(props) {
        let [password, setPassword] = useState("");
        return (
        <div>
            <Card title="Existing Users (Login)" className="form-layout">
                <Form
                {...layout}
                name="basic"
                initialValues={{
                remember: true,
                }}
              //   onFinish={e => props.handleLogin(e, {
              //     username : props.username, 
              //     password : password
              // })}
              onFinish={props.handleLogin}
                onFinishFailed={()=> {}}
            >
                <Form.Item
                label="Username"
                name="username"
                id="username"
                onChange={props.handleLoginChange}
                value={props.username}
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
                onChange={(event) => {setPassword(event.target.value)}}
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </Card>
          </div>
        )
}

export default LoginComponent;