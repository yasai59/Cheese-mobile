import React from "react";
import { Text, View } from "react-native";

import tw from "../../twrnc";
import { FormBtn } from "./FormBtn";

export const OptionButton = ({
  className,
  btnText,
  onPress,
  title,
  style = "",
}) => {
  return (
    <View style={tw`border-t border-base-light h-24`}>
      <Text style={tw`text-primary text-lg mt-2 ml-5 mb-2`}>{title}</Text>
      <View style={tw`flex-row ml-5`}>
        <FormBtn
          className={`bg-base py-0 ${style}`}
          handlePress={onPress}
          title={btnText}
          style={className}
        />
      </View>
    </View>
  );
};
