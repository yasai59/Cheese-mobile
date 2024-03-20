import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "../../../twrnc";

export const Discover = () => {
  for (let i = 0; i < 100; i++) {
    console.log("");
  }

  return (
    <View
      style={{
        ...tw`flex-1 bg-base-dark border-t border-base-light`,
      }}
    >
      <Text style={tw`text-light`}>Discover</Text>
      <StatusBar style="light" />
    </View>
  );
};
