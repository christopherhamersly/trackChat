import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Dimensions, Form, Image, FlatList, Platform, StyleSheet, Switch, TabBarIOS, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

function LogIn() {

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  }

  const onError = (errors) => {
    console.log('Errors:', errors)
  }

  return (
    <View style={styles.footer}>

      <Text>Username:</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={ value => onChange(value) }
          value={value}
          />
        )}
        name={'username'}
        rules={{required: true}}
        defaultValue=''
      />
      {errors.username && <Text style={styles.errors}>Please enter your username.</Text>}

      <Text>Password:</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={ value => onChange(value) }
          value={value}
          />
        )}
        name={'password'}
        rules={{required: true}}
        defaultValue=''
      />
      {errors.password && <Text style={styles.errors}>Please enter your password.</Text>}

      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleSubmit(onSubmit, onError)}>Login</Text>
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
    height: 300,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  input: {
    height: 25,
    width: 200,
    padding: 5,
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
  }, 
  errors: {
    color: 'red',
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center'
  }
});

export default LogIn;
