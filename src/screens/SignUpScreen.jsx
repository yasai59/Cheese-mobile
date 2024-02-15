import React, { useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../../twrnc";
import { Input } from "../components/Input";
import { FormBtn } from "../components/FormBtn";
import { Checkbox } from "../components/Checkbox";
export const SignUpScreen = ({ navigation }) => {
  const inset = useSafeAreaInsets();
  const handleBack = () => {
    navigation.goBack();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [repeat, setRepeat] = useState("");

  const [terms, setTerms] = useState(false);
  const [news, setNews] = useState(false);
  const [restaurant, setRestaurant] = useState(false);

  return (
    <View
      style={{
        ...tw`bg-base-dark flex-1 items-center`,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}
    >
      <View style={tw`w-[85%] mt-5`}>
        <Text style={tw`text-primary mb-5`} onPress={handleBack}>
          {"<"}Back
        </Text>
        <Text style={tw`text-light text-5xl font-bold`}>Sign up</Text>
        <Text style={tw`text-light mt-5 ml-2 mb-2`}>Username</Text>
        <Input
          placeholder="e.x Bob"
          value={username}
          onChange={(text) => {
            setUsername(text);
          }}
        />
        <Text style={tw`text-light mt-5 ml-2 mb-2`}>Email</Text>
        <Input
          placeholder="e.x bob@yasai59.com"
          value={email}
          onChange={(text) => {
            setEmail(text);
          }}
        />
        <Text style={tw`text-light mt-5 ml-2 mb-2`}>Password</Text>
        <Input
          placeholder="****************"
          value={password}
          type={"password"}
          onChange={(text) => {
            setPassword(text);
          }}
        />
        <Text style={tw`text-light mt-5 ml-2 mb-2`}>Repeat password</Text>
        <Input
          placeholder="****************"
          value={repeat}
          type={"password"}
          onChange={(text) => {
            setRepeat(text);
          }}
        />
        <Checkbox checked={terms} setChecked={setTerms} />
        <Checkbox checked={news} setChecked={setNews} />
        <Checkbox checked={restaurant} setChecked={setRestaurant} />
        <FormBtn title={"Register"} className={"mt-10"} />
      </View>
    </View>
  );
};
