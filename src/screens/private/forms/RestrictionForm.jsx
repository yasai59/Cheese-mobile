import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useContext, useEffect } from "react";
import tw from "../../../../twrnc";
import { AppContext } from "../../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const RestrictionForm = () => {
  const { restrictions } = useContext(AppContext);
  const navigate = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        ...tw`flex-1 bg-base-dark border-base-light`,
      }}
    >
      <View style={tw`flex-1 w-96 m-auto`}>
        <Text
          style={tw`text-primary text-lg underline`}
          onPress={() => {
            navigate.navigate("Cheese");
          }}
        >
          Skip form - restriction
        </Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
};
