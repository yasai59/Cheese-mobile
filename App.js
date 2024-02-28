import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCallback } from "react";
import { AppProvider } from "./src/context/AppProvider";
import { AppRouter } from "./src/router/AppRouter";
import { View } from "react-native";
import tw from "./twrnc";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  axios.defaults.baseURL = "http://192.168.1.180:3000";

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
    <View style={tw`bg-base-dark flex-1`} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </SafeAreaProvider>
    </View>
  );
}
