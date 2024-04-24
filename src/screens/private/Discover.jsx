import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "../../../twrnc";
import { RestaurantCard } from "./discoverComponents/RestaurantCard";
import { DraxProvider, DraxView } from "react-native-drax";

export const Discover = () => {
  const restaurants = [
    {
      id: 1,
      name: "Restaurant 1",
      address: "Address 1",
      creation_date: "2021-01-01",
      link_glovo: "https://glovoapp.com",
      link_ubereats: "https://ubereats.com",
      link_just_eat: "https://justeat.com",
      phone: "656265459",
      photo: "https://via.placeholder.com/150",
      description: "Description 1",
      active_suscription: false,
      carousel: [
        "Arnau2_26e31329-84cf-4dd0-8dfa-d941d4838a581712656945939.JPEG",
        "undefined_0c3aaa66-7e29-4a6a-a4ef-23d7ba0638aa1713255736225.jpg",
        "undefined_1c5c97a8-2863-4aa3-9298-b7fda5464faa1713256347910.jpeg",
        "undefined_6b47925f-b0a5-446d-81bb-21a59f41eb391713255636772.jpg",
      ],
      dishes: [
        {
          id: 1,
          name: "Dish 1",
          photo:
            "undefined_598779ff-0e60-4e61-8c6b-933d8e9540851713263884787.jpeg",
          description: "Description 1",
          price: 10,
          tastes: [{ id: 1, name: "Meat" }],
          restrictions: [{ id: 6, name: "Fruits" }],
        },
      ],
    },
  ];

  for (let i = 0; i < 100; i++) {
    console.log("");
  }

  return (
    <View
      style={{
        ...tw`flex-1 bg-base-dark border-t border-base-light`,
      }}
    >
      {restaurants.map((restaurant) => (
        <RestaurantCard restaurant={restaurant} key={restaurant.id} />
      ))}
      <StatusBar style="light" />
    </View>
  );
};
