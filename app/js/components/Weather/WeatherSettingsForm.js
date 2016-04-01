import React from 'react';

const WeatherSettingsUnits = function(props) {
	return (
		<form>
			<div className="form-group">
				<label className="weather__settings-header">Units</label>
				<div className="button-group" onClick={props.onUnitsChange}>
					<button className={'button' + (props.units == 'metric' ? ' button--selected' : '')} data-unit="metric">°C</button>			
					<button className={'button' + (props.units == 'imperial' ? ' button--selected' : '')} data-unit="imperial">°F</button>
				</div>
			</div>
			<div className="form-group">
				<label className="weather__settings-header">Location</label>
				<div className="radio">
					<div>
	    			<input type="radio" id="weather__settings-location-current" name="weather__settings-location-radio" value="current" onChange={props.onLocationChange} checked={props.location == 'current'} />
						<label htmlFor="weather__settings-location-current">Current Location</label>
					</div>
					<div>
		    		<input type="radio" id="weather__settings-location-custom" name="weather__settings-location-radio" value="custom" onChange={props.onLocationChange} checked={props.location == 'custom'} />
		  			<label htmlFor="weather__settings-location-custom">
		  				<span>Custom&nbsp;</span>
		  				<input type="text" disabled={props.location == 'current'} />
		  			</label>
	  			</div>	  			
  			</div>
			</div>
		</form>
	);
};

export default WeatherSettingsUnits;