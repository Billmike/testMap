import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map isMarkerShown/>
      </div>
    );
  }
}

export default App;
