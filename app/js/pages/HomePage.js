import React from 'react';
import { Link } from 'react-router';

import '../../styles/pages/home-page.scss';

const HomePage = () => {
	return (
		<div className="home-page">
			<div className="home-page-title">React Demo</div>
			<section className="home-page-section home-page-section--top"><Link to="/detail">Detail</Link></section>
			<section className="home-page-section home-page-section--bottom"><Link to="/demo">Demo</Link></section>
		</div>
	);
};

export default HomePage;