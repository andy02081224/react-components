import React from 'react';

const SiteHeaderLogo = (props) => {
	return (
		<div className="site-header__logo">
			<a href="#"><img src={props.logoPath} alt="site logo" /></a>
		</div>
	);
};

export default SiteHeaderLogo;