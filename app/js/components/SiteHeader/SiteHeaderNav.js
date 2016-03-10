import React from 'react';

const SiteHeaderNav = (props) => {

	function renderNavItems() {
		var navItems = [];

		props.navItems.forEach((item) => {
			navItems.push(<li><a href={item.link}>{item.name}</a></li>);
		});

		return navItems;
	}

	return (
		<nav className="site-header__nav">
			<input type="checkbox" id="site-header__menu-toggle" />
			<label htmlFor="site-header__menu-toggle">menu</label>
			<ul>
				{renderNavItems()}
			</ul>
		</nav>
	);
};

export default SiteHeaderNav;