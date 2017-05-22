import React, { Component } from 'react';
import './App.css';

//import component
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl, Marker } from "react-mapbox-gl";
import config from "./config.json";
import style from "./style.json";

const { accessToken } = config;

const containerStyle = {
  height: "100vh",
  width: "100%"
};

const markerCoord = [
  150.89143690014,
  -34.4123709344377
];

class App extends Component {
  intervalHandle = null
  timeoutHandle = null
  mounted = false

  state = {
    popup: null,
    center: [151.3276046,-34.0900158],
    circleRadius: 30,
    routeIndex: 0
  };

  componentWillMount() {
    this.mounted = true;
    this.timeoutHandle = setTimeout(() => {
      if (this.mounted) {
        this.setState({
          center: [151.3276046,-34.0900158],
          circleRadius: 10
        });
      }
    }, 3000);

    this.intervalHandle = setInterval(() => {
      if (this.mounted) {
        this.setState({
          routeIndex: this.state.routeIndex + 1
        });
      }
    }, 8000);
  }

  componentWillUnmount() {
    this.mounted = false;
    clearInterval(this.intervalHandle);
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <ReactMapboxGl
        style={config.style}
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
