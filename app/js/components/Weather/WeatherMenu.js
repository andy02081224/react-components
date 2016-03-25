import React from 'react';

import pinIconPath from '../../../img/icon-pin.svg';
import settingsIconPath from '../../../img/icon-settings.svg';


const WeatherMenu = (props) => {
	return (
		<div className="weather__menu">
			<div className="weather__menu-location">
				<img height="45%" src={pinIconPath} alt="" />
				<span>Taipei</span>
			</div>
			<div className="weather__menu-settings" onClick={props.onSettingsClicked}>
				<img height="45%" src={settingsIconPath} alt="" />
			</div>
		</div>
	);
};

export default WeatherMenu;