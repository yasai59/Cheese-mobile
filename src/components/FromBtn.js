import React from "react";
import { Text, TouchableHighlight, View, Alert } from "react-native";
import tw from "../../twrnc";

export const FromBtn = ({ title, className }) => {
  const handlePress = () => {
    Alert.alert("Button pressed");
  };

  return (
    <TouchableHighlight underlayColor="black" onPress={handlePress}>
      <View style={tw`bg-primary rounded-lg p-2 ${className}`}>
        <Text style={tw`text-lg text-center`}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};
