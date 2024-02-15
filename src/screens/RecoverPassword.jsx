import React, { useState } from "react";
import { Text, View } from "react-native";
import tw from "../../twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "../components/Input";
import { FormBtn } from "../components/FormBtn";

export const RecoverPassword = ({ navigation }) => {
  const inset = useSafeAreaInsets();
  const [email, setEmail] = useState("");

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
      <View style={tw`w-[85%] mt-24`}>
        <Text style={tw`text-primary mb-5`} onPress={handleBack}>
          {"<"}Back
        </Text>
        <Text style={tw`text-light text-5xl font-bold`}>
          Recover your account
        </Text>
        <Text style={tw`text-light mt-5 ml-2 mb-2`}>Email</Text>
        <Input
          placeholder="e.x bob@yasai59.com"
          value={email}
          className={"mb-5"}
          onChange={(text) => {
            setEmail(text);
          }}
        />
        <FormBtn title={"Recover"} className={"font-bold"} />
        <Text style={tw`text-base-light mt-5`}>
          If an account with that mail exists we will send you a link to recover
          your account
        </Text>
      </View>
    </View>
  );
};
