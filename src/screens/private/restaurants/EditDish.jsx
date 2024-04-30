import React, { useContext, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import tw from "../../../../twrnc";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";
import mime from "mime";

import { useState } from "react";
import { AddRestaurantPhoto, Input } from "../../../components";
import { PillSelect } from "../../../components/PillSelect";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { resizeImage } from "../../../helpers/resizeImage";

export const EditDish = ({ open, setOpen, dish }) => {
  if (!dish) return <></>;

  const [dishImage, setDishImage] = useState({
    uri: `${axios.defaults.baseURL}/api/dish/photo/${dish.photo}`,
  });
  const { allTastes, allRestrictions, updateRestaurants } =
    useContext(AppContext);

  const [selectedTastes, setSelectedTastes] = useState(dish.tastes || []);
  const [selectedRestrictions, setSelectedRestrictions] = useState(
    dish.restrictions || []
  );

  useEffect(() => {
    console.log({
      selectedTastes,
      selectedRestrictions,
    });
  }, [selectedTastes, selectedRestrictions]);

  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);
  const [price, setPrice] = useState(`${dish.price}`);

  useEffect(() => {
    setDescription(dish.description);
    setPrice(`${dish.price}`);
    setDishImage({
      uri: `${axios.defaults.baseURL}/api/dish/photo/${dish.photo}`,
    });
    setSelectedTastes(dish.tastes);
    setSelectedRestrictions(dish.restrictions);
  }, [dish]);

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

    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("id", dish.id);

    data.append("tastes", JSON.stringify(selectedTastes));
    data.append("restrictions", JSON.stringify(selectedRestrictions));

    if (!dishImage.uri.startsWith("http")) {
      const resizedImage = await resizeImage(dishImage.uri);
      const newImageUri = "file:///" + resizedImage.split("file:/").join("");
      data.append("photo", {
        name: newImageUri.split("/").pop(),
        type: mime.getType(newImageUri),
        uri: newImageUri,
      });
    }

    try {
      const res = await axios.put(`/api/dish/${dish.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpen(false);
      updateRestaurants();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteDish = () => {
    Alert.alert("Are you sure", "Do you want to delete this dish?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          axios.delete(`/api/dish/${dish.id}`).then((res) => {
            console.log(res);
            setOpen(false);
            updateRestaurants();
          });
        },
      },
    ]);
  };

  return (
    <Modal isVisible={open} onBackButtonPress={() => setOpen(false)}>
      <View style={tw`bg-base-dark rounded-lg border-2 border-base relative`}>
        <Text style={tw`text-light font-bold text-xl mt-10 text-center`}>
          Edit dish
        </Text>
        <TouchableOpacity
          style={tw`absolute top-0 right-0 p-5`}
          onPress={() => setOpen(false)}
        >
          <Entypo name="cross" size={32} color={tw`text-light`["color"]} />
        </TouchableOpacity>
        <View style={tw`w-[80%] mx-auto gap-2`}>
          <TouchableOpacity
            style={tw`bg-red-600 rounded-lg p-3 items-center`}
            onPress={handleDeleteDish}
          >
            <Text style={tw`font-bold`}>Delete dish</Text>
          </TouchableOpacity>
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
            initImage={dishImage}
          />
          <Text style={tw`text-light`}>Tastes</Text>
          <PillSelect
            items={allTastes}
            title="Select taste of the dish"
            setSelectedItemsDef={setSelectedTastes}
            initialSelected={selectedTastes}
          />
          <Text style={tw`text-light`}>Restrictions</Text>
          <PillSelect
            items={allRestrictions}
            title="Select restrictions of the dish"
            setSelectedItemsDef={setSelectedRestrictions}
            initialSelected={selectedRestrictions}
          />
          <TouchableOpacity
            style={tw`bg-primary p-3 rounded-lg my-5 w-[50%] mx-auto`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-black text-center font-bold text-xl`}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
