import React, { useContext } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import tw from "../../../twrnc";
import { View } from "react-native";
import { Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";

const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation();

  const { addRestaurant } = useContext(AppContext);

  const handlePress = (id) => {
    addRestaurant(restaurant);
    navigation.navigate("Restaurant", { id });
  };

  return (
    <TouchableOpacity
      style={tw`bg-base m-2 p-2 rounded-lg flex-row mx-10`}
      onPress={() => handlePress(restaurant.id)}
    >
      <Image
        source={{
          uri: `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`,
        }}
        style={tw`w-20 h-20 rounded-lg mx-2`}
      />
      <View style={tw`flex-col justify-between`}>
        <Text style={tw`text-light text-2xl font-bold`}>{restaurant.name}</Text>
        <Text style={tw`text-light text-lg`}>{restaurant.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const LikedRestaurants = ({ restaurants, handleNext }) => {
  return (
    <ScrollView style={tw`bg-base-dark`}>
      <Text style={tw`text-light text-4xl font-bold m-5`}>
        Selected {"\n"}Restaurants
      </Text>
      <View>
        {restaurants.map((restaurant) => {
          return <RestaurantItem restaurant={restaurant} key={restaurant.id} />;
        })}
      </View>
      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
          style={tw`border border-primary py-1 px-5 rounded-lg`}
          onPress={handleNext}
        >
          <Text style={tw`text-primary`}>Search more</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
