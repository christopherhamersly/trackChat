import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { connect } from "react-redux";
import { location } from "../store/login";

import socketIO from "socket.io-client";
const socket = socketIO("https://trackchat.herokuapp.com");

import Loading from "../components/Loading.js";

////////////////////////////////////////////////////////////////////
// Map component receives props: username, loggedIn, color, location
// Renders a map view with pins representing logged in users and
// continues updating the location of the pins every 3 seconds
// based on users' socket-emitted latitude & longitude 
////////////////////////////////////////////////////////////////////

const Map = (props) => {
  const [locationPermissions, setLocationPermissions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocations, setCurrentLocations] = useState({});
  const [sosLocation, setSosLocation] = useState(null);
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
    props.location({ latitude, longitude });
    socket.emit("locationBroadcast", {
      user: props.loggedIn ? props.username : "user",
      latitude,
      longitude,
      color: props.color,
    });
  };

  useEffect(() => {
    grantLocationPermissions();
  }, []);

  useEffect(() => {
    socket.emit("join", { username: props.username || "user" });
    socket.on("location", (location) => {
      // Sets users' initial positions
      addUsersToMap(location);
    });
    socket.on("sos", (alert) => {
      setSosLocation({
        latitude: alert.location.latitude,
        longitude: alert.location.longitude,
        user: alert.username,
      });
    });
  }, []);

  const addUsersToMap = (location) => {

    setEveryonesPosition((oldObj) => ({
      ...oldObj,
      [location.user]: {
        latitude: location.latitude,
        longitude: location.longitude,
        color: location.color,
      },
    }));
  };

  const repeatingLocations = () => {
    setInterval(async () => {
      let location = await Location.getCurrentPositionAsync({});
      grabLocation(location.coords.latitude, location.coords.longitude);
    }, 3000);
  };

  const getStartingPosition = async () => {
    let location = await Location.getCurrentPositionAsync({});

    grabLocation(location.coords.latitude, location.coords.longitude);

    setCurrentLocations({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    setIsLoading(false);
    repeatingLocations();
  };

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocations.latitude,
              longitude: currentLocations.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {sosLocation && (
              <Marker.Animated
                coordinate={{
                  latitude: sosLocation.latitude,
                  longitude: sosLocation.longitude,
                }}
                key={sosLocation.user}
                pinColor="red"
                title={sosLocation.user}
              />
            )}

            {Object.keys(everyonesPosition).map((user) => (
              <Marker.Animated
                coordinate={{
                  latitude: everyonesPosition[user].latitude,
                  longitude: everyonesPosition[user].longitude,
                }}
                key={user}
                pinColor={everyonesPosition[user].color}
                title={user}
              />
            ))}
          </MapView>
        )}
      </View>
    </>
  );

};

////////////////////////////////////////////////////////////////////
// Styling
////////////////////////////////////////////////////////////////////

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height,
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
    marginHorizontal: "5%",
  },
});

function MapScreen(props) {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Map
          username={props.username}
          location={props.location}
          loggedIn={props.loggedIn}
          color={props.color}
        />
      </View>
    </>
  );
}

////////////////////////////////////////////////////////////////////
// Connection to Redux store
////////////////////////////////////////////////////////////////////

const mapStateToProps = (store) => {
  return {
    loggedIn: store.logReducer.loggedIn,
    username: store.logReducer.username,
    color: store.logReducer.color,
  };
};

const mapDispatchToProps = { location };

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
