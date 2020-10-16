import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from "react-native";

////////////////////////////////////////////////////////////////////
// Loading component renders while waiting for async functions
// to complete on Map.js and CreatGroup.js
////////////////////////////////////////////////////////////////////

function Loading() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/loadingdots.jpg')}
      />
    </View>
  )
}

////////////////////////////////////////////////////////////////////
// Styling
////////////////////////////////////////////////////////////////////

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading;
