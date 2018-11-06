import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import mapData from './data';

class App extends Component {
  state = {
    currentLocation: {
      latitude: -34.397,
      longitude: 150.644
    },
    loading: true,
  }

  componentDidMount () {
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAw1zriz4pPpa2YVpyr9tAhomDohpi2FBg&callback=initMap")
    window.initMap = this.initMap;
  }

  initMap = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      
      this.setState({ currentLocation: { latitude, longitude }, loading: false }, () => {
        let userLocation = {lat: this.state.currentLocation.latitude, lng: this.state.currentLocation.longitude}
        let map = new window.google.maps.Map(document.getElementById('map'), {
          center: userLocation,
          zoom: 3,
          mapId: 'terrain'
        });
        const getCircle = (disease) => {
          let lowerCaseDisease = disease.toLowerCase();
          return {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: lowerCaseDisease === "triclosan" ? 'black' : 'red',
            fillOpacity: .6,
            scale: 16,
            strokeColor: 'white',
            strokeWeight: .5
          }
        }
        mapData.map(location => {
          const { longitude, latitude, disease, country } = location;
          let userLocation = { lat: parseInt(latitude, 10), lng: parseInt(longitude, 10) };
          let marker = new window.google.maps.Marker({
            position: userLocation,
            icon: getCircle(disease),
            map,
            title: `${disease}, ${country}`
          })
        })
      })
    }, () => {
      this.setState({ loading: false })
    })
    
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <p>Loading disease distribution.......</p>
    }
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

const loadScript = (url) => {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index)
}

export default App;
