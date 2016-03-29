import React from 'react';
import _ from 'lodash';

import WeatherMainPanel from './WeatherMainPanel';
import WeatherSettingsPanel from './WeatherSettingsPanel';

import './Weather.scss';

import weatherAPI from './weatherAPI';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      units: 'metric',
      city: '',
      data: []
    };

    // Methods bindings
    this.flipPanel = this.flipPanel.bind(this);
  }

  componentDidMount() {
    // First check if there is a previously stored configuration (localStorage)
    // If yes, load the configuration (If city is not set, still use the current position)
    // If not, get user's current position and use default settings
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;
        fetch(`${weatherAPI.forecast}units=${this.state.units}&lat=${latitude}&lon=${longitude}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
          	let parsedData = this.parseData(data.list);
          	console.log('parseData:', parsedData);
            this.setState({
              city: data.city.name,
              data: parsedData
            });
          })
          .catch((error) => {

          });
      }, null, {
        enableHighAccuracy: true
      });
    } else {
      alert('Your browser dose not support gelocation');
    }

  }

  parseData(data) {
  	let parsedData = [];
    let groupedData = _.groupBy(data, (dataPoint) => {
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

  flipPanel() {
    this.refs.panelWrapper.classList.toggle('weather__panel-wrapper--flipped');
  }

  render() {
    return (
      <div className="weather">
				<div className="weather__panel-wrapper" ref="panelWrapper">
					<WeatherMainPanel cityName={this.state.city} weatherData={this.state.data} units={this.state.units} onSettingsClicked={this.flipPanel} />
					<WeatherSettingsPanel onBackClicked={this.flipPanel} />
				</div>
			</div>
    );
  }
}

export default Weather;
