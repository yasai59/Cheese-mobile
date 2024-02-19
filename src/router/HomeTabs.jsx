import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "../../twrnc";
import { ProfileScreen } from "../screens/private/ProfileScreen";

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

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          ...tw`bg-base-dark border-t border-base-light`,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#999",
        tabBarIcon: ({ focused, color, size }) => {
          return <Text>Hola</Text>;
        },
      }}
    >
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
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
