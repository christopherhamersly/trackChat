import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";
import SearchUsers from "./SearchBar";
import fakeDATA from "./FakeData";

const Add = () => {
  Alert.alert("Added to Group");
};
const Delete = () => {
  Alert.alert("Deleted to Group");
};

const Item = ({ item, style }) => (
  <View>
    <View key={fakeDATA.phone}>
      <TouchableOpacity style={[styles.item, style]}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.phone}</Text>
        <Button title={"Add to Group"} onPress={Add} />
        <Button title={"Delete to Group"} onPress={Delete} />
      </TouchableOpacity>
    </View>
  </View>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = "white";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SearchUsers />
        <View style={styles.linearGradient}>
          <FlatList
            data={fakeDATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  linearGradient: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});

export default App;
