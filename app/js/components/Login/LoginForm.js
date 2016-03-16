import React from 'react';
import auth from '../../util/auth';

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
		let username = this.refs.loginUsernameInput.value;
		let password = this.refs.loginPasswordInput.value;

		alert(`username: ${username}
			password: ${password}`);

		auth.login(username, password)
			.then((response) =>  {
				if (response.authenticated) {
					alert('authenticated');
				}
				else {
					alert('not authenticated');
				}
			})
			.catch();
	}

}

export default LoginForm;