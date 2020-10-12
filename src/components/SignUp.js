import React, { useEffect, useState } from 'react';
import { Alert, Button, Dimensions, Form, Image, FlatList, Platform, StyleSheet, Switch, TabBarIOS, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';

function SignUp() {

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  }

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register('username');
    register('phone');
    register('email');
    register('password');
  }, [register])

  return (
    <View style={styles.footer}>

      <Text>Username:</Text>
      <TextInput style={styles.input} onChangeText={text => {
        setValue('username', text);
      }} />

      {/* should not already exist in database, should be 10 digit number */}
      <Text>Phone Number:</Text>
      <TextInput style={styles.input} onChangeText={text => {
        setValue('phone', text);
      }} />

      {/* alphanumeric characters & specific special characters allowed, separated by @, alpha, '.', alpha[2-3] */}
      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={text => {
        setValue('email', text);
      }} />

      <Text>Password:</Text>
      <TextInput style={styles.input} onChangeText={text => {
        setValue('password', text);
      }} />

      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleSubmit(onSubmit)}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

// const getRandomColor = () => {
//   let hexcode = '#' + Math.random().toString(16).slice(2, 8);
//   return hexcode;
// }

// let color = getRandomColor();

const styles = StyleSheet.create({
  footer: {
    height: 400,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  input: {
    height: 25,
    width: 80,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#48BBEC',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    width: 100,
    justifyContent: 'center'
  }
});

export default SignUp;
