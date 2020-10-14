import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={[styles.item, style]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  return (
    <>
      <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 32,

    marginLeft: 110,
  },
});

export default App;
