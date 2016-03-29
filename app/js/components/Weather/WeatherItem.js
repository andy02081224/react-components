import React from 'react';

const WeatherItem = function(props) {
		WeatherItem.defaultProps = {
			class: '',
			date: '',
			time: '',
			weather: '',
			temperature: '',
			clouds: '',
			timestamp: ''
		};

		return (		
			<div className={props.class}>
				<div className="weather-icon">
					<img src={'http://openweathermap.org/img/w/' + props.icon + '.png'}/>
					<label>{props.weather}</label>
				</div>
				<span>
					<i className="wi wi-fw wi-thermometer"></i>&nbsp;{props.temperature + props.units}
					<br />
					<i className="wi wi-fw wi-cloud"></i>&nbsp;{props.clouds + '%'}
				</span>
				<span onClick={props.onTimeClicked} data-timestamp={props.timestamp}>{props.date}<br />{props.time}</span>
			</div>
		);
};

export default WeatherItem;