import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "../../twrnc";

export const Pill = ({
  active = false,
  onPress = () => {},
  text = "",
  className,
}) => {
  if (active) {
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={[tw`text-primary`["color"], tw`text-secondary`["color"]]}
          style={tw`p-2 rounded-full px-3`}
          start={{ x: 0, y: 0.4 }}
          end={{ x: 0.7, y: 1 }}
        >
          <Text style={tw`font-bold text-black text-base ${className}`}>
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{ ...tw`bg-base-light p-2 rounded-full px-3 ` }}
      onPress={onPress}
    >
      <Text style={tw`text-light text-base ${className}`}>{text}</Text>
    </TouchableOpacity>
  );
};
