import React from 'react';
import auth from '../../util/auth';

class LoginForm extends React.Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="error-message-wrapper" ref="loginErrorMessage">
					<p className="error-message error-message--missing-required">Missing required values</p>
					<p className="error-message error-message--invalid-info">Invalid username or password</p>
				</div>
				<div className="form-group">
					<input type="text" placeholder="Username" className="login-box__input-username" ref="loginUsernameInput" />
					<input type="password" placeholder="Password" className="login-box__input-password" ref="loginPasswordInput" />
				</div>
				<div className="form-group login-box__other-actions">
					<ul>
						<li><a href="#">Forgot password?</a></li>
						<li><a href="#">Don't have an account?</a></li>
					</ul>
				</div>
				<button type="submit">Login</button>
			</form>
		);
	}

	handleSubmit(e) {
		e.preventDefault();

		let errorMessages = Array.from(this.refs.loginErrorMessage.querySelectorAll('.error-message'));
		let username = this.refs.loginUsernameInput.value;
		let password = this.refs.loginPasswordInput.value;

		// Hide previously showed error message
		errorMessages.forEach(message => message.style.display = 'none');

		auth.login(username, password)
			.then((response) =>  {
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