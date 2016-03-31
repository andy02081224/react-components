import React from 'react';

const WeatherSettingsBackButton = function(props) {
	return (
		<div className="weather__settings-back-btn" onClick={props.onBackClicked}>&lt;&nbsp;Back</div>
	);
};

export default WeatherSettingsBackButton;