import React from 'react';

class LoginForm extends React.Component {

	constructor(props) {
		super(props);

		this.onUserLogin = this.onUserLogin.bind(this);
	}

	render() {
		return (
			<form action="#">
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
				<button type="submit" onClick={this.onUserLogin}>Login</button>
			</form>
		);
	}

	onUserLogin(e) {
		e.preventDefault();
		alert(`username: ${this.refs.loginUsernameInput.value}
			password: ${this.refs.loginPasswordInput.value}`);
	}

}

export default LoginForm;