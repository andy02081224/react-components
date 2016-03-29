import React from 'react';

import moment from 'moment';

import WeatherItem from './WeatherItem';

import { round } from 'lodash';

const WeatherInfo = function(props) {
  console.log('WeatherInfo:', props.weatherData);
  
	WeatherInfo.defaultProps = {
	  weatherData: []
	};

  function renderWeatherItems(weatherData, customClass = [], customWrapper) {
    let weatherItems = [];
    

    weatherData.forEach((dataPoint, index) => {
      let weatherItem = (
        <WeatherItem class={customClass[index] ? customClass[index] : ''}
					key={dataPoint.dt}
					date={moment.unix(dataPoint.dt).format('MM/DD')} 
					time={moment.unix(dataPoint.dt).format('HH:mm')}
					weather={dataPoint.weather[0].main}
					temperature={round(dataPoint.main.temp, 0)}
					icon={dataPoint.weather[0].icon}
					units={props.units == 'metric' ? '°C' : '°F'}
					clouds={dataPoint.clouds.all}>
				</WeatherItem>
      );

 			if (customWrapper) weatherItem = React.createElement(customWrapper, {key: dataPoint.dt}, weatherItem);

	    weatherItems.push(weatherItem);
    });

    return weatherItems;
  }

  return (props.weatherData.length >= 5 
    	? <div className="weather__info">
					<section className="weather__info-today-tomorrow">
						{renderWeatherItems(props.weatherData.slice(0, 2), ['weather__info-today', 'weather__info-tomorrow'])}
					</section>
					<section className="weather__info-recent">
						<ul>
							{renderWeatherItems(props.weatherData.slice(2, 5), [], 'li')}
						</ul>
					</section>
				</div> 
			: <div>loading</div>
  );
};


export default WeatherInfo;
