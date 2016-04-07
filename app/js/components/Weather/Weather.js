import React from 'react';

// Libs
import { groupBy, findIndex, extend } from 'lodash';
import moment from 'moment';

// Child components
import WeatherMainPanel from './WeatherMainPanel';
import WeatherSettingsPanel from './WeatherSettingsPanel';

// Styles
import './Weather.scss';

// Other dependencies
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

    // Method bindings
    this.flipPanel = this.flipPanel.bind(this);
    this.handleTimeClicked = this.handleTimeClicked.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  componentDidMount() {
    this.getCityList();

    let storedSettings = JSON.parse(localStorage.getItem('weatherSettings'));
    
    // First check if there is a previously stored configuration (localStorage)
    if (storedSettings && storedSettings.location != 'current') {
      // If yes, load the configuration
      this.getWeatherData(storedSettings.location, extend(this.state.settings, storedSettings));
    }
    else {
      // If not, get user's current position and use default settings
      this.getCurrentPosition()
        .then((response) => {
          this.getWeatherData(response, extend(this.state.settings, storedSettings));
        })
        .catch((error) => {
          console.log('Error getWeatherData:', error);
        });
      }
  }

  handleTimeClicked(event) {
    let timestamp = event.currentTarget.getAttribute('data-timestamp');
    let updatedData = this.updateDataSet(this.state.data, this.state.parsedData, timestamp);

    this.setState({
      parsedData: updatedData
    });
  }

  handleSettingsChange(settings) {
    let newSettings = extend(this.state.settings, settings);

    this.setState({
      settings: newSettings
    });

    if (!newSettings.location) {
      return;
    }

    localStorage.setItem('weatherSettings', JSON.stringify(newSettings));

    if (newSettings.location == 'current') {
      this.getCurrentPosition()
        .then((response) => {
          this.getWeatherData(response, newSettings);
        })
        .catch((error) => {

        });
    }
    else {
  		this.getWeatherData(newSettings.location, newSettings);
  	}
  }

  getCityList() {
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

  getWeatherData(location, settings = this.state.settings) {
    let locationString = '';

    // Determine location format: city name, city ID or geographic coordinates
    if (typeof location === 'string' && isNaN(location)) {
      locationString = `q=${location}`;
    }
    else if ((typeof location === 'string' && !isNaN(location)) || typeof location === 'number') {
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
        // console.log('getWeatherData settings:', settings);
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

  parseData(data) {
    let parsedData = [];

    let groupedData = groupBy(data, (dataPoint) => {
      let identifier = new Date(dataPoint.dt * 1000).getDate();
      return identifier;
    });

    let dateSequence = Object.keys(groupedData).sort((a, b) => {
      return groupedData[a][0].dt - groupedData[b][0].dt;
    });

    for (let i = 0; i < 5; i++) {
      parsedData.push(groupedData[dateSequence[i]][0]);
    }

    return parsedData;
  }

  updateDataSet(sourceData, currentData, timestamp) {
    let updatedData = currentData;

    // Get selected date from timestamp
    let date = moment.unix(timestamp).date();

    // Get selected date's weather data
    let dateData = sourceData.filter((data) => {
      return moment.unix(data.dt).date() == date;
    });

    // Find the index of the data currently showed on the widget 
    // in selected date's weather data
    let currentIndex = findIndex(dateData, (data) => {
      return data.dt == timestamp;
    });

    // Find the index of selected date's data
    // in currently showed data set
    let replacedIndex = findIndex(currentData, (data) => {
      return data.dt == timestamp;
    });

    if (currentIndex == dateData.length - 1) currentIndex = -1;

    updatedData.splice(replacedIndex, 1 ,dateData[++currentIndex]);

    return updatedData;
  }

  flipPanel() {
    this.refs.panelWrapper.classList.toggle('weather__panel-wrapper--flipped');
  }

  render() {
    return (
      <div className="weather">
				<div className="weather__panel-wrapper" ref="panelWrapper">
					<WeatherMainPanel 
            cityName={this.state.city} 
            weatherData={this.state.parsedData} 
            units={this.state.settings.units} 
            onSettingsClicked={this.flipPanel} 
            onTimeClicked={this.handleTimeClicked} 
          />
					<WeatherSettingsPanel 
            settings={this.state.settings} 
            cityList={this.state.cityList}
            onSettingsChange={this.handleSettingsChange} 
            onBackClicked={this.flipPanel} 
          />
				</div>
			</div>
    );
  }
}

export default Weather;
