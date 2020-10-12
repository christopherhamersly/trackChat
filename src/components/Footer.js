import React, { useEffect, useState } from 'react'
import { Dimensions, Form, Image, FlatList, Platform, StyleSheet, Switch, TabBarIOS, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import SignUp from './SignUp.js';


function Footer() {

  return (
    <SignUp />
  )
}

export default Footer;