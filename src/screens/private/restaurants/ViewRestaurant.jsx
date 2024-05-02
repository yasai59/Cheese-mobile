import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../../../../twrnc";
import axios from "axios";
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { PillSelect } from "../../../components/PillSelect";
import { Input } from "../../../components";

const handleOrderPress = (link) => {
  Linking.openURL(link);
};
const GlovoBtn = ({ link }) => {
  return (
    <TouchableOpacity
      style={tw`bg-primary rounded-2xl py-2 h-14 items-center justify-center`}
      onPress={() => handleOrderPress(link)}
    >
      <Image
        source={require("../../../assets/glovo-logo.png")}
        style={tw`h-full w-30 mx-auto`}
      />
    </TouchableOpacity>
  );
};

const JustEatBtn = ({ link }) => {
  return (
    <TouchableOpacity
      style={tw`bg-white rounded-2xl py-2 h-14 items-center justify-center`}
      onPress={() => handleOrderPress(link)}
    >
      <Image
        source={require("../../../assets/just-eat-logo.png")}
        style={tw`h-full w-44 mx-auto`}
      />
    </TouchableOpacity>
  );
};

const UberEatsBtn = ({ link }) => {
  return (
    <TouchableOpacity
      style={tw`bg-black rounded-2xl py-2 h-14 items-center justify-center`}
      onPress={() => handleOrderPress(link)}
    >
      <Image
        source={require("../../../assets/uber-eats-logo.png")}
        style={tw`h-7 w-44 mx-auto`}
      />
    </TouchableOpacity>
  );
};

export const ViewRestaurant = ({ restaurant, edit, setEdit, act }) => {
  const { user, favoriteRestaurants, toggleFavorite, reasons } =
    useContext(AppContext);

  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [description, setDescription] = useState("");

  const handleReport = () => {
    if (selectedReasons.length === 0) {
      alert("Please select at least 1 reason");
      return;
    }

    axios
      .post("/api/report/" + restaurant.id, {
        reasonIds: selectedReasons.map((r) => r.id),
        description,
      })
      .then(() => {
        alert("Report sent successfully");
        setModal(false);
        setDescription("");
        setSelectedReasons([]);
      });
  };

  return (
    <>
      <ScrollView style={tw`w-90 mx-auto mt-5`}>
        <View style={tw`border-b border-base-light pb-5`}>
          <View style={tw`flex-row justify-between items-center flex-wrap`}>
            <Text style={tw`text-light text-4xl font-bold`}>
              {restaurant.name}
            </Text>
            {restaurant.owner_id === user.id ? (
              <TouchableOpacity
                style={tw`p-5 aspect-square items-center justify-center`}
                onPress={() => setEdit(!edit)}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={32}
                  color={tw`text-light`["color"]}
                />
              </TouchableOpacity>
            ) : (
              <View style={tw`flex-row gap-5`}>
                <TouchableOpacity onPress={() => toggleFavorite(restaurant)}>
                  {favoriteRestaurants.find((r) => r.id === restaurant.id) ? (
                    <FontAwesome
                      name="star"
                      size={32}
                      style={tw`text-primary`}
                    />
                  ) : (
                    <FontAwesome
                      name="star-o"
                      size={32}
                      style={tw`text-light`}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModal(true)}>
                  <MaterialIcons
                    name="report-gmailerrorred"
                    size={34}
                    style={tw`text-secondary`}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Image
            source={{
              uri: `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}?xd=${act}`,
            }}
            style={tw`h-36 w-36 rounded-full mx-auto my-5`}
          />
          {/* dirección */}
          <Text style={tw`text-light text-base font-light`}>
            {restaurant.address}
          </Text>
          {/* teléfono */}
          <Text style={tw`text-light text-base font-light`}>
            {restaurant.phone}
          </Text>
        </View>
        <View>
          {restaurant.dishes?.map((dish) => {
            return (
              <View key={dish.id} style={tw`border-b border-base-light py-2`}>
                <TouchableOpacity
                  style={tw`flex-row gap-5`}
                  onPress={() => {
                    navigation.navigate("Dish", {
                      dish: { ...dish, restaurant: restaurant.id },
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: `${axios.defaults.baseURL}/api/dish/photo/${dish.photo}`,
                    }}
                    style={tw`w-24 h-24 rounded-lg`}
                  />
                  <View>
                    <Text style={tw`text-light font-bold text-2xl`}>
                      {dish.name}
                    </Text>
                    <Text style={tw`text-light `}>{dish.price}€</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* Order buttons */}
        <View>
          <Text style={tw`text-primary mt-3`}>Order now:</Text>
          <View style={tw`w-64 mx-auto gap-5 mt-3`}>
            {restaurant.link_glovo && <GlovoBtn link={restaurant.link_glovo} />}
            {restaurant.link_just_eat && (
              <JustEatBtn link={restaurant.link_just_eat} />
            )}
            {restaurant.link_uber_eats && (
              <UberEatsBtn link={restaurant.link_uber_eats} />
            )}
            {!restaurant.link_glovo &&
              !restaurant.link_just_eat &&
              !restaurant.link_uber_eats && (
                <Text style={tw`text-light text-center`}>
                  No delivery services available for this restaurant
                </Text>
              )}
          </View>
        </View>
      </ScrollView>
      <Modal isVisible={modal} onBackButtonPress={() => setModal(false)}>
        <View style={tw`bg-base-dark rounded-lg border-2 border-base relative`}>
          <View style={tw`w-80 mx-auto`}>
            <Text style={tw`text-light font-bold text-2xl my-5 text-center`}>
              Report
            </Text>
            <Text style={tw`text-light mb-2`}>
              Please select at least 1 reason
            </Text>
            <PillSelect
              items={reasons}
              title="Select reasons"
              setSelectedItemsDef={setSelectedReasons}
              initialSelected={selectedReasons}
            />
            <Text style={tw`text-light mb-2 mt-5`}>
              Please describe your problem
            </Text>
            <Input
              className={"h-30"}
              placeholder={"Description of your problem"}
              value={description}
              onChange={(text) => setDescription(text)}
            />
            <TouchableOpacity
              style={tw`bg-primary p-3 rounded-lg my-5 w-[50%] mx-auto`}
              onPress={handleReport}
            >
              <Text style={tw`text-black text-center font-bold text-xl`}>
                Report
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
