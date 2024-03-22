import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "../../../../twrnc";
import axios from "axios";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import Modal from "react-native-modal";
import { useState } from "react";
import { AddRestaurantPhoto, Input } from "../../../components";
import { PillSelect } from "../../../components/PillSelect";
import { InputImage } from "../../../components/InputImage";

export const EditRestaurant = ({ restaurant, edit, setEdit }) => {
  const [addDishModal, setAddDishModal] = useState(false);
  const [dishImage, setDishImage] = useState(null);

  return (
    <>
      <ScrollView style={tw`w-90 mx-auto mt-5 flex-1`}>
        <View style={tw`border-b border-base-light pb-5`}>
          <View style={tw`flex-row justify-between items-center flex-wrap`}>
            <Text style={tw`text-light text-4xl font-bold`}>
              {restaurant.name}
            </Text>
            <TouchableOpacity
              style={tw`p-5 aspect-square items-center justify-center`}
              onPress={() => setEdit(!edit)}
            >
              <MaterialCommunityIcons
                name="pencil"
                size={32}
                color={tw`text-light`["color"]}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`,
            }}
            style={tw`h-36 w-36 rounded-full mx-auto my-5`}
          />
          {/* dirección */}
          <Text style={tw`text-light text-base font-thin`}>
            {restaurant.address}
          </Text>
          {/* teléfono */}
          <Text style={tw`text-light text-base font-thin`}>
            {restaurant.phone}
          </Text>
        </View>
        <View
          style={tw`py-3 border-b border-base-light flex-row justify-between items-center`}
        >
          <Text style={tw`text-primary`}>Menu</Text>
          <TouchableOpacity
            style={tw`bg-base px-3 py-2 rounded-lg`}
            onPress={() => setAddDishModal(true)}
          >
            <Text style={tw`text-light`}>Add dish</Text>
          </TouchableOpacity>
        </View>
        <View>
          {restaurant.dishes.map((dish) => {
            return (
              <View key={dish.id} style={tw`border-b border-base-light py-2`}>
                <TouchableOpacity style={tw`flex-row`}>
                  <Image
                    source={{
                      uri: `${axios.defaults.baseURL}/dish/photo/${dish.photo}`,
                    }}
                    style={tw`w-24 h-24 rounded-lg`}
                  />
                  <View>
                    <Text style={tw`text-light font-bold text-2xl`}>
                      {dish.name}
                    </Text>
                    <Text style={tw`text-light `}>{dish.description}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* Order buttons */}
        <View>
          <Text style={tw`text-primary mt-3`}>Links</Text>
          <View style={tw`w-64 mx-auto gap-5 mt-3`}>
            <InputImage
              placeholder={"Glovo URL"}
              image={require("../../../assets/glovo-icon.png")}
            />
            <InputImage
              placeholder={"Uber eats URL"}
              image={require("../../../assets/uber-eats-icon.png")}
            />
            <InputImage
              placeholder={"Just eat URL"}
              image={require("../../../assets/just-eat-icon.png")}
            />
          </View>
        </View>
        <Modal
          isVisible={addDishModal}
          onBackButtonPress={() => setAddDishModal(false)}
        >
          <View
            style={tw`bg-base-dark rounded-lg border-2 border-base relative`}
          >
            <Text style={tw`text-light font-bold text-xl mt-10 text-center`}>
              Add dish
            </Text>
            <TouchableOpacity
              style={tw`absolute top-0 right-0 p-5`}
              onPress={() => setAddDishModal(false)}
            >
              <Entypo name="cross" size={32} color={tw`text-light`["color"]} />
            </TouchableOpacity>
            <View style={tw`w-[80%] mx-auto gap-2`}>
              <Text style={tw`text-light`}>Name</Text>
              <Input placeholder="Name" className={`h-10`} />
              <Text style={tw`text-light`}>Description</Text>
              <Input
                placeholder="Description"
                className={`h-30 justify-start items-start`}
                multiline={true}
              />
              <Text style={tw`text-light`}>Price</Text>
              <Input placeholder="Price" className={`h-10`} type={"decimal"} />
              {/* TODO: change photo input, tastes and restrictions */}
              <Text style={tw`text-light`}>Photo</Text>
              <AddRestaurantPhoto
                setImageDef={setDishImage}
                className="rounded-lg"
              />
              <Text style={tw`text-light`}>Tastes</Text>
              <PillSelect />
              <Text style={tw`text-light`}>Restrictions</Text>
              <TouchableOpacity
                style={tw`bg-primary p-3 rounded-lg my-5 w-[50%] mx-auto`}
                onPress={() => {}}
              >
                <Text style={tw`text-black text-center font-bold text-xl`}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};
