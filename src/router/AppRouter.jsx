import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { HomeTabs } from "./HomeTabs";
import { LoginScreen } from "../screens/LoginScreen";
import { RecoverPassword } from "../screens/RecoverPassword";
import tw from "../../twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUpScreen } from "../screens/SignUpScreen";
import { ChangeField, ChangePassword } from "../screens/private/ChangePassword";
import { TasteForm } from "../screens/private/forms/TasteForm";
import { RestrictionForm } from "../screens/private/forms/RestrictionForm";

export const AppRouter = () => {
  const { isLogged } = useContext(AppContext);
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogged ? (
          <>
            <Stack.Screen
              name="Cheese"
              component={HomeTabs}
              options={{
                headerStyle: tw`bg-base-dark`,
                headerTitleStyle: tw`text-primary font-bold text-3xl font-title`,
              }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TasteForm"
              component={TasteForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RestrictionForm"
              component={RestrictionForm}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="recoverPassword"
              options={{ headerShown: false }}
              component={RecoverPassword}
            />
            <Stack.Screen
              name="register"
              options={{ headerShown: false }}
              component={SignUpScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
