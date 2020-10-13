import React, { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Form,
  Image,
  FlatList,
  Platform,
  StyleSheet,
  Switch,
  TabBarIOS,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
import { useForm } from "react-hook-form";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

const GroupAdd = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = (users) => {
    console.log("Group:", users);
    this.textInput.clear();
  };

  const { register, handleSubmit, setValue } = useForm();
  register("groupSearch");

  return (
    <View style={styles.centerText}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centerText}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Member to Group</Text>
            <TextInput
              ref={(input) => {
                this.textInput = input;
              }}
              placeholder={"Find by Phone Number"}
              name={"groupSearch"}
              onChangeText={(text) => {
                setValue("groupSearch", text);
              }}
            />
            <TouchableOpacity>
              <Text onPress={handleSubmit(onSubmit)}>Add Friend</Text>
            </TouchableOpacity>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Finished Adding to Group</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Create Group</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default GroupAdd;

// add color, add group members

// const getRandomColor = () => {
//   let hexcode = '#' + Math.random().toString(16).slice(2, 8);
//   return hexcode;
// }

// let color = getRandomColor();

