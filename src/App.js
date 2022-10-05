import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';

const App = () => {
  const [coords, setCoords] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

  const getCurrentCoords = () => {
    Geolocation.getCurrentPosition((res) => {
      setCoords(res.coords)
      setLatitude(res.coords.latitude)
      setLongitude(res.coords.longitude)
    }),
      (err) => console.log(err),
      { enableHighAccuracy: true }
  }

  useEffect(() => {
    getCurrentCoords()
  }, [])

  const ankaraCoords = {
    latitude: 39.925533,
    longitude: 32.866287,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      initialRegion={ankaraCoords}>
      <Marker coordinate={ankaraCoords} />
    </MapView>
  );
}

export default App