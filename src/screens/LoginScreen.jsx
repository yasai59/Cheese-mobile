import { Input } from "../components/Input";
import { FormBtn } from "../components/FormBtn";
import { Image, Text, View, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import tw from "../../twrnc";
import { AppContext } from "../context/AppContext";
import { LoginGoogle } from "../components/LoginGoogle";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { Loading } from "../components/Loading";

export const LoginScreen = ({ navigation }) => {
  const { login, loginToken } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    login(username, password)
      .then((res) => {
        setError(res);
      })
      .catch((e) => {
        setError("Error connecting to the server");
      });
  };

  const handleRegister = () => {
    navigation.navigate("register");
  };

  const handleForgotPassword = () => {
    navigation.navigate("recoverPassword");
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "92194054763-kcbdgjt4fesd0httgb3hi4solt7aqmrm.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setIsLoading(true);
      const { email, name, photo, id: userId } = userInfo.user;
      const idToken = userInfo.idToken;
      axios
        .post("/api/user/google", { email, name, photo, userId, idToken })
        .then((res) => {
          loginToken(res.data.token, res.data.user);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return (
    <View style={tw`bg-base-dark flex-1 justify-center items-center`}>
      <Image
        source={require("../assets/logoFull.png")}
        style={tw`h-[20rem] aspect-square`}
      />
      <Loading isLoading={isLoading} />
      <Text style={tw`text-red-500 mb-5`}>{error}</Text>
      <LoginGoogle
        title="Log in with google"
        className={"w-80"}
        handlePress={handleGoogleLogin}
      />
      <View style={tw`flex flex-row items-center my-5 w-80`}>
        <View style={tw`bg-base-light flex-grow h-[1px]`}></View>
        <Text style={tw`text-base-light px-3`}>Or</Text>
        <View style={tw`bg-base-light flex-grow h-[1px]`}></View>
      </View>
      <View>
        <Input
          placeholder={"bob@yasai59.com"}
          className={"w-80 mb-5"}
          value={username}
          onChange={(text) => setUsername(text)}
        />
        <Input
          placeholder={"***************"}
          className={"w-80 mb-8"}
          type={"password"}
          value={password}
          onChange={(text) => setPassword(text)}
        />
        <FormBtn title={"Log in"} handlePress={handlePress} />
        <Text
          style={tw`text-primary underline text-right mt-3`}
          onPress={handleForgotPassword}
        >
          Can't remember your password?
        </Text>
        <Text
          style={tw`text-primary underline text-right mt-3`}
          onPress={handleRegister}
        >
          Create an account
        </Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
};
