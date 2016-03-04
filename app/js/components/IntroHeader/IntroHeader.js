import React from 'react';
import './IntroHeader.scss';
import headerImageSrc from '../../../img/react-logo.svg';

const IntroHeader = (props) => {
	return (
		<header className="intro-header">
			<h1 className="intro-header__title">{props.title}</h1>
			<h2 className="intro-header__subtitle">{props.subtitle}</h2>
			<p className="intro-header__image">
				<img src={headerImageSrc} alt />
			</p>
		</header>
	);
};

export default IntroHeader;