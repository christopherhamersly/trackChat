import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { connect } from "react-redux";

import socketIO from "socket.io-client";
const socket = socketIO("https://trackchat.herokuapp.com");

////////////////////////////////////////////////////////////////////
// Chat component listens for chat events from the socket
// receives props from redux store to connect usernames to display
// Returns a rendered chat window and text input field
// Returns an SOS button which alerts all users to the position 
// of the individual requesting help
////////////////////////////////////////////////////////////////////

function Chat(props) {
  const [chats, setChats] = useState([]);

  const { control, handleSubmit, handleserrors } = useForm();

  const onSubmit = (chat) => {
    socket.emit("chatBroadcast", {
      username: props.username,
      message: chat.chat,
    });
  };

  const handleSOS = (sos) => {
    socket.emit("sosBroadcast", {
      username: props.username,
      location: { latitude: props.latitude, longitude: props.longitude },
      message: "sos",
    });
  };

  const onError = (errors) => {
    console.log("Errors:", errors);
  };

  useEffect(() => {
    socket.on("sos", (alert) => {
      (Alert.alert(alert.username, `Needs help! \n Located at: \n ${alert.location.latitude}, ${alert.location.longitude}`));
    });
  }, []);

  useEffect(() => {
    socket.on("chat", (chat) => {
      setChats((chats) => [...chats, chat]);
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style = {{ flex: 1, alignItems: "center", justifyContent: "center"}}
      behavior = "padding"
    >
      <ScrollView style={styles.chat}>
        {chats.map((chat, i) => (
          <Text style={styles.chatText} key={i}>
            {" "}
            {chat.username} : {chat.message}{" "}
          </Text>
        ))}
      </ScrollView>

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name={"chat"}
        defaultValue=""
      />
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={handleSubmit(onSubmit, onError)}
        >
          CHAT
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <MaterialCommunityIcons
          name="bell-alert-outline"
          size={50}
          color="red"
          style={styles.sos}
          onPress={handleSubmit(handleSOS, onError)}
        />
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
}

////////////////////////////////////////////////////////////////////
// Styling
////////////////////////////////////////////////////////////////////

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  footer: {
    height: 300,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  chat:{
    marginTop: 130,
    marginBottom: 20,
    backgroundColor: "#d8e4f0",
    paddingRight: 20,
    paddingLeft: 20,
    borderColor: "#6d6f70",
    width: width - 50,
    height: height -200,

  },
  chatText:{
    fontWeight: "300",
    fontFamily: 'Helvetica Neue',
    padding: 7,
    textAlign: 'justify'
    
  },
  input: {
    height: 50,
    width: width - 50,
    padding: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#48BBEC",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    alignSelf: "center",
    fontFamily: 'Helvetica Neue'
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    width: 100,
    justifyContent: "center",
  },
  sosbutton: {
    height: 36,
    backgroundColor: "#ff0000",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    width: 100,
    justifyContent: "center",
  },
  errors: {
    color: "red",
    marginTop: 2,
    marginBottom: 8,
    textAlign: "center",
  },
});

////////////////////////////////////////////////////////////////////
// Connection to Redux store
////////////////////////////////////////////////////////////////////

const mapStateToProps = (store) => {
  return {
    loggedIn: store.logReducer.loggedIn,
    username: store.logReducer.username,
    latitude: store.logReducer.latitude,
    longitude: store.logReducer.longitude,
  };
};

export default connect(mapStateToProps)(Chat);
