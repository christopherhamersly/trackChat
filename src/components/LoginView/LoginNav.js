import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import LogIn from "./LogIn2.js";
import SignUp from "./SignUp.js";
import Map from "../Map.js";
import CreatGroup from "../CreatGroup";
import Chat from "../Chat";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MapScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Map />
    </View>
  );
}

function Testing() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MapScreen}
          options={{ title: "Map" }}
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
        <Tab.Screen name="Map" component={Testing} />
        <Tab.Screen name="Create Group" component={CreatGroup} />
        <Tab.Screen name="Chat Window" component={Chat} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default LoginNav;
// import * as React from "react";
// import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// const Stack = createStackNavigator();

// function MapScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={MapScreen}
//           options={{ title: "My home" }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
