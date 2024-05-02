import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCallback } from "react";
import { AppProvider } from "./src/context/AppProvider";
import { AppRouter } from "./src/router/AppRouter";
import { View } from "react-native";
import tw from "./twrnc";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { DraxProvider } from "react-native-drax";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  axios.defaults.baseURL = "http://192.168.209.83:3000";

  const [fontsLoaded, fontError] = useFonts({
    Anton: require("./assets/fonts/Anton.ttf"),
    Inter: require("./assets/fonts/Inter.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <GestureHandlerRootView
      style={tw`bg-base-dark flex-1`}
      onLayout={onLayoutRootView}
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <AppProvider>
            <AppRouter />
          </AppProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
