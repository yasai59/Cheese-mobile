import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "../../../twrnc";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";

export const Discover = () => {
  const { tastes, restriction } = useContext(AppContext);

  const navigate = useNavigation();

  useEffect(() => {
    if (!tastes && !restriction) {
      console.log("aqui deberia saltar el form");
      navigate.navigate("TasteForm");
    }
  }, []);

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
