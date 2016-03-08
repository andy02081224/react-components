import React from 'react';
import './Login.scss';

import LoginHeader from './LoginHeader';

class Login extends React.Component {
	render() {
		return (
			<div className="login-box">
				<LoginHeader title="React Components" />
				<form>
					<div className="form-group">
						<input type="text" placeholder="Username" className="login-box__username" />
						<input type="password" placeholder="Password" className="login-box__password" />
					</div>

					<button type="submit">Login</button>
				</form>
			</div>
		);
	}
}

export default Login;