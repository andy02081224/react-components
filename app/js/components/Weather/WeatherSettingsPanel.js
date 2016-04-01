import React from 'react';

import WeatherSettingsBackButton from './WeatherSettingsBackButton';
import WeatherSettingsForm from './WeatherSettingsForm';

class WeatherSettingsPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			units: this.props.settings.units,
			location: this.props.settings.location,
			city: ''
		};

		this.handleUnitsChange = this.handleUnitsChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleSettingsChange = this.handleSettingsChange.bind(this);
	}

	handleUnitsChange(event) {
		event.preventDefault();

		this.setState({
			units: event.target.getAttribute('data-unit')
		});
	}

	handleLocationChange(event) {
		// let customLocation = event.target.nextSibling.querySelector('input[type="text"]').value;
		this.setState({
			location: event.target.value
		});
	}

	handleSettingsChange() {
		this.props.onSettingsChange(this.state);
	}

	render() {
		return (
			<div className="weather__panel  weather__panel--settings">
				<WeatherSettingsBackButton onBackClicked={this.handleSettingsChange} />
				<WeatherSettingsForm units={this.state.units} location={this.state.location} onUnitsChange={this.handleUnitsChange} onLocationChange={this.handleLocationChange} />
			</div>
		);
	}
}

export default WeatherSettingsPanel;