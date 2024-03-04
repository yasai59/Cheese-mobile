import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { View, Animated } from "react-native";
import tw from "../../twrnc";

export const Loading = ({ isLoading = false }) => {
  // spin animation
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: (x) => x,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!isLoading) return <></>;

  return (
    <View
      style={tw`absolute z-10 bg-[#00000062] w-full h-full items-center justify-center`}
    >
      <View style={tw`bg-base rounded-2xl opacity-80`}>
        <Animated.View
          style={{
            ...tw`w-20 h-20 items-center justify-center`,
            transform: [{ rotate: spin }],
          }}
        >
          <EvilIcons
            name="spinner-3"
            size={50}
            color="white"
            style={{ ...tw`m-0 p-0 w-13 h-13 text-center` }}
          />
        </Animated.View>
      </View>
    </View>
  );
};
