import React from 'react';
import './Login.scss';

import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';

class Login extends React.Component {
	render() {
		return (
			<div className="login-box">
				<LoginHeader title="React Components" />
				<LoginForm />
			</div>
		);
	}
}

export default Login;