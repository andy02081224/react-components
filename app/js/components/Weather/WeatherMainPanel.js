import React from 'react';

import WeatherInfo from './WeatherInfo';
import WeatherMenu from './WeatherMenu';

const WeatherMainPanel = (props) => {
	return (
		<div className="weather__panel weather__panel--main">
			<WeatherMenu cityName={props.cityName} onSettingsClicked={props.onSettingsClicked} />
			<WeatherInfo weatherData={props.weatherData} units={props.units} onTimeClicked={props.onTimeClicked} />
		</div>
	);
};

export default WeatherMainPanel;