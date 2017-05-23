import React, { Component } from 'react';
import './App.css';

//import component
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl, Marker } from "react-mapbox-gl";
import config from "./config.json";
import style from "./style.json";
import route from "./route.json";
import axios from 'axios';


const { accessToken } = config;

const containerStyle = {
  height: "100vh",
  width: "100%"
};

const markerCoord = [
  150.89143690014,
  -34.4123709344377
];

const params = {v: '3.exp', key: 'AIzaSyDX8-TRWtqBRRAegtMRVrbfR7-u_bLnP9o'};

const mappedRoute = route.points.map(point => [ point.lat, point.lng ]);

class App extends Component {
  intervalHandle = null
  timeoutHandle = null
  mounted = false

  constructor(props) {
  super(props);
  this.state = {
      latitude: 0,
      longitude: 0,
      popup: null,
      center: [151.3276046,-34.0900158],
      circleRadius: 30,
      routeIndex: 0
    };
  }

  componentWillMount() {
    // this.mounted = true;
    this.getISSPosition();


    // this.timeoutHandle = setTimeout(() => {
    //   if (this.mounted) {
    //     this.setState({
    //       center: [151.3276046,-34.0900158],
    //       circleRadius: 10
    //     });
    //   }
    // }, 3000);
    //
    // this.intervalHandle = setInterval(() => {
    //   if (this.mounted) {
    //     this.setState({
    //       routeIndex: this.state.routeIndex + 1
    //     });
    //   }
    // }, 8000);
  };

  getISSPosition() {
    setInterval(() => {
      axios.get(`http://api.open-notify.org/iss-now.json`)
      .then(result => {
        this.setState({
          latitude: result.data.iss_position.latitude,
          longitude: result.data.iss_position.longitude
        })
        console.log(this.state.latitude);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, 5000);
  }
  //
  // componentWillUnmount() {
  //   this.mounted = false;
  //   clearInterval(this.intervalHandle);
  //   clearTimeout(this.timeoutHandle);
  // }

  _onClickMarker = ({ feature }) => {
    this.setState({
      center: feature.geometry.coordinates
    });
  };

  _onClickMap(map) {
    console.log("Clicked on the map : ", map);
  }

  _onStyleLoad(map) {
    console.log("Style loaded: ", map);
  }

  _onHover({ map }) {
    map.getCanvas().style.cursor = "pointer";
  }

  _onZoom(map) {
    console.log("Zoom level changed to ", map.getZoom());
  }

  _onEndHover({ map }) {
    map.getCanvas().style.cursor = "";
  }

  _markerClick() {
    console.log('Marker clicked');
  }

  _markerMouseEnter() {
    console.log('Marker mouse enter');
  }

  _markerMouseLeave() {
    console.log('Marker mouse leave');
  }

  _polygonClicked = ({ feature }) => {
    console.log("Polygon clicked", feature.geometry.coordinates);
  };

  render() {
    return (
      <ReactMapboxGl
        style={style}
        zoom={[9]}
        onClick={this._onClickMap}
        onZoom={this._onZoom}
        onStyleLoad={this._onStyleLoad}
        accessToken={accessToken}
        center={this.state.center}
        movingMethod="jumpTo"
        containerStyle={containerStyle}>

        <ScaleControl/>
        <ZoomControl/>

        <Layer
          type="symbol"
          layout={{ "icon-image": "marker-15" }}>
          <Feature
            coordinates={markerCoord}
            onHover={this._onHover}
            onEndHover={this._onEndHover}
            onClick={this._onClickMarker}/>
        </Layer>


        <Layer
          id="mapbox-route-example"
          type="line"
          sourceId="route"
          layout={{
            "line-join": "round",
            "line-cap": "round"
          }}
          paint={{
            "line-color": "#888",
            "line-width": 8
          }}/>

        <Layer
          type="line"
          layout={{ "line-cap": "round", "line-join": "round" }}
          paint={{ "line-color": "#4790E5", "line-width": 12 }}>
          <Feature coordinates={mappedRoute}/>
        </Layer>

        <Marker
          onClick={this._markerClick}
          anchor="top"
          onMouseEnter={this._markerMouseEnter}
          onMouseLeave={this._markerMouseLeave}
          className="station"
          coordinates={markerCoord}>
        </Marker>

      </ReactMapboxGl>
    );
  }
}

export default App;
