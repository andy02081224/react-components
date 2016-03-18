import React from 'react';
import auth from '../../util/auth';
import { Link } from 'react-router';
import { CircleLoadingIndicator } from '../LoadingIndicator';

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			currentlyLoading: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="error-message-wrapper" ref="loginErrorMessage">
					<p className="error-message error-message--missing-required">Missing required fields</p>
					<p className="error-message error-message--invalid-info">Invalid username or password</p>
				</div>
				<div className="form-group">
					<input type="text" placeholder="Username (abc)" className="login-box__input-username" ref="loginUsernameInput" />
					<input type="password" placeholder="Password (123)" className="login-box__input-password" ref="loginPasswordInput" />
				</div>
				<div className="form-group login-box__other-actions">
					<ul>
						<li><Link to="/detail">Forgot password?</Link></li>
						<li><Link to="/detail">Don't have an account?</Link></li>
					</ul>
				</div>
				<button type="submit">
					{this.state.currentlyLoading ? (
						<CircleLoadingIndicator color="white" size="30px" thickness="4px" />
						) : (
							'Login'
						)}
					</button>
			</form>
		);
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({
			currentlyLoading: true
		});

		let errorMessages = Array.from(this.refs.loginErrorMessage.querySelectorAll('.error-message'));
		let username = this.refs.loginUsernameInput.value;
		let password = this.refs.loginPasswordInput.value;

		// Hide previously showed error message
		errorMessages.forEach(message => message.style.display = 'none');

		auth.login(username, password)
			.then((response) =>  {
				this.setState({
					currentlyLoading: false
				});
				
				if (response.authenticated) {
					alert('authenticated');
				}
				else {
					throw new Error(response.type);
				}
			})
			.catch((error) => {
				let errorMessage = this.refs.loginErrorMessage.querySelector(`.error-message--${error.message}`);
				errorMessage.style.display = 'block';
			});
	}

}

export default LoginForm;