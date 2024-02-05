import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";

import tw from "./twrnc";
import { Input } from "./src/components/Input";
import { FromBtn } from "./src/components/FromBtn";

export default function App() {
  return (
    <View style={tw`bg-base-dark flex-1 justify-center items-center`}>
      <Image
        source={require("./src/assets/logoFull.png")}
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
        <FromBtn title={"Log in"} />
      </View>
      <StatusBar style="light" />
    </View>
  );
}
