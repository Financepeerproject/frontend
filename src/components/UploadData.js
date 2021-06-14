import React, { Component } from 'react';
import AuthenticationComponent from './AuthenticationComponent';
import DataList from "./DataList";
import 'antd/dist/antd.css';
const base_url = "http://127.0.0.1:8000/";
class UploadData extends Component {
	constructor(props) {
		super(props)

		this.state = {
			 logged_in : localStorage.getItem('token') ? true : false,
			 username : '',
			 displayed_form : ''
		}
	}

	componentDidMount(){
		if(this.state.logged_in){
			fetch(base_url + 'api/current_user/', {
				method : 'GET',
				headers : {
					Authorization : `JWT ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.json())
			.then(resp => {
				this.setState({ username : resp.username })
			})
			.catch(err => {
				this.handleLogout();
				console.log(err);
			});
		}
	}

	display_form = (formName) => {
        this.setState({
            displayed_form : formName
        });
    }

	handleLoginChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
	}
	
	handleLogout = () => {
		localStorage.removeItem('token');
		this.setState({logged_in : false, username : ''})
	}

	handleLogin = (data) => {
		// e.preventDefault();
		console.log(data)
		fetch(base_url + 'token-auth/', {
			crossDomain : true,
			withCredentials : true,
			async : true,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify(data)
		})
		.then(response => response.json())
		.then(json => {
			localStorage.setItem('token', json.token);
			this.setState({
				logged_in : true,
				username : json.user.username
			})
		})
		.catch(error => {
			this.handleLogout();
			console.log(error)
		})
		this.setState({
			displayed_form : ''
		})
	}
	render() {
		const { logged_in, username, displayed_form } = this.state;
		return (
			<div>
				{/* <NavComponent
				logged_in = {logged_in}
				handleLogin = {this.handleLogin}
				handleLoginChange = {this.handleLoginChange}
				handleLogout = {this.handleLogout}
				username = {username}
				displayed_form = {displayed_form}
				display_form = {this.display_form}
				 />
				<h3>{
					this.state.logged_in
					? `Hello ${this.state.username}`
					: 'Please log in'
				}</h3> */}
                {this.state.logged_in ? <DataList handleLogout={this.handleLogout}/> :  
					<AuthenticationComponent
						handleLogin={this.handleLogin}
						handleLoginChange={this.handleLoginChange}
						username={username}
						handleLogout={this.handleLogout}
					/>}
               
			</div>
		)
	}
}

export default UploadData;