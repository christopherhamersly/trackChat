import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import { Dimensions, Image, Platform, StyleSheet, Switch, TabBarIOS, Text, TouchableOpacity, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from 'react-redux';


import MapScreen from './components/Map.js';
import SignUp from './components/EntryPoint.js';

import Chat from './components/Chat.js'

import FlatListDemo from './components/CreatGroup';


import store from './store/index'


const Tab = createBottomTabNavigator();

function App() {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component={SignUp} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Create Group" component={FlatListDemo} />
          <Tab.Screen name="Chat Window" component={Chat} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>

  );
}


export default App;