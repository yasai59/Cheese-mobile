import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { HomeTabs } from "./HomeTabs";
import { LoginScreen } from "../screens/LoginScreen";

export const AppRouter = () => {
  const Stack = createNativeStackNavigator();
  const { isLogged } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogged ? (
          <Stack.Screen name="Cheese" component={HomeTabs} />
        ) : (
          <Stack.Screen
            name="login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
