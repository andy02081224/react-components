import React from 'react';

const WeatherSettingsForms = function(props) {
	let cityOptions = props.cityList.map((city) => {
		return <option key={city.id} value={city.id}>{city.name}</option>;
	});

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
		    		<input type="radio" id="weather__settings-location-custom" name="weather__settings-location-radio" value="" onChange={props.onLocationChange} checked={props.location != 'current'} />
		  			<label htmlFor="weather__settings-location-custom">
		  				<select value={ props.location == 'current' ? 'default' : props.location } onChange={props.onLocationChange} disabled={props.location == 'current'}>
		  					<option value="default" disabled="true">Select a city</option>
		  					{cityOptions}
		  				</select>
		  			</label>
	  			</div>	  			
  			</div>
			</div>
		</form>
	);
};

export default WeatherSettingsForms;