import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import tw from "../../twrnc";

export const FormBtn = ({ title, className, handlePress }) => {
  return (
    <TouchableHighlight underlayColor="black" onPress={handlePress}>
      <View style={tw`bg-primary rounded-lg p-2 ${className}`}>
        <Text style={tw`text-xl text-center font-bold`}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};
