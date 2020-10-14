import React, { useEffect, useState } from 'react'
import { Dimensions, Form, Image, FlatList, Platform, StyleSheet, Switch, TabBarIOS, Text, TouchableOpacity, View, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import SignUp from './LoginView/SignUp.js';
import { useForm, Controller } from 'react-hook-form';
import socketIO from 'socket.io-client';


const socket = socketIO('https://trackchat.herokuapp.com')
// const socket = socketIO('http://localhost:3000')

function Chat() {

  const [chats, setChats] = useState();
  const [sos, setSos] = useState();
  const [help, setHelp] = useState();
  
  const { control, handleSubmit, handleserrors } = useForm();

  const onSubmit = (chat) => {
    console.log('Chat:', chat);
  }

  const handleSOS = (sos) => {
    console.log('SOS')
  }

  const handleHelp = (help) => {
    console.log('HELP')
    
  }

  const onError = (errors) => {
    console.log('Errors:', errors)
  }

  const addChatToWindow = (chat) => {
    console.log('chat', chat)
  }

  useEffect(() => {
    socket.on('chat', chats => {
      addChatToWindow(chats);
    })
  }, []);


  

  



  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Here</Text>
       <Text>Chat</Text>
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
        name={'chat'}
        defaultValue=''
      />
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleSubmit(onSubmit, onError)}>chat</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.sosbutton}>
          <Text style={styles.buttonText} onPress={handleSubmit(handleSOS, onError)}>S O S</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sosbutton}>
          <Text style={styles.buttonText} onPress={handleSubmit(handleHelp, onError)}> HELP </Text>
      </TouchableOpacity>
    </View>

    
    
    
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 300,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  input: {
    height: 50,
    width: 200,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#48BBEC',
  },
  buttonText: {
    fontSize: 14,
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
  sosbutton: {
    height: 36,
    backgroundColor: '#ff0000',
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
export default Chat;