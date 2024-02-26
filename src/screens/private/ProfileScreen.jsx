import React, { useContext, useState } from "react";
import { Image, Text, Alert, TouchableOpacity, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../../context/AppContext";
import tw from "../../../twrnc";
import { InvisibleInput } from "../../components/InvisibleInput";
import { Option } from "../../components/Option";
import { OptionButton } from "../../components/OptionButton";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

export const ProfileScreen = () => {
  const { logout, user, setUser, token } = useContext(AppContext);

  const navigate = useNavigation();

  const [username, setUsername] = useState(user.username);

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

  const handleChangeUsername = () => {
    // test username
    if (username.length < 3) {
      Alert.alert("Username must be at least 3 characters long");
      return;
    }

    confirm(
      "Change username",
      `Are you sure you want to change your username to ${username}?`,
      async () => {
        try {
          const res = await axios.put("/api/user", {
            ...user,
            username,
          });
          setUser(res.data.userDb);
        } catch (e) {
          if (e.response.status === 400) {
            Alert.alert(
              "A user with that username already exists. Please choose another one."
            );
            setUsername(user.username);
          } else {
            Alert.alert("An error occurred. Please try again later.");
          }
        }
      },
      async () => {
        setUsername(user.username);
      }
    );
  };

  const handleChangePhoto = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (doc.canceled) return;
      const image = doc.assets[0];

      const data = new FormData();

      data.append("photo", {
        name: image.uri.split("/").pop(),
        type: image.mimeType,
        uri:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
        size: image.size,
      });

      const res = await axios.post("/api/user/photo", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data.user);

      setUser(res.data.user);
    } catch (e) {
      alert("error changing the photo");
      console.log(e);
    }
  };

  return (
    <ScrollView style={tw`flex-1 flex bg-base-dark border-t border-base-light`}>
      <Text style={tw`text-light text-4xl font-bold mt-5 ml-5`}>
        Your profile
      </Text>
      <TouchableOpacity onPress={handleChangePhoto}>
        <Image
          source={{
            uri: axios.defaults.baseURL + "/api/user/photo",
            method: "GET",
            headers: {
              "x-token": token,
            },
          }}
          style={tw`w-32 h-32 rounded-full self-center mt-5 mb-5`}
        />
      </TouchableOpacity>
      <InvisibleInput
        value={username}
        onChange={(text) => {
          setUsername(text);
        }}
        className={"text-3xl self-center mb-5"}
      />
      <TouchableOpacity
        style={tw`${user.username === username ? "hidden" : "mb-5"}`}
        onPress={handleChangeUsername}
      >
        <Text style={tw`text-blue-500 text-sm self-center`}>
          Change username
        </Text>
      </TouchableOpacity>
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
