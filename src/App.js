import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import { Dimensions, Image, Platform, StyleSheet, Switch, TabBarIOS, Text, TouchableOpacity, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AddGroupTab from './components/GroupAdd.js';
import MapScreen from './components/Map.js';
import SignUp from './components/EntryPoint.js';
import LogIn from './components/LoginView/LogIn.js';

import LoginNav from './components/LoginView/LoginNav.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    // when not logged in display LoginNav
    <LoginNav />

    // when logged in display Map
    // <MapScreen />
  );
}


export default App;