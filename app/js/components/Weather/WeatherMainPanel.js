import React from 'react';

import WeatherInfo from './WeatherInfo';
import WeatherMenu from './WeatherMenu';

const WeatherMainPanel = (props) => {
	console.log('WeatherMainPanel:', props.weatherData);
	return (
		<div className="weather__panel weather__panel--main">
			<WeatherMenu cityName={props.cityName} onSettingsClicked={props.onSettingsClicked} />
			<WeatherInfo weatherData={props.weatherData} units={props.units} />
		</div>
	);
};

export default WeatherMainPanel;