import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import tw from "../../twrnc";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons";

const CarouselItem = ({ image, handleDelete }) => {
  return (
    <View style={tw`relative`}>
      <Image source={{ uri: image.uri }} style={tw`w-28 h-28 rounded-xl`} />
      <Entypo
        name="circle-with-cross"
        size={17}
        color="red"
        style={tw`absolute top-0 right-0 bg-white rounded-full`}
        onPress={handleDelete}
      />
    </View>
  );
};

export const AddRestaurantCarousel = ({ setDefCarousel = () => {} }) => {
  const [images, setImages] = useState([]);

  const handlePickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
      multiple: true,
    });
    if (!result.canceled) {
      setImages((prev) => {
        // delete coincidences and limit to 12 photos
        const arr = [...prev, ...result.assets];
        const dataArr = new Set(arr);
        const xd = [...dataArr];

        return xd.slice(0, 12);
      });
    }
  };

  useEffect(() => {
    setDefCarousel(images);
  }, [images]);

  return (
    <>
      <View style={tw`flex flex-row flex-wrap gap-3 mt-3`}>
        {images.map((image, i) => (
          <CarouselItem
            key={i}
            image={image}
            handleDelete={() => {
              setImages((prev) => prev.filter((img) => img.uri !== image.uri));
            }}
          />
        ))}
        {images.length < 12 && (
          <TouchableOpacity
            style={tw`rounded-xl border-2 aspect-square border-dashed border-light w-28 self-center justify-center items-center`}
            onPress={handlePickImage}
          >
            <Feather name="plus" size={50} color={tw`text-light`.color} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
