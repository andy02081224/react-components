import React from 'react';

import WeatherMainPanel from './WeatherMainPanel';
import WeatherSettingsPanel from './WeatherSettingsPanel';

import './Weather.scss';

class Weather extends React.Component {
	constructor(props) {
		super(props);

		this.flipPanel = this.flipPanel.bind(this);
	}

	componentDidMount() {
	}

	flipPanel() { 
		this.refs.panelWrapper.classList.toggle('weather__panel-wrapper--flipped');
	}

	render() {
		return (
			<div className="weather">
				<div className="weather__panel-wrapper" ref="panelWrapper">
					<WeatherMainPanel onSettingsClicked={this.flipPanel} />
					<WeatherSettingsPanel onBackClicked={this.flipPanel} />
				</div>
			</div>
		);
	}
}

export default Weather;