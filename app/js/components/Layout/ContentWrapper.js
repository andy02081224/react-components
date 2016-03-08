import React from 'react';
import './ContentWrapper.scss';

const ContentWrapper = (props) => {
	let verticalCentered = '';

	if (props.verticalCentered.toLowerCase() == 'true') {
		verticalCentered = ' vertical-centered';
	}

	return (
		<div className={`content-wrapper${verticalCentered}`}>
			{props.children}
		</div>
	);
};

export default ContentWrapper;