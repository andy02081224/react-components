import React from 'react';

const WeatherSettingsPanel = (props) => {
	return (
		<div className="weather__panel  weather__panel--settings" onClick={props.onBackClicked}>WeatherSettingsPanel</div>
	);
};

export default WeatherSettingsPanel;