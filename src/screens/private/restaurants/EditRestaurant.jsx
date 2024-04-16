import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";

import { resizeImage } from "../../../helpers/resizeImage";
import tw from "../../../../twrnc";
import { InvisibleInput } from "../../../components";
import { InputImage } from "../../../components/InputImage";
import { AddRestaurantCarousel } from "../../../components/AddRestaurantCarousel";
import { AddDish } from "./AddDish";

export const EditRestaurant = ({
  restaurant,
  edit,
  setEdit,
  act,
  setAct,
  setRestaurant,
}) => {
  const [addDishModal, setAddDishModal] = useState(false);
  const [tempRes, setTempRes] = useState(restaurant);
  const [changes, setChanges] = useState(false);

  console.log(restaurant);

  const [carousel, setCarousel] = useState([]);
  useEffect(() => {
    axios
      .get("/api/restaurant/carousel/" + restaurant.id)
      .then((res) => {
        const images = res.data.map((img) => {
          return {
            uri: `${axios.defaults.baseURL}/api/restaurant/carousel/photo/${img}`,
            type: "image/png",
            name: img,
          };
        });
        setCarousel(images);
      })
      .catch((e) => {});
  }, []);

  const handleChangePhoto = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (doc.canceled) return;
      const image = doc.assets[0];

      const resizedImage = await resizeImage(image.uri);

      const data = new FormData();

      data.append("photo", {
        name: resizedImage.split("/").pop(),
        type: "image/png",
        uri: resizedImage,
      });

      data.append("id", restaurant.id);

      const res = await axios.post(
        "/api/restaurant/photo/profile-picture",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setRestaurant(res.data.restaurant);
      setTempRes((prev) => {
        return { ...prev, photo: res.data.photo };
      });

      setAct(Date.now());
    } catch (e) {
      alert("error changing the photo");
    }
  };

  useEffect(() => {
    setChanges(JSON.stringify(tempRes) !== JSON.stringify(restaurant));
  }, [tempRes]);

  const saveChanges = async () => {
    const { dishes, photo } = restaurant;
    const saveRes = { ...tempRes, dishes, photo };
    await axios.put("/api/restaurant", saveRes);
    setRestaurant(saveRes);
    setTempRes(saveRes);
  };

  const updateImages = async (images) => {
    console.log(images);
    const data = new FormData();
    for (let image of images) {
      if (!image.uri.includes("http")) {
        const resizedImage = await resizeImage(image.uri);
        data.append("photo", {
          name: resizedImage.split("/").pop(),
          type: "image/png",
          uri: resizedImage,
        });
      } else {
        data.append("photo", image);
      }
    }
    try {
      const res = await axios.put(
        "/api/restaurant/photo/carousel/" + restaurant.id,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ScrollView style={tw`w-90 mx-auto mt-5 flex-1`}>
        <View style={tw`border-b border-base-light pb-5`}>
          {changes && (
            <TouchableOpacity
              style={tw`bg-primary py-2 rounded-lg w-20`}
              onPress={saveChanges}
            >
              <Text style={tw`text-black text-center font-bold`}>Save</Text>
            </TouchableOpacity>
          )}
          {/* save btn */}
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
          <TouchableOpacity onPress={handleChangePhoto}>
            <Image
              source={{
                uri: `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}?xd=${act}`,
              }}
              style={tw`h-36 w-36 rounded-full mx-auto my-5`}
            />
          </TouchableOpacity>
          {/* dirección */}
          <InvisibleInput
            value={tempRes.address}
            onChange={(value) => {
              setTempRes({ ...tempRes, address: value });
            }}
            className={"text-light text-base font-thin"}
          />
          {/* teléfono */}
          <InvisibleInput
            value={tempRes.phone}
            onChange={(value) => {
              setTempRes({ ...tempRes, phone: value });
            }}
            className={"text-light text-base font-thin"}
            type={"tel"}
          />
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
          {restaurant.dishes?.map((dish) => {
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
          <View style={tw`w-full mx-auto gap-5 mt-3`}>
            <InputImage
              placeholder={"Glovo URL"}
              image={require("../../../assets/glovo-icon.png")}
              value={tempRes.link_glovo}
              setValue={(value) => {
                setTempRes({ ...tempRes, link_glovo: value || null });
              }}
            />
            <InputImage
              placeholder={"Uber eats URL"}
              image={require("../../../assets/uber-eats-icon.png")}
              value={tempRes.link_uber_eats}
              setValue={(value) => {
                setTempRes({ ...tempRes, link_uber_eats: value || null });
              }}
            />
            <InputImage
              placeholder={"Just eat URL"}
              image={require("../../../assets/just-eat-icon.png")}
              value={tempRes.link_just_eat}
              setValue={(value) => {
                setTempRes({ ...tempRes, link_just_eat: value || null });
              }}
            />
          </View>
        </View>
        <View style={tw`mb-3`}>
          <Text style={tw`text-primary mt-3`}>Your photos</Text>
          <AddRestaurantCarousel
            defImages={carousel}
            setDefCarousel={updateImages}
          />
        </View>
        <AddDish
          addDishModal={addDishModal}
          setAddDishModal={setAddDishModal}
          restaurantId={restaurant.id}
        />
      </ScrollView>
    </>
  );
};
