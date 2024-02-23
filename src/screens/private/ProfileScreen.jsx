import React, { useContext } from "react";
import { Image, Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../../context/AppContext";
import tw from "../../../twrnc";
import { InvisibleInput } from "../../components/InvisibleInput";
import { Option } from "../../components/Option";
import { OptionButton } from "../../components/OptionButton";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export const ProfileScreen = () => {
  const { logout, user, setUser } = useContext(AppContext);

  const navigate = useNavigation();

  const handleChangePassword = () => {
    navigate.navigate("ChangePassword");
  };

  const confirm = (title, body, onAccept, onCancel) => {
    Alert.alert(title, body, [
      {
        text: "Cancel",
        onPress: onCancel,
        style: "cancel",
      },
      { text: "Yes", onPress: onAccept },
    ]);
  };

  const handleRoleChange = () => {
    confirm(
      "Change account",
      `Are you sure you want to change your account to ${
        user.role_id === 1 ? "restaurant" : "client"
      }?`,
      async () => {
        const res = await axios.put("/api/user", {
          ...user,
          role_id: user.role_id === 1 ? 2 : 1,
        });

        setUser(res.data.userDb);
      },
      async () => {}
    );
  };

  const handleDeleteAccount = () => {
    confirm(
      "Delete account",
      "Are you sure you want to delete your account?",
      async () => {
        const res = await axios.delete("/api/user");
        logout();
      },
      async () => {}
    );
  };

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
      <Option title={"Email"} value={user.email} showBtn={false} />
      <Option
        title={"Password"}
        value={"********"}
        onPress={handleChangePassword}
      />
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
        onPress={handleRoleChange}
      />
      <OptionButton
        title={"Delete account"}
        btnText={"Delete account"}
        style="bg-red-500 w-40"
        className="text-light font-normal"
        onPress={handleDeleteAccount}
      />
      <StatusBar style="light" />
    </ScrollView>
  );
};
