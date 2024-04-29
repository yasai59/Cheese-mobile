import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "../../../../twrnc";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";

import { useState } from "react";
import { AddRestaurantPhoto, Input } from "../../../components";
import { PillSelect } from "../../../components/PillSelect";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { resizeImage } from "../../../helpers/resizeImage";

export const AddDish = ({ addDishModal, setAddDishModal, restaurantId }) => {
  const [dishImage, setDishImage] = useState(null);
  const { allTastes, allRestrictions } = useContext(AppContext);

  const [selectedTastes, setSelectedTastes] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    if (name.length < 2) {
      alert("Name must be at least 2 characters long");
      return;
    }

    const nPrice = Number(price);

    if (isNaN(nPrice) || nPrice < 0 || nPrice === 0) {
      alert("Price must be a positive number and can't be zero");
      return;
    }
    if (!dishImage) {
      alert("Please select a photo");
      return;
    }

    if (selectedTastes.length === 0) {
      alert("Please select at least one taste");
      return;
    }

    if (!restaurantId)
      return alert("Internal error, please restart the app and try again");

    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("price", price);

    const resizedImage = await resizeImage(dishImage.uri);

    data.append("photo", {
      name: resizedImage.split("/").pop(),
      type: "image/png",
      uri: resizedImage,
    });

    try {
      const res = await axios.post(`/api/dish/${restaurantId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAddDishModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      isVisible={addDishModal}
      onBackButtonPress={() => setAddDishModal(false)}
    >
      <View style={tw`bg-base-dark rounded-lg border-2 border-base relative`}>
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
          <Input
            placeholder="Name"
            className={`h-10`}
            value={name}
            onChange={(text) => setName(text)}
          />
          <Text style={tw`text-light`}>Description</Text>
          <Input
            placeholder="Description"
            className={`h-30 justify-start items-start`}
            multiline={true}
            value={description}
            onChange={(text) => setDescription(text)}
          />
          <Text style={tw`text-light`}>Price</Text>
          <Input
            placeholder="Price"
            className={`h-10`}
            type={"decimal"}
            value={price}
            onChange={(text) => setPrice(text)}
          />
          {/* TODO: change photo input, tastes and restrictions */}
          <Text style={tw`text-light`}>Photo</Text>
          <AddRestaurantPhoto
            setImageDef={setDishImage}
            className="rounded-lg"
          />
          <Text style={tw`text-light`}>Tastes</Text>
          <PillSelect
            items={allTastes}
            title="Select taste of the dish"
            setSelectedItemsDef={setSelectedTastes}
          />
          <Text style={tw`text-light`}>Restrictions</Text>
          <PillSelect
            items={allRestrictions}
            title="Select restrictions of the dish"
            setSelectedItemsDef={setSelectedRestrictions}
          />
          <TouchableOpacity
            style={tw`bg-primary p-3 rounded-lg my-5 w-[50%] mx-auto`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-black text-center font-bold text-xl`}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
