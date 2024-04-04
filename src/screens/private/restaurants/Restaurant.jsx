import { Alert, BackHandler, View } from "react-native";
import tw from "../../../../twrnc";
import { useContext, useEffect, useState } from "react";
import { Loading } from "../../../components";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import { ViewRestaurant } from "./ViewRestaurant";
import { EditRestaurant } from "./EditRestaurant";

export const Restaurant = ({ route, navigation }) => {
  const confirm = (title, body, onAccept, onCancel) => {
    Alert.alert(title, body, [
      {
        text: "Cancel",
        onPress: onCancel,
        style: "cancel",
      },
      { text: "Yes", onPress: onAccept },
    ]);
  };
  const { restaurants, user } = useContext(AppContext);
  const [edit, setEdit] = useState(false);

  async function getRestaurant(id) {
    const restaurant = restaurants.find((res) => res.id === id);

    if (restaurant) {
      setRestaurant(restaurant);
      return;
    }

    const res = await axios.get(`/api/restaurant/specific/${id}`);
    setRestaurant(res.data);
  }

  // get params from navigation
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    phone: "",
    photo: "",
    photos: [],
    dishes: [],
    creation_date: "",
    description: "",
    id: 0,
    link_glovo: null,
    link_just_eat: null,
    link_uber_eats: null,
    owner_id: 0,
  });

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (edit) {
        confirm(
          "Are you sure you want to exit without saving changes?",
          "You will lose all changes made to the restaurant",
          () => {
            setEdit(false);
            navigation.navigate("YourRestaurants");
          },
          () => {}
        );
        return true;
      }

      if (restaurant.owner_id === user.id)
        navigation.navigate("YourRestaurants");
      else navigation.goBack();
      return true;
    });
  }, [id, edit]);

  useEffect(() => {
    getRestaurant(id).then(() => setLoading(false));
    setEdit(false);
  }, [id]);

  const [act, setAct] = useState(Date.now());

  return (
    <>
      <View
        style={tw`bg-base-dark flex-1 items-center border-t border-base-light`}
      >
        <Loading isLoading={loading} />
        {edit ? (
          <EditRestaurant
            restaurant={restaurant}
            setRestaurant={setRestaurant}
            edit={edit}
            setEdit={setEdit}
            act={act}
            setAct={setAct}
          />
        ) : (
          <ViewRestaurant
            restaurant={restaurant}
            edit={edit}
            setEdit={setEdit}
            act={act}
          />
        )}
      </View>
    </>
  );
};
