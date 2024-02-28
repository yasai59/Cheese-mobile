import { Text } from "@rneui/base";
import React from "react";
import { View } from "react-native";

// an option should look like this:
// {
//   id: 1,
//   name: "option name",
// }

// selectedOptions should look like this:
// [1,2,3,4,5,6,7,8,9]

export const OptionSelecter = ({
  options = [],
  selectedOptions,
  setSelectedOptions,
}) => {
  return (
    <View>
      <Text>Option selecter</Text>
    </View>
  );
};
