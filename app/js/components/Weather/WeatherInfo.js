import React from 'react';

const WeatherInfo = (props) => {
	return (
		<div className="weather__info">
			<section className="weather__info-today-tomorrow">
				<div className="weather__info-today">
					<div className="weather-icon"><i className="wi wi-day-storm-showers"></i>Sunny</div>
					<span>
						<i className="wi wi-fw wi-thermometer"></i>&nbsp;18°C
						<br />
						<i className="wi wi-fw wi-umbrella"></i>&nbsp;80%
					</span>
					<span>2/20<br />18:00</span>
				</div>
				<div className="weather__info-tomorrow">
					<div className="weather-icon"><i className="wi wi-day-sunny"></i>Sunny</div>
					<span>
						<i className="wi wi-fw wi-thermometer"></i>&nbsp;18°C
						<br />
						<i className="wi wi-fw wi-umbrella"></i>&nbsp;80%
					</span>
					<span>2/21<br />18:00</span>
				</div>
			</section>
			<section className="weather__info-recent">
				<ul>
					<li>
						<div className="weather-icon"><i className="wi wi-rain"></i>&nbsp;Sunny</div>
						<span>
							<i className="wi wi-fw wi-thermometer"></i>&nbsp;18°C
							<br />
							<i className="wi wi-fw wi-umbrella"></i>&nbsp;80%
						</span>
						<span>2/21<br />18:00</span>
					</li>
					<li>
						<div className="weather-icon"><i className="wi wi-day-fog"></i>&nbsp;Sunny</div>
						<span>
							<i className="wi wi-fw wi-thermometer"></i>&nbsp;18°C
							<br />
							<i className="wi wi-fw wi-umbrella"></i>&nbsp;80%
						</span>
						<span>2/21<br />18:00</span>
					</li>
					<li>
						<div className="weather-icon"><i className="wi wi-day-sunny"></i>&nbsp;Sunny</div>
						<span>
							<i className="wi wi-fw wi-thermometer"></i>&nbsp;18°C
							<br />
							<i className="wi wi-fw wi-umbrella"></i>&nbsp;80%
						</span>
						<span>2/21<br />18:00</span>
					</li>
				</ul>
			</section>
		</div>
	);
};

export default WeatherInfo;