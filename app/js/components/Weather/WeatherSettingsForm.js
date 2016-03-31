import React from 'react';

const WeatherSettingsUnits = function(props) {
	return (
		<form>
			<div className="form-group">
				<label className="weather__settings-header">Units</label>
				<div className="button-group">
					<button className="button">°C</button>			
					<button className="button">°F</button>
				</div>
			</div>
			<div className="form-group">
				<label className="weather__settings-header">Location</label>
				<div className="radio">
					<div>
	    			<input type="radio" id="weather__settings-location-current" name="optionsRadios" value="option1" />
						<label htmlFor="weather__settings-location-current">Current Location</label>
					</div>
					<div>
		    		<input type="radio" id="weather__settings-location-custom" name="optionsRadios" value="option2" />
		  			<label htmlFor="weather__settings-location-custom">
		  				<span>Custom&nbsp;</span>
		  				<input type="text" />
		  			</label>
	  			</div>	  			
  			</div>
			</div>
		</form>
	);
};

export default WeatherSettingsUnits;