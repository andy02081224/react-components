/* libs */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

/* styles */
import '../styles/app.scss';

/* components */
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import DemoPage from './pages/DemoPage';


ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={HomePage}></Route>
		<Route path="/detail" component={DetailPage}></Route>
		<Route path="/demo" component={DemoPage}></Route>
	</Router>
	), document.getElementById('app'));
