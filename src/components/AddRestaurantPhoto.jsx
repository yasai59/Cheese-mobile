import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "../../twrnc";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

export const AddRestaurantPhoto = ({
  setImageDef,
  className = "",
  initImage = null,
}) => {
  const [image, setImage] = useState(initImage);

  useEffect(() => {
    setImage(initImage);
  }, [initImage]);

  const handlePickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);

      setImageDef && setImageDef(result.assets[0]);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={tw`rounded-full aspect-square ${
          !image ? "border-2 border-dashed border-light" : ""
        }  w-30 self-center justify-center items-center mt-3 ${className}`}
        onPress={handlePickImage}
      >
        {image ? (
          <View style={tw`absolute w-full h-full`}>
            <Image
              source={{ uri: image.uri }}
              style={tw`w-full h-full rounded-full ${className}`}
            />
          </View>
        ) : (
          <Feather name="plus" size={50} color={tw`text-light`.color} />
        )}
      </TouchableOpacity>
      {/* delete image */}
      {image && (
        <Text
          style={tw`text-red-500 text-center`}
          onPress={() => setImage(null) && setImageDef && setImageDef(null)}
        >
          Delete image
        </Text>
      )}
    </>
  );
};
