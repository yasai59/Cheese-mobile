import axios from "axios";
import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import tw from "../../../../twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { DraxProvider, DraxView } from "react-native-drax";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const RestaurantDetails = ({ restaurant, activePhoto }) => {
  const date = new Date(restaurant.creation_date);

  const formatedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

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
        <Text style={tw`font-bold`}>In Cheese since:</Text> {formatedDate}
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

export const RestaurantCard = ({ restaurant, goNext, setMovement }) => {
  const svMove = useSharedValue(0);
  const svRotate = useSharedValue(0);
  const svOpacity = useSharedValue(1);
  const svScale = useSharedValue(100);

  const totalImages = restaurant.carousel_photos?.length || 0;

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

  const handleDrag = (event) => {
    svMove.value = event.dragTranslation.x;
    svRotate.value = event.dragTranslation.x / 10;
    setMovement(event.dragTranslation.x);
  };

  const gotoZero = async () => {
    svMove.value = withSpring(0);
    svRotate.value = withSpring(0);
    setMovement(0);
  };

  const handleGoNext = (like) => {
    setMovement(0);
    if (like) {
      svMove.value = withSpring(600);
      svRotate.value = withSpring(60);
    } else {
      svMove.value = withSpring(-600);
      svRotate.value = withSpring(-60);
    }

    setTimeout(() => {
      svOpacity.value = 0;
      svMove.value = 0;
      svRotate.value = 0;
      svScale.value = 10;
      goNext(like);
      setActivePhoto(0);
      svOpacity.value = withSpring(1, {
        duration: 500,
      });
      svScale.value = withTiming(100, {
        duration: 350,
        easing: Easing.elastic(0.7),
      });
    }, 200);
  };

  const handleDragEnd = (event) => {
    if (event.dragTranslation.x > 130) {
      return handleGoNext(true);
    }

    if (event.dragTranslation.x < -130) {
      return handleGoNext(false);
    }

    gotoZero();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: svOpacity.value,
      transform: [
        { translateX: svMove.value },
        { rotate: svRotate.value + "deg" },
        { scale: svScale.value / 100 },
      ],
    };
  });

  return (
    <DraxProvider>
      <Animated.View style={[animatedStyle]}>
        <View style={tw`flex-row absolute z-50 h-[84%] w-full`}>
          <TouchableOpacity
            style={tw`z-10 w-20 h-full`}
            onPress={() => handleChangePhoto(-1)}
          />
          <DraxView
            style={tw`flex-grow`}
            draggable={true}
            payload={restaurant.id}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
          <TouchableOpacity
            style={tw`z-10 w-20 h-full`}
            onPress={() => handleChangePhoto(1)}
          />
        </View>
        <View style={tw`flex flex-row absolute mt-5 w-full gap-2 px-2 z-10`}>
          {restaurant.carousel_photos.map((photo, index) => (
            <View
              key={index}
              style={tw`border-2 border-light flex-grow h-2 rounded-full ${
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
            uri: `${axios.defaults.baseURL}/api/restaurant/carousel/photo/${restaurant.carousel_photos[activePhoto]}`,
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
              style={tw`bg-base w-20 h-20 items-center justify-center rounded-full z-50`}
              onPress={() => handleGoNext(false)}
            >
              <Image
                source={require("../../../assets/cross.png")}
                style={tw`w-10 h-10`}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-base w-20 h-20 items-center justify-center rounded-full z-50`}
              onPress={() => handleGoNext(true)}
            >
              <Image
                source={require("../../../assets/tick.png")}
                style={tw`w-13 h-10`}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient
          colors={[tw`text-transparent`["color"], tw`text-black`["color"]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.2 }}
          style={tw`absolute w-full h-50 z-1 bottom-0 opacity-85 `}
        />
      </Animated.View>
    </DraxProvider>
  );
};
