import MapView, { Marker, Polyline } from 'react-native-maps'
import * as Location from 'expo-location'
import * as React from 'react'
import { StyleSheet, Text, View , image} from 'react-native'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_KEY} from '@env'
const carImage= require('./assets/car.png')

export default function App() {
  const [origin, setOrigin] = React.useState({
    latitude: 27.2579,
    longtitude: 33.8116,
  })
  const [destination, setDestination] = React.useState({
    latitude: 27.2579,
    longtitude: 33.8116,
  })
  React.useEffect(()=>{
getLocationPermission()
  }, [])
  async function getLocationPermission() {
    let {status}  = await Location
    Location.requestForegroundPermissionsAsync()
    if (status !== 'granted')  {alert('permission denied'); return}
    let location = await Location.getCurrentPositionAsync({})
    const current = {
      latitude: location.coords.altitude,
      longitude: location.coords.longitude
    }
    setOrigin(current)

  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longtitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
      <Marker
        draggable
        coordinate={origin}
        image={carImage}
        onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
      />
      <Marker draggable coordinate={destination}
      onDragEnd={(direction)=> setDestination(direction.nativeEvent.coordinate)}
       />
       <MapViewDirections
       origin={origin}
       destination={destination}
       apikey={GOOGLE_MAPS_KEY}
       />
       {/* <Polyline
       coordinates={[origin, destination]}
       strokeColor='pink'
       strokeWidth={6}
       /> */}

      </MapView >
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
