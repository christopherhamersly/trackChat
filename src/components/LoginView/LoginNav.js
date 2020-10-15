import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Alert } from "react-native";

import LogIn from "./LogIn2.js";
import SignUp from "./SignUp.js";
import Map from "../Map.js";
import CreatGroup from "../CreatGroup";
import Chat from "../Chat";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function sosAlert() {
  Alert.alert("SEND SOS");
}

  const handleSOS = (sos) => {
    console.log("SOS");
    socket.emit("sosBroadcast", {
      username: props.username,
      location: { latitude: props.latitude, longitude: props.longitude },
      message: "sos",
    });
  };

function MapComponent() {
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
                  // onPress={handleSubmit(handleSOS, onError)}
                  onPress={() => sosAlert()}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ChatComponent() {
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
                  // onPress={handleSubmit(handleSOS, onError)}
                  onPress={() => sosAlert()}
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
        <Tab.Screen name="Map" component={MapComponent} />
        <Tab.Screen name="Create Group" component={CreatGroup} />
        <Tab.Screen name="Chat Window" component={ChatComponent} />
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

export default LoginNav;
