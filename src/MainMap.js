import React from 'react';
import mapData from './data';

class MainMap extends React.Component {
  state = {
    currentLocation: {
      latitude: this.props.latitude,
      longitude: this.props.longitude
    },
  }

  componentDidMount () {
    this.renderMap()
  }

  componentDidUpdate (prevProps) {
    if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
      navigator.geolocation.getCurrentPosition(() => {
        this.setState({ currentLocation: { latitude: this.props.latitude, longitude: this.props.longitude }, loading: false }, () => {
          let userLocation = {lat: this.props.latitude, lng: this.props.longitude}
          let map = new window.google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 3,
            mapTypeId: 'roadmap'
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
          let myPositionMarker = new window.google.maps.Marker({
            position: userLocation,
          })
  
          myPositionMarker.setMap(map)
  
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
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAw1zriz4pPpa2YVpyr9tAhomDohpi2FBg&callback=initMap")
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
          mapTypeId: 'roadmap'
        });
        const getCircle = () => {
          return {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: .6,
            scale: 16,
            strokeColor: 'white',
            strokeWeight: .5
          }
        }
        let myPositionMarker = new window.google.maps.Marker({
          position: userLocation,
        })

        myPositionMarker.setMap(map)

        mapData.map(location => {
          const { longitude, latitude, disease, country } = location;
          let userLocation = { lat: parseInt(latitude, 10), lng: parseInt(longitude, 10) };
          let marker = new window.google.maps.Marker({
            position: userLocation,
            icon: getCircle(),
            map,
            title: `${disease}, ${country}`
          })
        })
      })
    }, () => {
      this.setState({ loading: false })
    })
    
  }

  render () {
    return (
      <div id="map"></div>
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

export default MainMap;
