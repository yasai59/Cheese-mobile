import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "../../../twrnc";
import { RestaurantCard } from "./discoverComponents/RestaurantCard";
import { useContext, useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import axios from "axios";
import { LikedRestaurants } from "./LikedRestaurants";
import { AppContext } from "../../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";

export const Discover = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [arrLiked, setArrLiked] = useState([]);
  const [final, setFinal] = useState(false);
  const [movement, setMovement] = useState(0);

  const [activeRestaurant, setActiveRestaurant] = useState(0);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setFinal(false);
    setArrLiked([]);
    setActiveRestaurant(0);
    setRestaurants([]);
    axios.get("/api/restaurant/getRecommendations").then((res) => {
      if (res.data.recomendations.length == 0) {
        return setRestaurants("No restaurants found");
      }
      setRestaurants(res.data.recomendations);
    });
  }, [update]);

  const handleUpdate = () => {
    setUpdate((prev) => !prev);
  };

  const goNext = (liked = false) => {
    if (liked) {
      axios.post(
        "/api/restaurant/like-restaurant/" + restaurants[activeRestaurant].id
      );
      setArrLiked((prev) => [...prev, restaurants[activeRestaurant]]);
    }

    if (activeRestaurant == restaurants.length - 1) {
      setFinal(true);
      return;
    }

    setActiveRestaurant((prev) => {
      let next = prev + 1;
      if (next >= restaurants.length) {
        next = 0;
      }
      return next;
    });
  };

  console.log(movement);

  if (final)
    return (
      <View
        style={{
          ...tw`flex-1 bg-base-dark border-t border-base-light`,
        }}
      >
        <LikedRestaurants restaurants={arrLiked} handleNext={handleUpdate} />
      </View>
    );

  return (
    <View
      style={{
        ...tw`flex-1 bg-base-dark border-t border-base-light relative`,
      }}
    >
      <View
        style={{
          ...tw`h-full w-20 absolute z-20 left-0 ${
            movement == 0 ? "hidden" : ""
          }`,
          opacity: movement / -130,
        }}
      >
        <LinearGradient
          colors={[tw`text-secondary`["color"], "transparent"]}
          style={tw`h-full w-full`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
      <View
        style={{
          ...tw`h-full w-20 absolute z-20 right-0 ${
            movement == 0 ? "hidden" : ""
          }`,
          opacity: movement / 130,
        }}
      >
        <LinearGradient
          colors={[tw`text-terciary`["color"], "transparent"]}
          style={tw`h-full w-full`}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        />
      </View>

      {
        // If no restaurants are found, display a message
        restaurants == "No restaurants found" && (
          <View style={tw`flex-1 items-center justify-center`}>
            <Text style={tw`text-light text-2xl`}>
              We ran out of restaurants!
            </Text>
            <Text style={tw`text-light text-lg`}>
              Come tomorrow to see more!
            </Text>
          </View>
        )
      }
      {restaurants.length == 0 ? (
        <Loading isLoading={true} />
      ) : restaurants == "No restaurants found" ? (
        <></>
      ) : (
        <RestaurantCard
          restaurant={restaurants[activeRestaurant]}
          goNext={goNext}
          setMovement={setMovement}
        />
      )}
      <StatusBar style="light" />
    </View>
  );
};
