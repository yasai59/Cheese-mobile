import React, { useContext } from "react";
import { Text, View } from "react-native";
import { FormBtn } from "../../components/FormBtn";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../../context/AppContext";
import tw from "../../../twrnc";

export const ProfileScreen = () => {
  const { logout } = useContext(AppContext);

  return (
    <View
      style={{
        ...tw`flex-1`,
      }}
    >
      <Text>profile</Text>
      <FormBtn
        title={"Log out"}
        handlePress={() => {
          logout();
        }}
      />
      <StatusBar style="light" />
    </View>
  );
};
