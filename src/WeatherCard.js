import React, { Component } from 'react';
import { Card, Col } from 'react-materialize';
import { TiWeatherSunny, TiWeatherPartlySunny, TiWeatherCloudy, TiWeatherShower, TiWeatherWindy, TiWeatherDownpour, TiWeatherStormy, TiWeatherSnow, TiWaves} from 'react-icons/lib/ti'



class WeatherCard extends Component{
 render(){
   return(
     <div className="container">
       <Col m={6} s={12}>
         <Card className='white' textClassName='grey-text' title={this.props.name}>
         <p> {this.props.description}</p>
         <span className='temp'>{this.props.temp} °C </span>
         <span className='description-symbol orange-text'>
         {this.props.description === "clear sky" ? <TiWeatherSunny /> : <p></p>}
         {this.props.description === "few clouds" ? <TiWeatherPartlySunny /> : <p></p>}
         {this.props.description === "scattered clouds" ? <TiWeatherCloudy /> : <p></p>}
         {this.props.description === "broken clouds" ? <TiWeatherCloudy /> : <p></p>}
         {this.props.description === "shower rain" ? <TiWeatherShower /> : <p></p>}
         {this.props.description === "rain" ? <TiWeatherDownpour /> : <p></p>}
         {this.props.description === "thunderstorm" ? <TiWeatherStormy />  : <p></p>}
         {this.props.description === "snow" ? <TiWeatherSnow /> : <p></p>}
         {this.props.description === "mist" ? <TiWaves />  : <p></p>}
         </span>

         <p className='grey-text'> <span className='temp-symbol'><TiWeatherWindy /></span> {this.props.windspeed} km/h </p>
         <p className='grey-text'> <span className='temp-symbol'><TiWeatherDownpour /></span> {this.props.cloud} % </p>

         </Card>
       </Col>



   </div>
   )
 }
}



export default WeatherCard;
