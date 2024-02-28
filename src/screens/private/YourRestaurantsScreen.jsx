import React from "react";
import { ScrollView, Text, View } from "react-native";
import tw from "../../../twrnc";
import { StatusBar } from "expo-status-bar";
import { TouchableHighlight } from "react-native";

export const YourRestaurantsScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-base-dark border-t border-base-light`}>
      <View style={tw`w-80 mx-auto mt-5`}>
        <Text style={tw`text-light text-4xl font-bold`}>Your Restaurants</Text>
        <TouchableHighlight
          underlayColor={tw`text-primary`["color"]}
          onPress={() => {}}
          style={tw`rounded-lg`}
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
