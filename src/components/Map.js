import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import {
  Alert,
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
import socketIO from "socket.io-client";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const socket = socketIO("https://trackchat.herokuapp.com");

const Map = () => {
  const [locationPermissions, setLocationPermissions] = useState(false);
  const [locationResult, setLocationResult] = useState("");
  const [currentLocations, setCurrentLocations] = useState({});

  //key user: value: lat/lon
  const [everyonesPosition, setEveryonesPosition] = useState({});

  const grantLocationPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setCurrentLocations("Permission to access location was denied");
    } else {
      setLocationPermissions(true);
      getStartingPosition();
    }
  };

  const grabLocation = (latitude, longitude) => {
    // console.log(user, 'user')
    socket.emit("locationBroadcast", { user: "user", latitude, longitude });
    // socket.emit('locationBroadcast', { user: 'fake', latitude: 47.61625, longitude: -122.3119 })
  };

  useEffect(() => {
    grantLocationPermissions();
  }, []);

  useEffect(() => {
    socket.on("location", (location) => {
      // console.log('location of a user:', location);
      // this is where we set everyones position
      addUsersToMap(location);
    });
  }, []);

  const addUsersToMap = (location) => {
    console.log("in add users to map", location.user);

    setEveryonesPosition((oldObj) => ({
      ...oldObj,
      [location.user]: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    }));
  };

  const repeatingLocations = () => {
    setInterval(async () => {
      console.log("in interval");
      let location = await Location.getCurrentPositionAsync({});
      grabLocation(location.coords.latitude, location.coords.longitude);
    }, 3000);
  };

  useEffect(() => {
    console.log("every position in use effect", everyonesPosition);
  }, [everyonesPosition]);

  const getStartingPosition = async () => {
    let location = await Location.getCurrentPositionAsync({});

    // setLocationResult({ locationResult: JSON.stringify(location) });

    grabLocation(location.coords.latitude, location.coords.longitude);

    setCurrentLocations({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    repeatingLocations();
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
          {Object.keys(everyonesPosition).map((user) => (
            <Marker.Animated
              coordinate={{
                latitude: everyonesPosition[user].latitude,
                longitude: everyonesPosition[user].longitude,
              }}
              key={user}
              pinColor={pinColor}
              title={user}
            />
          ))}
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

// add color, add group members

const getRandomColor = () => {
  let hexcode = "#" + Math.random().toString(16).slice(2, 8);
  return hexcode;
};
let pinColor = getRandomColor();

let { height, width } = Dimensions.get("window");

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
  sos: {
    marginTop: 65,
    marginHorizontal: '5%',
  },
});

function sosAlert() {
  Alert.alert(
    'SEND SOS'
  )
}

function MapScreen() {
  return (
    <>
      <MaterialCommunityIcons
        name="bell-alert-outline"
        size={50}
        color="red"
        style={styles.sos}
        onPress={() => sosAlert()}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>CURRENTLY ON "MAP SCREEN"</Text>
        <Map />
      </View>
    </>
  );
}

export default MapScreen;
