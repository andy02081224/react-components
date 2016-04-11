import React from 'react';

class SiteHeaderNav extends React.Component {
	constructor(props) {
		super(props);

		this.renderNavItems = this.renderNavItems.bind(this);
	}

	render() {
		return (
			<nav className="site-header__nav">
				<input type="checkbox" id="site-header__menu-toggle" />
				<label htmlFor="site-header__menu-toggle"><span></span></label>
				<ul ref="siteHeaderMenu">
					{this.renderNavItems()}
				</ul>
			</nav>
		);
	}

	renderNavItems() {
		var navItems = [];

		this.props.navItems.forEach((item) => {
			navItems.push(<li key={item.id}><a href={item.link}>{item.name}</a></li>);
		});

		return navItems;
	}
}

export default SiteHeaderNav;