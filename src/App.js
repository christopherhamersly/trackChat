import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import { Dimensions, Image, Platform, StyleSheet, Switch, TabBarIOS, Text, TouchableOpacity, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Map from './components/Map.js';
import Footer from './components/Footer.js';

export default function App() {
  return (
    <>
      {/* <Map /> */}
      <Footer />
    </>
  );
}