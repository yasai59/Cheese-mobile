import { Text } from "@rneui/base";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "../../twrnc";
import { LinearGradient } from "expo-linear-gradient";

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
              {selectedOptions.includes(option.id) ? (
                <TouchableOpacity onPress={() => handlePress(option.id)}>
                  <LinearGradient
                    colors={[
                      tw`text-primary`["color"],
                      tw`text-secondary`["color"],
                    ]}
                    style={tw`p-2 rounded-full px-3`}
                    start={{ x: 0, y: 0.4 }}
                    end={{ x: 0.7, y: 1 }}
                  >
                    <Text style={tw`font-bold text-base-light`}>
                      {option.name}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ ...tw`bg-base-light p-2 rounded-full px-3` }}
                  onPress={() => handlePress(option.id)}
                >
                  <Text style={tw`text-light`}>{option.name}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
    </View>
  );
};
