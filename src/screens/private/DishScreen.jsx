import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BackHandler, Text } from "react-native";
import { View } from "react-native";
import tw from "../../../twrnc";
import { Image, ScrollView } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";
import { Input } from "../../components";
import { Pill } from "../../components/Pill";

export const DishScreen = ({ route, navigation }) => {
  const { dish } = route.params;

  const { tastes, restrictions } = useContext(AppContext);

  console.log(dish);

  const handleBack = () => {
    navigation.navigate("Restaurant", { id: dish.restaurant });
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
  }, [dish]);

  return (
    <ScrollView style={tw`bg-base-dark flex-1`}>
      <View style={tw`relative h-80`}>
        <Image
          source={{
            uri: `${axios.defaults.baseURL}/api/dish/photo/${dish.photo}`,
          }}
          style={tw`w-full h-80 absolute`}
        />
        <TouchableOpacity
          style={tw`absolute top-5 left-5 z-50 rounded-full bg-[#0000007e]`}
          onPress={handleBack}
        >
          <AntDesign name="arrowleft" size={24} style={tw`text-light m-2`} />
        </TouchableOpacity>
      </View>
      <View style={tw`p-5`}>
        <Text style={tw`text-4xl text-light font-bold`}>{dish.name}</Text>
        <Text style={tw`text-light font-light text-2xl`}>{dish.price}€</Text>
        <Text style={tw`text-light font-bold text-lg`}>Description: </Text>
        <Text style={tw`text-light font-light text-base`}>
          {dish.description}
        </Text>
        <Text style={tw`text-light font-bold text-lg`}>Tastes: </Text>
        <View style={tw`flex-row flex-wrap gap-2`}>
          {dish.tastes?.map((taste) => {
            return (
              <Pill
                key={taste.id}
                text={taste.name}
                active={tastes.includes(taste.id)}
              />
            );
          })}
          {dish.tastes?.length === 0 ||
            (!dish.tastes && (
              <Text style={tw`text-light font-light text-base`}>
                No tastes set
              </Text>
            ))}
        </View>
        <Text style={tw`text-light font-bold text-lg`}>Restrictions: </Text>
        <View style={tw`flex-row flex-wrap gap-2`}>
          {dish.restrictions?.map((restriction) => {
            return (
              <Pill
                key={restriction.id}
                text={restriction.name}
                active={restrictions.includes(restriction.id)}
              />
            );
          })}
          {dish.restrictions?.length === 0 && (
            <Text style={tw`text-light font-light text-base`}>
              No alimentary restrictions
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
