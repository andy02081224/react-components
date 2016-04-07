import React from 'react';

import WeatherInfo from './WeatherInfo';
import WeatherMenu from './WeatherMenu';
import { CircleLoadingIndicator } from '../LoadingIndicator';

const WeatherMainPanel = (props) => {
	return (props.weatherData.length >= 5
		? <div className="weather__panel weather__panel--main">
				<WeatherMenu 
					cityName={props.cityName} 
					onSettingsClicked={props.onSettingsClicked} 
				/>
				<WeatherInfo 
					weatherData={props.weatherData} 
					units={props.units} 
					onTimeClicked={props.onTimeClicked} 
				/>
			</div>
		:	<div className="weather__loading-indicator">
				<CircleLoadingIndicator />
				<div>Loading</div>
			</div>
	);

};

export default WeatherMainPanel;