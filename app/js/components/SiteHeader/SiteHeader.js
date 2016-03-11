import React from 'react';

import './SiteHeader.scss';

import SiteHeaderLogo from './SiteHeaderLogo';
import SiteHeaderNav from './SiteHeaderNav';

class SiteHeader extends React.Component {
	render() {
		return (
			<header className="site-header">
				<SiteHeaderLogo siteLogoPath={this.props.siteLogoPath} siteTitle={this.props.siteTitle} />
				<SiteHeaderNav navItems={this.props.navItems} />
			</header>
		);
	}
}

export default SiteHeader;