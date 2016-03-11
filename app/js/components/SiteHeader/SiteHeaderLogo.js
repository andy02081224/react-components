import React from 'react';

const SiteHeaderLogo = (props) => {
	let logoImage;

	if (props.siteLogoPath) {
		logoImage = <img src={props.siteLogoPath} alt="site logo" />;
	}

	return (
		<div className="site-header__logo">
			<a href="#">
				{logoImage}
				<span>{props.siteTitle}</span>
			</a>
		</div>
	);
};

export default SiteHeaderLogo;