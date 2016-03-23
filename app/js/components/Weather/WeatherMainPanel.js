import React from 'react';

import WeatherInfo from './WeatherInfo';
import WeatherMenu from './WeatherMenu';

const WeatherMainPanel = (props) => {
	return (
		<div className="weather__panel weather__panel--main">
			<WeatherMenu onSettingsClicked={props.onSettingsClicked} />
			<WeatherInfo />
		</div>
	);
};

export default WeatherMainPanel;