import React from 'react';

import WeatherInfo from './WeatherInfo';
import WeatherSettingsPanel from './WeatherSettingsPanel';
import WeatherMenu from './WeatherMenu';

class Weather extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="weather">
				<WeatherMenu />
				<WeatherInfo />
				<WeatherSettingsPanel />
			</div>
		);
	}
}

export default Weather;