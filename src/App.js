import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MainMap from './MainMap';
import mapData from './data';

class App extends Component {
  state = {
    currentLocation: {
      latitude: this.props.latitude,
      longitude: this.props.longitude
    },
    loading: true,
    searchText: ''
  }

  searchPlaces = (place) => {
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=geometry&key=AIzaSyAaW6aou2PiPHgD15WYQ32kWShG6V9dOcM`, {
      crossdomain: true
    })
      .then(response => {
        this.setState({ currentLocation: { latitude: response.data.candidates[0].geometry.location.lat, longitude: response.data.candidates[0].geometry.location.lng } })
      }).catch(error => {
        console.error('Error message', error)
      });
  }

  onPressEnter = (event) => {
    let searchTextFromState = this.state.searchText;
    if (event.key === "Enter") {
      this.searchPlaces(searchTextFromState);
    }
  }

  onChangeEvent = (event) => {
    const inptValue = event.target.value;
    this.setState({ searchText: inptValue })
  }

  render() {
    const { searchText} = this.state;
    return (
      <main>
        <input
          id="searchID"
          placeholder="Search for a location"
          value={searchText}
          onKeyPress={this.onPressEnter}
          onChange={this.onChangeEvent}
        />
        <MainMap latitude={this.state.currentLocation.latitude} longitude={this.state.currentLocation.longitude} />
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
