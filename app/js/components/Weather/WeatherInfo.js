import React from 'react';

const WeatherInfo = (props) => {
	return (
		<div className="weather__info">
			<section className="weather__info-today-tomorrow">
				<div className="weather__info-today">
					<div className="weather-icon">Sunny</div>
					<span>18°C</span>
					<span>18:00</span>
					<span>80%</span>
				</div>
				<div className="weather__info-tomorrow">
					<div className="weather-icon">Sunny</div>
					<span>18°C</span>
					<span>18:00</span>
					<span>80%</span>
				</div>
			</section>
			<section className="weather__info-recent">
				<ul>
					<li>
						<div className="weather-icon">Sunny</div>
						<div>18°C</div>
						<div>18:00</div>
						<div>80%</div>
					</li>
					<li>
						<div className="weather-icon">Sunny</div>
						<span>18°C</span>
						<span>18:00</span>
						<span>80%</span>
					</li>
					<li>
						<div className="weather-icon">Sunny</div>
						<span>18°C</span>
						<span>18:00</span>
						<span>80%</span>
					</li>
				</ul>
			</section>
		</div>
	);
};

export default WeatherInfo;