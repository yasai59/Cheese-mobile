import React, { useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../../twrnc";
import { Input } from "../components/Input";
import { FormBtn } from "../components/FormBtn";
import { Checkbox } from "../components/Checkbox";
import axios from "axios";
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

  const handleRegister = () => {
    if (!terms) return alert("You must accept terms & conditions");

    if (password !== repeat) return alert("Passwords do not match");

    if (!username || !email || !repeat || !password)
      return alert("All fields are required");

    const emailValid = /^\S+@\S+\.\S+$/.test(email);

    if (!emailValid) return alert("Invalid email");

    axios
      .post("/api/user", {
        user: {
          username,
          email,
          password,
          role_id: restaurant ? 2 : 1,
        },
      })
      .then((res) => {
        alert("User created successfully");
        navigation.goBack();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

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
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Checkbox checked={terms} setChecked={setTerms} />
          <Text style={tw`text-light text-right`}>
            I accept{" "}
            <Text style={tw`text-primary underline`}>terms & conditions</Text>{" "}
            of privacy
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Checkbox checked={news} setChecked={setNews} />
          <Text style={tw`text-light text-right`}>
            I would like to receive news about this service
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Checkbox checked={restaurant} setChecked={setRestaurant} />
          <Text style={tw`text-light text-right`}>
            I want to create an account only for managing a restaurant
          </Text>
        </View>
        <FormBtn
          title={"Register"}
          className={"mt-10"}
          handlePress={handleRegister}
        />
      </View>
    </View>
  );
};
