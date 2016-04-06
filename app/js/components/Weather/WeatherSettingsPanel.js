import React from 'react';

import WeatherSettingsBackButton from './WeatherSettingsBackButton';
import WeatherSettingsForm from './WeatherSettingsForm';

class WeatherSettingsPanel extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	units: this.props.settings.units,
		// 	location: this.props.settings.location
		// };
		
		this.handleUnitsChange = this.handleUnitsChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
	}

	handleUnitsChange(event) {
		event.preventDefault();
		console.log('unit change:', event.target.getAttribute('data-unit'));
		let newUnit = event.target.getAttribute('data-unit');
		this.props.onSettingsChange({
			units: newUnit
		});
	}

	handleLocationChange(event) {
		// let customLocation = event.target.nextSibling.querySelector('input[type="text"]').value;
		console.log('location change:', event.target.value);
		let newLocation = event.target.value;

		this.props.onSettingsChange({
			location: newLocation
		});
	}

	handleBackButtonClicked() {
		this.props.onBackClicked();
	}

	render() {
		console.log('WeatherSettingsPanel:', this.props.settings);
		return (
			<div className="weather__panel  weather__panel--settings">
				<WeatherSettingsBackButton onBackClicked={this.handleBackButtonClicked} />
				<WeatherSettingsForm units={this.props.settings.units} location={this.props.settings.location} cityList={this.props.cityList} onUnitsChange={this.handleUnitsChange} onLocationChange={this.handleLocationChange} />
			</div>
		);
	}
}

export default WeatherSettingsPanel;