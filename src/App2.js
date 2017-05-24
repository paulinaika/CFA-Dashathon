import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './WeatherCard';



class App extends Component {
  constructor(props) {
    super(props);     //inheriting from the react components. when use constructor, use super.
    this.state = {
      temp: 0,
      description: '',
      name: '',
      windspeed: '',
      cloud:'',
    }
  }

  componentDidMount() {
    this.getData();
  };

  getData(){
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=sydney,au&APPID=73f232cbc58579c90b76bb6792f1f41d&units=metric'
    axios.get(URL)
    .then((response) => {
      this.setState({
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        name: response.data.name,
        windspeed:response.data.wind.speed,
        cloud:response.data.clouds.all,
      });  //this will update the temp:0 within the const
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
      <WeatherCard
        temp={this.state.temp}
        description={this.state.description}
        name={this.state.name}
        windspeed={this.state.windspeed}
        cloud={this.state.cloud}

        // temp={this.state.temp < 25 ? <p> {this.state.temp} <TiWeatherSunny /></p> : <p>Above 25</p>}


       />
      </div>
      );
    }
  }


export default App;
