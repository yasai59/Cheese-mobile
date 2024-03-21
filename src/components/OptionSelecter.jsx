import { Text } from "@rneui/base";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "../../twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { Pill } from "./Pill";

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
  filter = "",
}) => {
  const handlePress = (id) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  return (
    <View style={tw`flex flex-row gap-2 flex-wrap`}>
      {options
        .filter((val) => val.name.toLowerCase().includes(filter.toLowerCase()))
        .map((option) => {
          return (
            <View key={option.id}>
              <Pill
                active={selectedOptions.includes(option.id)}
                key={option.id}
                onPress={() => handlePress(option.id)}
                text={option.name}
              />
            </View>
          );
        })}
    </View>
  );
};
