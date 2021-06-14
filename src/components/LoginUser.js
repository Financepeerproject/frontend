import React, { Component } from 'react'
import {Row} from 'reactstrap';
import { Form, Input, Button, Checkbox, Card } from 'antd';


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

const onFinish = () => {};


class LoginUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password : ''
        }
    }
    handlePasswordChange = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    render() {
        return (
            <div>
            <Card title="Existing Users (Login)" className="form-layout">
                <Form
                {...layout}
                name="basic"
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={()=> {}}
                onSubmit={e => this.props.handleLogin(e, {
                            username : this.props.username, 
                            password : this.state.password
                        })}
            >
                <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input your email!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
        
                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>
        
                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
                </Form.Item>
        
                <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </Card>
          </div>
            // <div>
            //     <form onSubmit={e => this.props.handleLogin(e, {
            //         username : this.props.username, 
            //         password : this.state.password
            //     })} >
            //         <Row>
            //             <label htmlFor="username" >Username</label>
            //             <input type="text"
            //             onChange={this.props.handleLoginChange} 
            //             value={this.props.username} 
            //             name="username"
            //             id="username"
            //             placeholder="Username" />
            //         </Row>
            //         <Row>
            //             <label htmlFor="password" >Password</label>
            //             <input type="password"
            //             onChange={this.handlePasswordChange} 
            //             value={this.state.password} 
            //             name="password"
            //             id="password"
            //             placeholder="Password" />
            //         </Row>
            //         <button type='submit'>Login</button>
            //     </form>
            // </div>
        )
    }
}

export default LoginUser;