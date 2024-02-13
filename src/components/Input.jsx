import React from "react";
import { TextInput } from "react-native";

import tw from "../../twrnc";

export const Input = ({ placeholder, className, type, value, onChange }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={tw`input bg-base p-3 rounded-lg text-light ${className}`}
      secureTextEntry={type === "password"}
      value={value}
      onChangeText={onChange}
      placeholderTextColor={"#515451"}
    />
  );
};
