import React, { useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import styles from './App.Style'

import BottomSheet from 'react-native-gesture-bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const App = () => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDIda-GmIFQuURB9c_iPRwMKOpmVu0xAsM';
  const bottomSheet = useRef();
  const [adressList, setAdressList] = useState([])
  const [adressItem, setAdressItem] = useState([])

  const ankaraCoords = {
    latitude: 39.925533,
    longitude: 32.866287,
    latitudeDelta: 10,
    longitudeDelta: 10,
  }

  const cityCoords = [
    {
      cityName: 'İstanbul',
      coord: {
        latitude: 41.015137,
        longitude: 28.979530,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }
    },
    {
      cityName: 'Bursa',
      coord: {
        latitude: 40.193298,
        longitude: 29.074202,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }
    },
    {
      cityName: 'Samsun',
      coord: {
        latitude: 41.279703,
        longitude: 36.336067,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }
    }
  ]

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
            <Text style={styles.adressDescription}>{adressItem.originAdress} </Text>
          </View>
          <View>
            <Text style={styles.adressSubTitle}>Varış Adresiniz:</Text>
            <Text style={styles.adressDescription}>{adressItem.destinationAdress}</Text>
          </View>
          <Text>Mesafeniz: {adressItem.distances} KM</Text>
        </View>
      </BottomSheet>
      <MapView
        style={styles.mapView}
        initialRegion={ankaraCoords}>
        <Marker
          coordinate={ankaraCoords}
          pinColor='#33ccff'
        />
        {cityCoords.map((city) => {
          return (
            <>
              <Marker
                key={city.cityName}
                coordinate={city.coord}
              />
              <MapViewDirections
                key={city}
                origin={ankaraCoords}
                destination={city.coord}
                apikey={GOOGLE_MAPS_APIKEY}
                language='tr'
                mode='DRIVING'
                strokeWidth={4}
                strokeColor='hotpink'
                onReady={(res => {
                  setAdressItem(...adressItem,{
                    distances: res.distance,
                    originAdress: res.legs[0].start_address,
                    destinationAdress: res.legs[0].end_address
                  })
                })}
              />
            </>
          )
        })}

      </MapView >
    </View>
  )
}

export default App