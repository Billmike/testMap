import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class MyMapComponent extends React.Component {
  state = {
    currentLocation: {
      latitude: -34.397,
      longitude: 150.644
    },
    loading: true,
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      
      this.setState({ currentLocation: { latitude, longitude }, loading: false })
    }, () => {
      this.setState({ loading: false })
    })
  }

  render () {
    const { isMarkerShown } = this.props;
    const { loading, currentLocation } = this.state;
    if (loading) {
      return <p>Fetching user location..........</p>
    }
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
      >
      {isMarkerShown && <Marker position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }} />}
    </GoogleMap>
    )
  }
}

export default compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAw1zriz4pPpa2YVpyr9tAhomDohpi2FBg",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
}),withScriptjs,
withGoogleMap)(MyMapComponent);
