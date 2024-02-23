import React from "react";
import { Text, View } from "react-native";

import tw from "../../twrnc";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const Option = ({ value, title, showBtn = true, onPress }) => {
  return (
    <View
      style={tw`border-t border-base-light h-20 flex-row justify-between pr-7 items-center`}
    >
      <View>
        <Text style={tw`text-primary text-lg mt-2 ml-5`}>{title}</Text>
        <Text style={tw`text-light text-lg ml-5`}>{value}</Text>
      </View>
      {showBtn && (
        <TouchableOpacity
          style={tw`flex items-center justify-center bg-base py-2 px-5 rounded-lg`}
          onPress={onPress}
        >
          <Ionicons name="pencil" size={24} color={tw`text-light`["color"]} />
        </TouchableOpacity>
      )}
    </View>
  );
};
