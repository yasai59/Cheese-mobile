import React from "react";
import { Text, TouchableHighlight, View, Image } from "react-native";
import tw from "../../twrnc";

export const LoginGoogle = ({ title, className, handlePress }) => {
  return (
    <TouchableHighlight underlayColor="black" onPress={handlePress}>
      <View style={tw`bg-base rounded-lg ${className} flex flex-row`}>
        <View
          style={tw`w-14 border-r border-base-light p-2 flex items-center justify-center`}
        >
          <Image
            source={require("../assets/google-logo.png")}
            style={tw`h-[2rem] w-[2rem] aspect-square border-r-2 `}
          />
        </View>
        <View style={tw`flex items-center flex-grow p-2 justify-center`}>
          <Text style={tw`text-center text-light`}>{title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
