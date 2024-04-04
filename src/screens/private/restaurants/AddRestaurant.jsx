import React, { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../../../../twrnc";
import { AddRestaurantPhoto, FormBtn, Input } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { AddRestaurantCarousel } from "../../../components/AddRestaurantCarousel";
import axios from "axios";
import { resizeImage } from "../../../helpers/resizeImage";
import { AppContext } from "../../../context/AppContext";

export const AddRestaurant = () => {
  const { updateRestaurants } = useContext(AppContext);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [name, setName] = useState("");

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [image, setImage] = useState(null);

  const [carousel, setCarousel] = useState([]);

  const handleSubmit = async () => {
    const newImage = await resizeImage(image.uri);

    // formdata to send to the server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phoneNumber);
    formData.append("image", {
      uri: newImage,
      type: "image/png",
      name: newImage.split("/").pop(),
    });

    for (let carImage of carousel) {
      const newCarousel = await resizeImage(carImage.uri);

      formData.append("photo", {
        uri: newCarousel,
        type: "image/png",
        name: newCarousel.split("/").pop(),
      });
    }

    try {
      const res = await axios.post("/api/restaurant", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      updateRestaurants();
      navigation.goBack();
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

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
          <Input
            placeholder={"e.x Bob"}
            value={name}
            onChange={(text) => setName(text)}
          />
          <Text style={tw`text-light mb-3 mt-3`}>Address</Text>
          <Input
            placeholder={"e.x Bob super mega street, 420"}
            value={address}
            onChange={(text) => setAddress(text)}
          />
          <Text style={tw`text-light mb-3 mt-3`}>Phone number</Text>
          <Input
            placeholder={"e.x +34 669 69 69 69"}
            type={"phone"}
            value={phoneNumber}
            onChange={(text) => setPhoneNumber(text)}
          />
          <Text style={tw`text-light mb-3 mt-3`}>Restaurant photo</Text>
          <AddRestaurantPhoto setImageDef={setImage} />
        </View>
        <View style={tw`border-b border-base-light w-full pb-5`}></View>
        <View style={tw`w-90 self-center`}>
          <View style={tw`flex-row items-end mt-5`}>
            <Text style={tw`text-primary text-[18px]`}>Your carousel</Text>
            <Text style={tw`text-light text-[13px]`}>
              {" "}
              You need to add at least 2 photos
            </Text>
          </View>
          <AddRestaurantCarousel setDefCarousel={setCarousel} />
          <Text style={tw`text-light mt-3 text-[12px]`}>
            To start adding your dishes go to the restaurant page once created
          </Text>
          <FormBtn title={"+ Add"} handlePress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
};
