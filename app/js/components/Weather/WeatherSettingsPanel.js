import React from 'react';

import WeatherSettingsBackButton from './WeatherSettingsBackButton';
import WeatherSettingsForm from './WeatherSettingsForm';

const WeatherSettingsPanel = function(props) {
	return (
		<div className="weather__panel  weather__panel--settings">
			<WeatherSettingsBackButton onBackClicked={props.onBackClicked} />
			<WeatherSettingsForm />
		</div>
	);
};

export default WeatherSettingsPanel;