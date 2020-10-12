import React, { useEffect, useState } from 'react'
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { Dimensions, Image, Platform, StyleSheet, Switch, TabBarIOS, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const Map = () => {
  
  const [locationPermissions, setLocationPermissions] = useState(false);
  const [locationResult, setLocationResult] = useState('');
  const [currentLocation, setCurrentLocation] = useState({});

  const grantLocationPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setCurrentLocation('Permission to access location was denied');
    } else {
      setLocationPermissions(true);
      getCurrentPosition();
    }
  }

  useEffect(() => {
    grantLocationPermissions();
  }, []);

  
  const getCurrentPosition = async () => {
    console.log('------location test 1------');
    let location = await Location.getCurrentPositionAsync({});
    console.log('------location test 2------');
    setLocationResult({ locationResult: JSON.stringify(location)});
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
    setCurrentLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  }
  
  // const watchLocation = () => {
  //   let { coordinates } = currentLocation;

  //   navigator.geolocation.watchPosition(
  //     position => {
  //       let { latitude, longitude } = position.coords;
  //     }
  //   )
  // }

  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     if(Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     }
  //   }
  // })

    return(
      <>
      <View style={styles.container}>
        <MapView
           style={styles.map}
           initialRegion={{
             latitude: 47.6062,
             longitude: -122.3321,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
           }}
        >
          <Marker
            coordinate={{latitude: 47.6062, longitude: -122.3321}}
            pinColor={'#C2BBF0'}
            title={'initialRegion'}
          />
          <Marker.Animated
            coordinate={{latitude: currentLocation.latitude, longitude: currentLocation.longitude}}
            pinColor={pinColor}
            title={'@username'}
          />
        </MapView>
      </View>
      <View style={styles.coords}>
          <Text>Location: {currentLocation.latitude}, {currentLocation.longitude} </Text>
      </View>
      </>
      )
}

// STYLING

let {height, width} = Dimensions.get('window');
let pinColor = '#AB73A1';

const styles = StyleSheet.create({
  container: {
    height: height - 350,
    width: width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }, 
  coords: {
    height: 50,
  }
 })

export default Map;
