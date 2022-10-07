import React, { useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import styles from './App.Style'

import BottomSheet from 'react-native-gesture-bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const App = () => {
  const [distances, setDistances] = useState('')
  const [originAdress, setOriginAdress] = useState('')
  const [destinationAdress, setDestinationAdress] = useState('')

  const GOOGLE_MAPS_APIKEY = 'AIzaSyDIda-GmIFQuURB9c_iPRwMKOpmVu0xAsM';
  const bottomSheet = useRef();

  const ankaraCoords = {
    latitude: 39.925533,
    longitude: 32.866287,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  const istanbulCoords = {
    latitude: 41.015137,
    longitude: 28.979530,
    latitudeDelta: 10,
    longitudeDelta: 10,
  }

  console.log(distances)
  console.log(originAdress)
  console.log(destinationAdress)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => bottomSheet.current.show()}
        style={styles.button}
      >
        <Text>Show Distances</Text>
      </TouchableOpacity>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}  >
        <View style={styles.bottomSheetContainer}>
          <View>
            <Text style={styles.adressSubTitle}>Başlangıç Adresiniz:</Text>
            <Text style={styles.adressDescription}>{originAdress}</Text>
          </View>
          <View>
            <Text style={styles.adressSubTitle}>Varış Adresiniz:</Text>
            <Text style={styles.adressDescription}>{destinationAdress}</Text>
          </View>
          <Text>Mesafeniz: {distances} KM</Text>
        </View>
      </BottomSheet>
      <MapView
        style={styles.mapView}
        initialRegion={ankaraCoords}>
        <Marker
          coordinate={ankaraCoords}
          pinColor='#33ccff'
        />
        <Marker
          coordinate={istanbulCoords}
          pinColor='#e3e3e3'
        />
        <MapViewDirections
          origin={ankaraCoords}
          destination={istanbulCoords}
          apikey={GOOGLE_MAPS_APIKEY}
          language='tr'
          mode='DRIVING'
          strokeWidth={4}
          strokeColor='hotpink'
          onReady={res => {
            setDistances(res.distance)
            setOriginAdress(res.legs[0].start_address)
            setDestinationAdress(res.legs[0].end_address)
          }}
        />
      </MapView >
    </View>
  )
}

export default App