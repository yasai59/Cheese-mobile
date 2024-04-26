import React, { useContext } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import tw from "../../../twrnc";
import { StatusBar } from "expo-status-bar";
import { TouchableHighlight, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

export const YourRestaurantsScreen = () => {
  const navigation = useNavigation();

  const { restaurants, user } = useContext(AppContext);

  const handlePress = (id) => {
    navigation.navigate("Restaurant", { id });
  };

  // api/restaurant/profilephoto/:name
  return (
    <ScrollView style={tw`flex-1 bg-base-dark border-t border-base-light`}>
      <View style={tw`w-80 mx-auto mt-5`}>
        <Text style={tw`text-light text-4xl font-bold `}>Your Restaurants</Text>
        {!!restaurants ? (
          restaurants
            .filter((res) => res.owner_id == user.id)
            .map((restaurant) => {
              return (
                <TouchableOpacity
                  key={restaurant.id}
                  style={tw`bg-base my-2 p-2 flex flex-row rounded-lg`}
                  onPress={() => handlePress(restaurant.id)}
                >
                  <Image
                    source={{
                      uri: `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`,
                    }}
                    style={tw`w-20 h-20 rounded-lg mx-2 my-2`}
                  />
                  <View style={tw`flex items-end flex-1 justify-around mr-3`}>
                    <Text style={tw`text-light font-bold text-2xl text-right`}>
                      {restaurant.name}
                    </Text>
                    <Text style={tw`text-light font-thin text-right`}>
                      {restaurant.address}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
        ) : (
          <Text style={tw`text-light`}>You have no restaurants</Text>
        )}
        <TouchableHighlight
          underlayColor={tw`text-primary`["color"]}
          onPress={() => {
            navigation.navigate("AddRestaurant");
          }}
          style={tw`rounded-lg w-50 self-center mb-5`}
        >
          <View style={tw`bg-transparent border border-primary rounded-lg p-2`}>
            <Text style={tw`text-base text-center text-primary`}>
              + Add Restaurant
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <StatusBar style="light" />
    </ScrollView>
  );
};
