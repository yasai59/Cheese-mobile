import React, { useState } from "react";
import { Text, View } from "react-native";
import tw from "../../../twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "../../components/Input";
import { FormBtn } from "../../components/FormBtn";
import axios from "axios";

export const ChangePassword = ({ navigation }) => {
  const inset = useSafeAreaInsets();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangePassword = async () => {
    if (newPass !== repeatPass) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("/api/user/change-password", {
        oldPassword: currentPass,
        newPassword: newPass,
      });
      navigation.goBack();
    } catch (e) {
      console.log(e.response.data.message);
      alert("Error changing the password");
    }
  };

  return (
    <View
      style={{
        ...tw`bg-base-dark flex-1 items-center`,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}
    >
      <View style={tw`w-[85%] mt-24`}>
        <Text style={tw`text-primary mb-5`} onPress={handleBack}>
          {"<"}Back
        </Text>
        <Text style={tw`text-light text-5xl font-bold`}>
          Change your password
        </Text>
        <Text style={tw`text-light mt-5 ml-2 mb-2`}>Current password</Text>
        <Input
          placeholder="**************"
          value={currentPass}
          type={"password"}
          className={""}
          onChange={(text) => {
            setCurrentPass(text);
          }}
        />
        <Text style={tw`text-light mt-5 ml-2 mb-2`}>New password</Text>
        <Input
          placeholder="**************"
          value={newPass}
          type={"password"}
          className={""}
          onChange={(text) => {
            setNewPass(text);
          }}
        />
        <Text style={tw`text-light mt-5 ml-2 mb-2`}>Repeat new password</Text>
        <Input
          placeholder="**************"
          value={repeatPass}
          type={"password"}
          className={"mb-5"}
          onChange={(text) => {
            setRepeatPass(text);
          }}
        />
        <FormBtn
          title={"Change password"}
          className={"font-bold"}
          handlePress={handleChangePassword}
        />
      </View>
    </View>
  );
};
