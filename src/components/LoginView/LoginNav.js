import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from './LogIn2.js';
import SignUp from './SignUp.js';
import Map from '../Map.js';
import CreatGroup from '../CreatGroup';
import Chat from '../Chat'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// HELP LINK https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
function Root() {
  return (
    // <NavigationContainer independent={true}>
      <Tab.Navigator>
        {/* <Tab.Screen name="SignUp" component={SignUp} /> */}
        {/* <Tab.Screen name="LogIn" component={LogIn} /> */}
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Create Group" component={CreatGroup} />
        <Tab.Screen name="Chat Window" component={Chat} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

function HideTabBar() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="userIsIn" component={Root} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default HideTabBar;
