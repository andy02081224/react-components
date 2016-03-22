import React from 'react';
import WeatherToday from './WeatherToday';
import WeatherFiveDay from './WeatherFiveDay';

const WeatherInfo = (props) => {
	return (
		<div>
			<WeatherToday />
			<WeatherFiveDay />
		</div>
	);
};

export default WeatherInfo;