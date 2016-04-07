import React from 'react';

import moment from 'moment';
import { round } from 'lodash';

import WeatherItem from './WeatherItem';


const WeatherInfo = function(props) {
	WeatherInfo.defaultProps = {
	  weatherData: []
	};

  function renderWeatherItems(weatherData, customClass = [], customWrapper) {
    let weatherItems = [];
    
    weatherData.forEach((item, index) => {
      let weatherItem = (
        <WeatherItem 
        	class={customClass[index] ? customClass[index] : ''}
					key={item.dt}
					icon={item.weather[0].icon}
					date={moment.unix(item.dt).format('MM/DD')} 
					time={moment.unix(item.dt).format('HH:mm')}
					weather={item.weather[0].main}
					temperature={round(item.main.temp, 0)}
					units={props.units == 'metric' ? '°C' : '°F'}
					clouds={item.clouds.all}
					timestamp={item.dt}
					onTimeClicked={props.onTimeClicked}
				/>
      );

 			if (customWrapper) weatherItem = React.createElement(customWrapper, {key: item.dt}, weatherItem);

	    weatherItems.push(weatherItem);
    });

    return weatherItems;
  }

  return (
    	<div className="weather__info">
				<section className="weather__info-today-tomorrow">
					{renderWeatherItems(props.weatherData.slice(0, 2), ['weather__info-today', 'weather__info-tomorrow'])}
				</section>
				<section className="weather__info-recent">
					<ul>
						{renderWeatherItems(props.weatherData.slice(2, 5), [], 'li')}
					</ul>
				</section>
			</div> 
  );
};


export default WeatherInfo;
