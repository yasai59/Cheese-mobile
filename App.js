import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { LoginScreen } from "./src/screens/LoginScreen";
import { AppProvider } from "./src/context/AppProvider";
import { AppRouter } from "./src/router/AppRouter";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
