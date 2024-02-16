import React, { useState } from "react";
import { TouchableHighlight, View } from "react-native";
import tw from "../../twrnc";
import { Feather } from "@expo/vector-icons";

export const Checkbox = ({ checked, setChecked, className }) => {
  const handlePress = () => {
    setPressed(!pressed);
    if (setChecked) setChecked(!pressed);
  };

  const [pressed, setPressed] = useState(checked);

  return (
    <TouchableHighlight
      underlayColor="black"
      onPress={handlePress}
      style={tw`border-2 border-base-light rounded-lg p-2 w-12 h-12 ${
        pressed ? "bg-base-light" : ""
      } ${className}`}
    >
      <View style={tw`w-full h-full flex items-center justify-center`}>
        {pressed && <Feather name="check" size={22} color="#D6D6D6" />}
      </View>
    </TouchableHighlight>
  );
};
