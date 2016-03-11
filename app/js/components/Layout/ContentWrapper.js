import React from 'react';
import './ContentWrapper.scss';

const ContentWrapper = (props) => {
	let verticalCentered = '';

	if (props.verticalCentered && props.verticalCentered.toLowerCase() == 'true') {
		verticalCentered = ' content-wrapper--vertical-centered';
	}

	return (
		<div className={`content-wrapper${verticalCentered}`}>
			{props.children}
		</div>
	);
};

export default ContentWrapper;