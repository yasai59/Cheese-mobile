import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import tw from "../../../twrnc";
import { Image, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";
import { Input } from "../../components";

const Restaurant = ({
  restaurant,
  isFavourite = false,
  onFavorite = () => {},
  onPress,
}) => {
  return (
    <TouchableOpacity style={tw`bg-base w-47 rounded-lg p-5`} onPress={onPress}>
      <TouchableOpacity style={tw`self-end`} onPress={onFavorite}>
        {isFavourite ? (
          <FontAwesome name="star" size={24} style={tw`text-primary`} />
        ) : (
          <FontAwesome name="star-o" size={24} style={tw`text-light`} />
        )}
      </TouchableOpacity>
      <Image
        source={{
          uri: `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`,
        }}
        style={tw`w-16 h-16 rounded-xl mx-auto mt-2`}
      />
      <Text style={tw`text-lime-50 text-center mt-2`}>{restaurant.name}</Text>
      <Text style={tw`text-lime-50 text-center font-light`}>
        {restaurant.address}
      </Text>
    </TouchableOpacity>
  );
};

export const FavoriteRestaurantScreen = () => {
  const { favoriteRestaurants, addRestaurant, toggleFavorite } =
    useContext(AppContext);

  const navigation = useNavigation();

  const [search, setSearch] = useState("");

  const handlePress = (restaurant) => {
    addRestaurant(restaurant);
    navigation.navigate("Restaurant", { id: restaurant.id });
  };

  const handleFavorite = (restaurant) => {
    toggleFavorite(restaurant);
  };

  return (
    <ScrollView style={tw`flex-1 bg-base-dark p-3`}>
      <Text style={tw`text-light text-5xl font-bold`}>
        Favorite Restaurants
      </Text>
      <Text style={tw`text-light font-bold mt-3 mb-2`}>Search</Text>
      <Input
        type={"text"}
        placeholder={"Search"}
        value={search}
        onChange={(text) => setSearch(text)}
      />
      <View style={tw`flex-1 mt-5 gap-2 flex-row`}>
        {favoriteRestaurants
          .filter((res) => {
            return (
              res.name.toLowerCase().includes(search.toLowerCase()) ||
              res.address.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((restaurant) => (
            <Restaurant
              key={restaurant.id}
              restaurant={restaurant}
              isFavourite={true}
              onPress={() => handlePress(restaurant)}
              onFavorite={() => handleFavorite(restaurant)}
            />
          ))}
      </View>
    </ScrollView>
  );
};
