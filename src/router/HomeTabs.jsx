import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "../../twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FormBtn } from "../components/FormBtn";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <View
      style={{
        ...tw`flex-1`,
      }}
    >
      <Text>Home</Text>
      <StatusBar style="light" />
    </View>
  );
};

const Profile = () => {
  const { logout } = useContext(AppContext);

  return (
    <View
      style={{
        ...tw`flex-1`,
      }}
    >
      <Text>profile</Text>
      <FormBtn
        title={"Log out"}
        handlePress={() => {
          logout();
        }}
      />
      <StatusBar style="light" />
    </View>
  );
};

export const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="History"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="restaurants"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
