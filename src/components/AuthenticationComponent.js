import { Row, Col } from "antd";
import React from "react";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";

function AuthenticationComponent(props) {
    return (
        <div>
            <Row>
                <Col span={12}>
                    <SignupComponent handleLogout={props.handleLogout}/>
                </Col>
                <Col span={12}>
                    <LoginComponent 
                        handleLogin={props.handleLogin}
                        handleLoginChange={props.handleLoginChange}
                        username={props.username}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default AuthenticationComponent;