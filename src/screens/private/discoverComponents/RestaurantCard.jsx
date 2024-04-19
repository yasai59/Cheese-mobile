import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import tw from "../../../../twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

const RestaurantDetails = ({ restaurant, activePhoto }) => {
  const details = [
    <>
      <Text style={tw`text-white text-2xl font-bold`}>{restaurant.name}</Text>
      <Text style={tw`text-white text-lg`}>{restaurant.address}</Text>
    </>,
    <>
      <Text style={tw`text-white text-lg`}>{restaurant.description}</Text>
    </>,
    <>
      <Text style={tw`text-white text-lg`}>
        <Text style={tw`font-bold`}>Phone:</Text> {restaurant.phone}
      </Text>
      <Text style={tw`text-white text-lg`}>
        <Text style={tw`font-bold`}>In Cheese since:</Text>{" "}
        {restaurant.creation_date}
      </Text>
    </>,
    <>
      <Text style={tw`text-white text-lg`}>
        <Text style={tw`font-bold`}>Delivery options:</Text>{" "}
        {restaurant.link_glovo && <Text style={tw`text-white`}>Glovo </Text>}
        {restaurant.link_ubereats && (
          <Text style={tw`text-white`}>& Uber Eats </Text>
        )}
        {restaurant.link_just_eat && (
          <Text style={tw`text-white`}>& Just Eat </Text>
        )}
      </Text>
    </>,
  ];

  return details[activePhoto % details.length];
};

export const RestaurantCard = ({ restaurant }) => {
  // {
  //   id: 1,
  //   name: "Restaurant 1",
  //   address: "Address 1",
  //   creation_date: "2021-01-01",
  //   link_glovo: "https://glovoapp.com",
  //   link_ubereats: "https://ubereats.com",
  //   link_just_eat: "https://justeat.com",
  //   phone: "656265459",
  //   photo: "https://via.placeholder.com/150",
  //   description: "Description 1",
  //   active_suscription: false,
  //   carousel: [
  //     "Arnau2_26e31329-84cf-4dd0-8dfa-d941d4838a581712656945939.JPEG",
  //     "Arnau2_26e31329-84cf-4dd0-8dfa-d941d4838a581712656945939.JPEG",
  //     "Arnau2_26e31329-84cf-4dd0-8dfa-d941d4838a581712656945939.JPEG",
  //     "Arnau2_26e31329-84cf-4dd0-8dfa-d941d4838a581712656945939.JPEG",
  //   ],
  //   dishes: [
  //     {
  //       id: 1,
  //       name: "Dish 1",
  //       photo:
  //         "undefined_598779ff-0e60-4e61-8c6b-933d8e9540851713263884787.jpeg",
  //       description: "Description 1",
  //       price: 10,
  //       tastes: [{ id: 1, name: "Meat" }],
  //       restrictions: [{ id: 6, name: "Fruits" }],
  //     },
  //   ],
  // },

  const totalImages = restaurant.carousel.length;

  const [activePhoto, setActivePhoto] = useState(0);

  const handleChangePhoto = (sum) => {
    if (activePhoto + sum < 0) {
      setActivePhoto(0);
    } else if (activePhoto + sum >= totalImages) {
      setActivePhoto(totalImages - 1);
    } else {
      setActivePhoto(activePhoto + sum);
    }
  };

  useEffect(() => {
    console.log(activePhoto);
  }, [activePhoto]);

  return (
    <View>
      <TouchableOpacity
        style={tw`z-10 w-20 h-full absolute`}
        onPress={() => handleChangePhoto(-1)}
      />
      <TouchableOpacity
        style={tw`z-10 w-20 h-full absolute right-0`}
        onPress={() => handleChangePhoto(1)}
      />
      <View style={tw`flex flex-row absolute mt-5 w-full gap-2 px-2`}>
        {restaurant.carousel.map((photo, index) => (
          <View
            style={tw`border-2 border-light z-10 flex-grow h-2 rounded-full ${
              index <= activePhoto ? "bg-light" : ""
            }`}
          />
        ))}
      </View>
      <LinearGradient
        colors={[tw`text-black`["color"], tw`text-transparent`["color"]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.7 }}
        style={tw`absolute w-full h-30 z-5 opacity-50 top-0`}
      />
      <Image
        source={{
          uri: `${axios.defaults.baseURL}/api/restaurant/carousel/photo/${restaurant.carousel[activePhoto]}`,
        }}
        style={{ width: "100%", height: "100%" }}
      />
      <View style={tw`absolute bottom-0 z-5 mb-8 w-full`}>
        <View style={tw`px-5 pb-2`}>
          <RestaurantDetails
            restaurant={restaurant}
            activePhoto={activePhoto}
          />
        </View>
        <View style={tw`flex-row justify-around w-full`}>
          <TouchableOpacity
            style={tw`bg-base w-20 h-20 items-center justify-center rounded-full border-2 border-base-light`}
          >
            <Entypo
              name="cross"
              size={65}
              color={tw`text-secondary`["color"]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-base w-20 h-20 items-center justify-center rounded-full border-2 border-base-light`}
          >
            <Entypo
              name="check"
              size={55}
              color={tw`text-terciary`["color"]}
            ></Entypo>
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        colors={[tw`text-transparent`["color"], tw`text-black`["color"]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.2 }}
        style={tw`absolute w-full h-50 z-1 bottom-0 opacity-85 `}
      />
    </View>
  );
};
