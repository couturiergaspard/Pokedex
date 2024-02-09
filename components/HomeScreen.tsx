import { View, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SearchBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    height: 128,
    width: 128,
  },
});