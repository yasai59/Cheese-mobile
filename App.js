import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppProvider } from "./src/context/AppProvider";
import { AppRouter } from "./src/router/AppRouter";

export default function App() {
  axios.defaults.baseURL = "http://192.168.175.83:3000";

  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </SafeAreaProvider>
  );
}
