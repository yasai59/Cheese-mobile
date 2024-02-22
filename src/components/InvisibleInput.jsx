import React from "react";
import { TextInput } from "react-native";

import tw from "../../twrnc";

export const InvisibleInput = ({ className, type, value, onChange }) => {
  return (
    <TextInput
      style={tw`text-light ${className}`}
      secureTextEntry={type === "password"}
      value={value}
      onChangeText={onChange}
    />
  );
};
