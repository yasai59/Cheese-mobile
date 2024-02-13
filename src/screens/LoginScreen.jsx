import tw from "../../twrnc";
import { Input } from "../components/Input";
import { FormBtn } from "../components/FromBtn";
import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export const LoginScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("home");
  };

  return (
    <View style={tw`bg-base-dark flex-1 justify-center items-center`}>
      <Image
        source={require("../assets/logoFull.png")}
        style={tw`h-[24rem] aspect-square`}
      />
      <Text style={tw`text-primary text-3xl`}>Cheese V2.0</Text>
      <View>
        <Text style={tw`text-light mb-2`}>Username:</Text>
        <Input placeholder={"bob@yasai59.com"} className={"w-80 mb-8"} />
        <Text style={tw`text-light mb-2`}>Password: </Text>
        <Input
          placeholder={"***************"}
          className={"w-80 mb-8"}
          type={"password"}
        />
        <FormBtn title={"Log in"} handlePress={handlePress} />
      </View>
      <StatusBar style="light" />
    </View>
  );
};
