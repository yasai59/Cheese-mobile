import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import tw from "../../../twrnc";
import { Image, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";

const Restaurant = ({
  restaurant,
  isFavourite = false,
  onFavorite = () => {},
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={tw`bg-base rounded-lg p-5 aspect-square overflow-hidden`}
      onPress={onPress}
    >
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

export const LikedRestaurantsScreen = () => {
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const navigation = useNavigation();
  const { addRestaurant, favoriteRestaurants, toggleFavorite } =
    useContext(AppContext);

  useEffect(() => {
    axios.get("/api/restaurant/liked-restaurants").then((res) => {
      setLikedRestaurants(res.data);
    });
  }, []);

  const handlePress = (restaurant) => {
    addRestaurant(restaurant);
    navigation.navigate("Restaurant", { id: restaurant.id });
  };

  const handleFavorite = (restaurant) => {
    toggleFavorite(restaurant);
  };

  return (
    <ScrollView style={tw`flex-1 bg-base-dark p-3`}>
      <Text style={tw`text-light text-4xl font-bold`}>Liked history</Text>
      <Text style={tw`text-light text-lg font-light`}>
        Here are your last 20 likes
      </Text>
      <View style={tw`flex-row flex-wrap gap-2 mt-8 justify-center`}>
        {likedRestaurants.slice(0, 20).map((restaurant) => (
          <Restaurant
            key={restaurant.id}
            restaurant={restaurant}
            onPress={() => handlePress(restaurant)}
            onFavorite={() => handleFavorite(restaurant)}
            isFavourite={favoriteRestaurants.some(
              (r) => r.id === restaurant.id
            )}
          />
        ))}
      </View>
      <View style={tw`h-10`}></View>
    </ScrollView>
  );
};
