import React from "react";
import { Text, View } from "react-native";
import tw from "../../twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const RecoverPassword = ({ navigation }) => {
  const inset = useSafeAreaInsets();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        ...tw`bg-base-dark flex-1 items-center`,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}
    >
      <View style={tw`w-[85%] mt-10`}>
        <Text style={tw`text-primary mb-5`} onPress={handleBack}>
          {"<"}Back
        </Text>
        <Text style={tw`text-light text-5xl font-bold`}>
          Recover your account
        </Text>
      </View>
    </View>
  );
};
