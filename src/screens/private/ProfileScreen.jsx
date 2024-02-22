import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../../context/AppContext";
import tw from "../../../twrnc";
import { InvisibleInput } from "../../components/InvisibleInput";
import { Option } from "../../components/Option";
import { OptionButton } from "../../components/OptionButton";
import { ScrollView } from "react-native";

export const ProfileScreen = () => {
  const { logout, user } = useContext(AppContext);

  return (
    <ScrollView style={tw`flex-1 flex bg-base-dark border-t border-base-light`}>
      <Text style={tw`text-light text-4xl font-bold mt-5 ml-5`}>
        Your profile
      </Text>
      <Image
        source={require("../../assets/gato.png")}
        style={tw`w-32 h-32 rounded-full self-center mt-5 mb-5`}
      />
      <InvisibleInput
        value={user.username}
        className={"text-3xl self-center mb-5"}
      />
      <Option title={"Email"} value={user.email} />
      <Option title={"Password"} value={"********"} />
      <Option title={"Tastes"} value={"********"} />
      <Option title={"Restrictions"} value={"********"} />
      <OptionButton
        title={"Log out"}
        btnText={"Log out"}
        style=""
        className="text-light font-normal"
        onPress={() => {
          logout();
        }}
      />
      <OptionButton
        title={"Change profile"}
        btnText={`Change to ${
          user.role_id === 1 ? "restaurant" : "client"
        } account`}
        style="px-5"
        className="text-light font-normal"
        onPress={() => {}}
      />
      <OptionButton
        title={"Delete account"}
        btnText={"Delete account"}
        style="bg-red-500 w-40"
        className="text-light font-normal"
        onPress={() => {}}
      />
      <StatusBar style="light" />
    </ScrollView>
  );
};
