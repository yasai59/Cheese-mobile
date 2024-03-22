import React from "react";
import { TextInput } from "react-native";

import tw from "../../twrnc";

export const Input = ({
  placeholder,
  className,
  type,
  value,
  onChange,
  multiline = false,
}) => {
  const types = {
    password: "text",
    phone: "tel",
    decimal: "decimal",
    text: "text",
  };

  return (
    <TextInput
      placeholder={placeholder}
      style={tw`input bg-base p-3 rounded-lg text-light ${className}`}
      secureTextEntry={type === "password"}
      value={value}
      onChangeText={onChange}
      inputMode={types[type] ?? "text"}
      placeholderTextColor={"#515451"}
      multiline={multiline}
    />
  );
};
