import React from 'react';

import './SiteHeader.scss';

import SiteHeaderLogo from './SiteHeaderLogo';
import SiteHeaderNav from './SiteHeaderNav';

class SiteHeader extends React.Component {
	render() {
		return (
			<header className="site-header">
				<SiteHeaderLogo logoPath={this.props.logoPath} />
				<SiteHeaderNav navItems={this.props.navItems} />
			</header>
		);
	}
}

export default SiteHeader;