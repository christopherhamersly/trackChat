import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogIn from './LogIn.js';
import SignUp from './SignUp.js';
import Map from '../Map.js';

const Tab = createBottomTabNavigator();

function LoginNav() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="SignUp" component={SignUp} />
      <Tab.Screen name="LogIn" component={LogIn} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  </NavigationContainer>
  )
}


export default LoginNav;
