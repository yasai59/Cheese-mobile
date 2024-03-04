import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "../../twrnc";
import { Feather } from "@expo/vector-icons";

export const AddRestaurantPhoto = () => {
  return (
    <TouchableOpacity
      style={tw`rounded-full border-2 aspect-square border-dashed border-light w-30 self-center justify-center items-center mt-3`}
    >
      <Feather name="plus" size={50} color={tw`text-light`.color} />
    </TouchableOpacity>
  );
};
