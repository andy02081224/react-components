import React from 'react';

const WeatherMenu = (props) => {
	return (
		<div className="weather__menu" onClick={props.onSettingsClicked}>WeatherMenu</div>
	);
};

export default WeatherMenu;