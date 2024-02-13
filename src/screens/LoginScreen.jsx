import { Input } from "../components/Input";
import { FormBtn } from "../components/FormBtn";
import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import tw from "../../twrnc";
import { AppContext } from "../context/AppContext";

export const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    login(username, password);
  };

  return (
    <View style={tw`bg-base-dark flex-1 justify-center items-center`}>
      <Image
        source={require("../assets/logoFull.png")}
        style={tw`h-[20rem] aspect-square`}
      />
      <Text style={tw`text-primary text-3xl`}>Cheese V2.0</Text>
      <View>
        <Text style={tw`text-light mb-2`}>Username:</Text>
        <Input
          placeholder={"bob@yasai59.com"}
          className={"w-80 mb-8"}
          value={username}
          onChange={(text) => setUsername(text)}
        />
        <Text style={tw`text-light mb-2`}>Password: </Text>
        <Input
          placeholder={"***************"}
          className={"w-80 mb-8"}
          type={"password"}
          value={password}
          onChange={(text) => setPassword(text)}
        />
        <FormBtn title={"Log in"} handlePress={handlePress} />
      </View>
      <StatusBar style="light" />
    </View>
  );
};
