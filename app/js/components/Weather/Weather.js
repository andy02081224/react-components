import React from 'react';
import { groupBy, findIndex } from 'lodash';
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
      parsedData: []
    };

    // Methods bindings
    this.flipPanel = this.flipPanel.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  componentDidMount() {
    // First check if there is a previously stored configuration (localStorage)
    // If yes, load the configuration (If city is not set, still use the current position)
    // If not, get user's current position and use default settings
    this.getCurrentPosition()
    	.then((response) => {
    		this.fetchWeatherData(response);
    	})
    	.catch((error) => {

    	});

  }

  getCurrentPosition() {
  	if (!navigator.geolocation) {
      alert('Your browser dose not support gelocation');
      return;
    }

    return new Promise((resolve, reject) => {
	    navigator.geolocation.getCurrentPosition((position) => {
	      resolve(position.coords);
	    }, null, {
	      enableHighAccuracy: true
	    });
    });

  }

  fetchWeatherData(query) {
  	let queryString = '';

  	if (typeof query === 'string') {
  		queryString = `q=${query}`;
  	}
  	else if (typeof query === 'object' && query.latitude && query.longitude) {
  		queryString = `lat=${query.latitude}&lon=${query.longitude}`;
  	}
  	else {
  		return;
  	}

    fetch(`${weatherAPI.forecast}units=${this.state.settings.units}&${queryString}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let parsedData = this.parseData(data.list);

        this.setState({
          city: data.city.name,
          data: data.list,
          parsedData: parsedData
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
  	this.flipPanel();
  	console.log('settings:', settings);

  	this.setState({
  		settings: settings
  	});

  	if (settings.location == 'current') {
  		this.getCurrentPosition()
  			.then((response) => {
  				this.fetchWeatherData(response);
  			})
  			.catch((error) => {

  			});
  	}
  	else {
  		this.fetchWeatherData(settings.location);
  	}
  }

  render() {
    return (
      <div className="weather">
				<div className="weather__panel-wrapper" ref="panelWrapper">
					<WeatherMainPanel cityName={this.state.city} weatherData={this.state.parsedData} units={this.state.settings.units} onSettingsClicked={this.flipPanel} onTimeClicked={this.changeTime} />
					<WeatherSettingsPanel settings={this.state.settings} onSettingsChange={this.handleSettingsChange} />
				</div>
			</div>
    );
  }
}

export default Weather;
