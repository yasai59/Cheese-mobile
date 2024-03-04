import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../../../../twrnc";
import { AddRestaurantPhoto, FormBtn, Input } from "../../../components";
import { useNavigation } from "@react-navigation/native";

export const AddRestaurant = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        ...tw`bg-base-dark flex-1 items-center`,
      }}
    >
      <ScrollView style={tw`w-full`}>
        <View style={tw`w-90 self-center`}>
          <Text
            style={tw`text-primary font-bold mt-10`}
            onPress={() => navigation.goBack()}
          >
            {"<"}Back
          </Text>
          <Text style={tw`font-bold text-light text-4xl mt-5`}>
            Add Restaurant
          </Text>
          <Text style={tw`text-light mb-3 mt-3`}>Name</Text>
          <Input placeholder={"e.x Bob"} />
          <Text style={tw`text-light mb-3 mt-3`}>Address</Text>
          <Input placeholder={"e.x Bob super mega street, 420"} />
          <Text style={tw`text-light mb-3 mt-3`}>Phone number</Text>
          <Input placeholder={"e.x +34 669 69 69 69"} />
          <Text style={tw`text-light mb-3 mt-3`}>Restaurant photo</Text>
          <AddRestaurantPhoto />
        </View>
        <View style={tw`border-b border-base-light w-full pb-5`}></View>
        <View style={tw`w-90 self-center`}>
          <Text style={tw`text-light mt-3 text-[12px]`}>
            To start adding your dishes go to the restaurant page once created
          </Text>
          <FormBtn title={"+ Add"} />
        </View>
      </ScrollView>
    </View>
  );
};
