import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const SearchBar = ({ navigation }) => {
  const [text, setText] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    fetch("https://tyradex.vercel.app/api/v1/pokemon")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Réponse réseau non OK");
        }
        return response.text(); // Utilisez text() pour inspecter d'abord la réponse
      })
      .then((text) => {
        try {
          const data = JSON.parse(text); // Essayez de parser le texte en JSON
          setPokemons(data);
          //setFilteredPokemons(data);
        } catch (error) {
          console.error("Erreur de parsing JSON:", error);
          // Ici, vous pouvez gérer l'erreur ou afficher un message à l'utilisateur
        }
      })
      .catch((error) => console.error("Erreur de fetch:", error));
  }, []);

  useEffect(() => {
    if (text.length > 2) {
      const results = pokemons.filter((pokemon) =>
        pokemon.name.fr.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredPokemons(results);
    }
  }, [text, pokemons]);

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "#800200",
          borderWidth: 3,
          borderTopLeftRadius: 20,
          borderBottomEndRadius: 20,
          margin: 5,
        }}
        placeholder="Recherchez un Pokemon"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <FlatList
        data={filteredPokemons}
        renderItem={({ item }) => (
          <View style={{ flex: 1, paddingTop: 10 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Pokemon", {
                  pokedexId: item.pokedexId,
                })
              }
            >
              <Text style={{ padding: 10, fontSize: 18 }}>
                {item.name.fr} - {item.category}
              </Text>
              <Image
                source={{ uri: item.sprites.regular }}
                style={{ width: 120, height: 120, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.pokedexId.toString()}
      />
    </View>
  );
};

export default SearchBar;
