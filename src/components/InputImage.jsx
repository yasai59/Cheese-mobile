import React from "react";
import { View, Image } from "react-native";
import tw from "../../twrnc";
import { Input } from "./Input";

export const InputImage = ({
  image,
  value,
  setValue = () => {},
  placeholder = "URL",
}) => {
  return (
    <View style={tw`bg-base w-full h-15 rounded-lg flex-row items-center`}>
      <View style={tw`border-r border-base-light p-2`}>
        <Image source={image} style={tw`h-full aspect-square rounded-lg`} />
      </View>
      <Input
        placeholder={placeholder}
        className="text-light"
        onChange={(text) => setValue(text)}
        value={value}
        type={"text"}
      />
    </View>
  );
};
