import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Alert } from "react-native";
import socketIO from "socket.io-client";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
const socket = socketIO("https://trackchat.herokuapp.com");

import LogIn from "./LogIn2.js";
import SignUp from "./SignUp.js";
import Map from "../Map.js";
import CreatGroup from "../CreatGroup";
import Chat from "../Chat";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// function sosAlert() {
//   Alert.alert("SEND SOS");
// }
function sosAlertMap(props) {
  const [sos, setSos] = useState();

  const { control, handleSubmit, handleserrors } = useForm();

  const handleSOS = (sos) => {
    console.log("SOS");
    socket.emit("sosBroadcast", {
      username: props.username,
      location: { latitude: props.latitude, longitude: props.longitude },
      message: "sos",
    });
  };

  const onError = (errors) => {
    console.log("Errors:", errors);
  };

  useEffect(() => {
    socket.on("sos", (alert) => {
      Alert.alert(
        alert.username,
        `needs help! Located at:${alert.location.latitude} ${alert.location.longitude}`
      );
      console.log(`${alert.username} needs help!`);
    });
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerTitle: "Map",
            headerRight: () => (
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="bell-alert-outline"
                  size={35}
                  color="red"
                  // style={styles.sos}
                  onPress={handleSubmit(handleSOS, onError)}
                  // onPress={() => sosAlert()}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function sosAlertChat(props) {
  const [sos, setSos] = useState();

  const { control, handleSubmit, handleserrors } = useForm();

  const handleSOS = (sos) => {
    console.log("SOS");
    socket.emit("sosBroadcast", {
      username: props.username,
      location: { latitude: props.latitude, longitude: props.longitude },
      message: "sos",
    });
  };

  const onError = (errors) => {
    console.log("Errors:", errors);
  };

  useEffect(() => {
    socket.on("sos", (alert) => {
      Alert.alert(
        alert.username,
        `needs help! Located at:${alert.location.latitude} ${alert.location.longitude}`
      );
      console.log(`${alert.username} needs help!`);
    });
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Map"
          component={Chat}
          options={{
            headerTitle: "Group Chat",
            headerRight: () => (
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="bell-alert-outline"
                  size={35}
                  color="red"
                  // style={styles.sos}
                  onPress={handleSubmit(handleSOS, onError)}
                  // onPress={() => sosAlert()}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginNav() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="SignUp" component={SignUp} />
        <Tab.Screen name="LogIn" component={LogIn} />
        <Tab.Screen name="Map" component={sosAlertMap} />
        <Tab.Screen name="Create Group" component={CreatGroup} />
        <Tab.Screen name="Chat Window" component={sosAlertChat} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (store) => {
  return {
    loggedIn: store.logReducer.loggedIn,
    username: store.logReducer.username,
    latitude: store.logReducer.latitude,
    longitude: store.logReducer.longitude,
  };
};

export default connect(mapStateToProps)(LoginNav);
