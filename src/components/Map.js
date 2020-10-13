import React, { useEffect, useState } from "react";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Switch,
  TabBarIOS,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import socketIO from 'socket.io-client';


const socket = socketIO('https://trackchat.herokuapp.com')

const Map = () => {
  const [locationPermissions, setLocationPermissions] = useState(false);
  const [locationResult, setLocationResult] = useState("");
  const [currentLocations, setCurrentLocations] = useState({});

  //key user: value: lat/lon
  const [everyonesPosition, setEveryonesPosition] = useState({});

  const grantLocationPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setCurrentLocation("Permission to access location was denied");
    } else {
      setLocationPermissions(true);
      getStartingPosition();
    }
  };

  const grabLocation = (latitude, longitude) => {
    // console.log(user, 'user')
    socket.emit('locationBroadcast', { user: 'users', latitude, longitude })
  }

  useEffect(() => {
    grantLocationPermissions();

  }, []);

  useEffect(() => {
    socket.on('location', location => {
      // console.log('location of a user:', location);
      // this is where we set everyones position
      addUsersToMap(location);
    })
  }, [])

  const addUsersToMap = (location) => {
    console.log('in add users to map')
    setEveryonesPosition({
      user: {
        latitude: location.latitude,
        longitude: location.longitude
      },
    })
    // console.log('added user to map: ', everyonesPosition)
  }
  
  const displayAllUsers = () => {
    grabLocation(location.coords.latitude, location.coords.longitude)
    console.log('displayall', location.coords.latitude)
    // one person signs in
    // everyonesPosition[user] = {lat, lon} 

  }



  const getStartingPosition = async () => {
    // console.log("------location test 1------");
    let location = await Location.getCurrentPositionAsync({});
    // console.log("------location test 2------");
    setLocationResult({ locationResult: JSON.stringify(location) });
    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);
    grabLocation(location.coords.latitude, location.coords.longitude);
    setCurrentLocations({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
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
          {/* <Marker
            coordinate={{ latitude: 47.6062, longitude: -122.3321 }}
            pinColor={"#C2BBF0"}
            title={"initialRegion"}
          /> */}

          {Object.keys(everyonesPosition).map(user =>
            <Marker.Animated
              coordinate={{
                latitude: everyonesPosition[user].latitude,
                longitude: everyonesPosition[user].longitude
              }}
              key={user}
              pinColor={pinColor}
              title={user}
            />
          )}
        </MapView>
      </View>
      <View style={styles.coords}>
        <Text>
          Location: {currentLocations.latitude}, {currentLocations.longitude}{" "}
        </Text>
      </View>
    </>
  );
};

// STYLING

let { height, width } = Dimensions.get("window");
let pinColor = "#AB73A1";

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
  },
});

function MapScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>CURRENTLY ON "MAP SCREEN"</Text>
      <Map />
    </View>
  );
}

export default MapScreen;
