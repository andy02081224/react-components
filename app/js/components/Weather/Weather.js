import React from 'react';
import { groupBy, findIndex, extend } from 'lodash';
import moment from 'moment';

import WeatherMainPanel from './WeatherMainPanel';
import WeatherSettingsPanel from './WeatherSettingsPanel';

import './Weather.scss';

import weatherAPI from './weatherAPI';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {
      	units: 'metric',
      	location: 'current'
      },
      city: '',
      data: [],
      parsedData: [],
      cityList: []
    };

    // Methods bindings
    this.flipPanel = this.flipPanel.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  componentDidMount() {
    this.fetchCityList();

    // First check if there is a previously stored configuration (localStorage)
    if (localStorage.getItem('weatherSettings')) {
      // If yes, load the configuration
      let storedSettings = JSON.parse(localStorage.getItem('weatherSettings'));
      console.log('storedSettings: ', storedSettings);
      this.fetchWeatherData(storedSettings.location, storedSettings);
    }
    else {
    // If not, get user's current position and use default settings
    this.getCurrentPosition()
    	.then((response) => {
    		this.fetchWeatherData(response);
    	})
    	.catch((error) => {
        console.log('Error fetchWeatherData:', error);
    	});
    }

  }

  getCurrentPosition(enableHighAccuracy = true) {
  	if (!navigator.geolocation) {
      alert('Your browser dose not support gelocation');
      return;
    }

    return new Promise((resolve, reject) => {
	    navigator.geolocation.getCurrentPosition((position) => {
	      resolve(position.coords);
	    }, null, {
	      enableHighAccuracy: enableHighAccuracy
	    });
    });

  }

  fetchWeatherData(location, settings = this.state.settings) {
  	let locationString = '';

    // Determine location fomat: city ID or geographic coordinates
  	if (typeof location === 'string' && isNaN(location)) {
  		locationString = `q=${location}`;
  	}
    else if (typeof location === 'string' && !isNaN(location) || typeof location === 'number') {
      locationString = `id=${location}`;
    }
  	else if (typeof location === 'object' && location.latitude && location.longitude) {
  		locationString = `lat=${location.latitude}&lon=${location.longitude}`;
  	}
  	else {
  		return;
  	}

    fetch(`${weatherAPI.forecast}units=${settings.units}&${locationString}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('fetchWeatherData settings:', settings);
        console.log('raw data:', data);
        let parsedData = this.parseData(data.list);

        this.setState({
          settings: settings,
          city: data.city.name,
          data: data.list,
          parsedData: parsedData
        });
      })
      .catch((error) => {
        console.log('Parse json failed:', error);
      });
  }

  fetchCityList() {
    fetch(weatherAPI.cityList)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let cityList = data.map((item) => {
          return {
            id: item._id,
            name: item.name
          };
        });
        this.setState({
          cityList: cityList
        });
      })
      .catch((error) => {
        console.log('Parse json failed:', error);
      });
  }

  parseData(data, timestamp) {
    let parsedData = [];
    let groupedData = groupBy(data, (dataPoint) => {
      let identifier = new Date(dataPoint.dt * 1000).getDate();
      return identifier;
    });

    let dateSequence = Object.keys(groupedData).sort((a, b) => {
      return groupedData[a][0].dt - groupedData[b][0].dt;
    });

    console.log('groupedData:', groupedData);

    for (let i = 0; i < 5; i++) {
      if (timestamp && moment.unix(timestamp).date() == dateSequence[i]) {
        let date = moment.unix(timestamp).date();
        let currentIndex = findIndex(groupedData[date], (data) => {
          return data.dt == timestamp;
        });

        if (currentIndex == groupedData[date].length - 1) currentIndex = -1;

        parsedData.push(groupedData[date][++currentIndex]);
      } else {
        parsedData.push(groupedData[dateSequence[i]][0]);
      }
    }

    return parsedData;
  }

  updateData(sourceData, currentData, timestamp) {
  	let updatedData = currentData;
    let date = moment.unix(timestamp).date();

    let dateData = sourceData.filter((data) => {
      return moment.unix(data.dt).date() == date;
    });


    let currentIndex = findIndex(dateData, (data) => {
      return data.dt == timestamp;
    });

    let replacedIndex = findIndex(currentData, (data) => {
    	return data.dt == timestamp;
    });

    if (currentIndex == dateData.length - 1) currentIndex = -1;

    updatedData.splice(replacedIndex, 1 ,dateData[++currentIndex]);

    console.log(updatedData);

    return updatedData;
  }

  flipPanel() {
    this.refs.panelWrapper.classList.toggle('weather__panel-wrapper--flipped');
  }

  changeTime(event) {
    let timestamp = event.currentTarget.getAttribute('data-timestamp');
    let updatedData = this.updateData(this.state.data, this.state.parsedData, timestamp);

    this.setState({
      parsedData: updatedData
    });
  }

  handleSettingsChange(settings) {
  	// this.flipPanel();

    let newSettings = extend(this.state.settings, settings);

    this.setState({
      settings: newSettings
    });

  	localStorage.setItem('weatherSettings', JSON.stringify(newSettings));

  	if (newSettings.location == 'current') {
  		this.getCurrentPosition()
  			.then((response) => {
  				this.fetchWeatherData(response, newSettings);
  			})
  			.catch((error) => {

  			});
  	}
  	else {
  		this.fetchWeatherData(newSettings.location, newSettings);
  	}
  }

  render() {
    return (
      <div className="weather">
				<div className="weather__panel-wrapper" ref="panelWrapper">
					<WeatherMainPanel cityName={this.state.city} weatherData={this.state.parsedData} units={this.state.settings.units} onSettingsClicked={this.flipPanel} onTimeClicked={this.changeTime} />
					<WeatherSettingsPanel settings={this.state.settings} onSettingsChange={this.handleSettingsChange} onBackClicked={this.flipPanel} cityList={this.state.cityList} />
				</div>
			</div>
    );
  }
}

export default Weather;
