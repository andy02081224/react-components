import React from 'react';
import './SectionWrapper.scss';

const SectionWrapper = (props) => {
	let styles = {};

	if (props.fsImagePath) {
		styles['backgroundImage'] = `url('${props.fsImagePath}')`;
	}

	return (
		<div className="section-wrapper" style={styles}>{props.children}</div>
	);
};

export default SectionWrapper;