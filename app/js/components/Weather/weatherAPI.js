const apiKey = 'd0fcc983442348744589055d32c8cb3f';

const weatherAPI  = {
	currentWeather: `http://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&`,
	forecast: `http://api.openweathermap.org/data/2.5/forecast?APPID=${apiKey}&`,
	cityList: '/data/taiwan-city-list.json'
};

export default weatherAPI;