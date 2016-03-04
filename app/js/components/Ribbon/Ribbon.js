import React from 'react';
import './Ribbon.scss';

const Ribbon = (props) => {
	return (
		<div className={'ribbon' + (props.color ? ' ribbon--' + props.color : '')}>
			<span>{props.title}</span>
		</div>
	);
};

export default Ribbon;