import React from 'react';
import './LoadingIndicator.scss';

const CircleLoadingIndicator = (props) => {
	let styles = {
		color: props.color,
		width: props.size,
		height: props.size,
		borderWidth: props.thickness
	};

	return (
		<div className="loading-indicator loading-indicator--circle" style={ styles }></div>
	);
};

export default CircleLoadingIndicator;