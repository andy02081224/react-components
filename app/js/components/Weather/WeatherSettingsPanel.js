import React from 'react';

import WeatherSettingsBackButton from './WeatherSettingsBackButton';
import WeatherSettingsForm from './WeatherSettingsForm';

class WeatherSettingsPanel extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleUnitsChange = this.handleUnitsChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
	}

	handleUnitsChange(event) {
		event.preventDefault();

		let newUnit = event.target.getAttribute('data-unit');
		
		this.props.onSettingsChange({
			units: newUnit
		});
	}

	handleLocationChange(event) {
		let newLocation = event.target.value;

		this.props.onSettingsChange({
			location: newLocation
		});
	}

	handleBackButtonClicked() {
		if (!this.props.settings.location) {
			alert('Please select a city');
		}
		else {
			this.props.onBackClicked();
		}
	}

	render() {
		// console.log('WeatherSettingsPanel:', this.props.settings);
		return (
			<div className="weather__panel  weather__panel--settings">
				<WeatherSettingsBackButton onBackClicked={this.handleBackButtonClicked} />
				<WeatherSettingsForm 
					units={this.props.settings.units} 
					location={this.props.settings.location} 
					cityList={this.props.cityList} 
					onUnitsChange={this.handleUnitsChange} 
					onLocationChange={this.handleLocationChange} 
				/>
			</div>
		);
	}
}

export default WeatherSettingsPanel;