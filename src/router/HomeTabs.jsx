import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "../../twrnc";
import { ProfileScreen } from "../screens/private/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { YourRestaurantsScreen } from "../screens/private/YourRestaurantsScreen";
import { Discover } from "../screens/private/Discover";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <View
      style={{
        ...tw`flex-1 bg-base-dark border-t border-base-light`,
      }}
    >
      <Text style={tw`text-light`}>Home</Text>
      <StatusBar style="light" />
    </View>
  );
};

function MyTabBar({ state, descriptors, navigation }) {
  const { user } = useContext(AppContext);

  return (
    <View style={tw`flex-row`}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const color = tw`text-${isFocused ? "light" : "base-light"}`["color"];

        const icons = {
          Home: "home",
          History: "heart",
          Restaurants: "restaurant",
          Favorites: "star",
          Profile: "person",
        };

        return (
          <TouchableHighlight
            underlayColor="black"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tw`flex-1 bg-base-dark h-12 border-t border-base-light justify-center items-center`}
            key={label}
          >
            <Ionicons
              name={`${icons[label]}`}
              color={color}
              size={user.role_id === 2 ? 24 : 30}
            />
          </TouchableHighlight>
        );
      })}
    </View>
  );
}

export const HomeTabs = ({ navigation }) => {
  const { user } = useContext(AppContext);

  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        tabBarStyle: {
          ...tw`bg-base-dark border-t border-base-light`,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Discover}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="History"
        component={Home}
        options={{ headerShown: false }}
      />
      {user.role_id === 2 ? (
        <Tab.Screen
          name="Restaurants"
          component={YourRestaurantsScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <></>
      )}
      <Tab.Screen
        name="Favorites"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
