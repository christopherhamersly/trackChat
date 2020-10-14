import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogIn from './LogIn.js';
import SignUp from './SignUp.js';
import Map from '../Map.js';
import CreatGroup from '../CreatGroup';
import Chat from '../Chat'

const Tab = createBottomTabNavigator();

function LoginNav() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="SignUp" component={SignUp} />
        <Tab.Screen name="LogIn" component={LogIn} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Create Group" component={CreatGroup} />
        <Tab.Screen name="Chat Window" component={Chat} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default LoginNav;
