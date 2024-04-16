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
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  return (
    <ScrollView style={tw`w-90 mx-auto mt-5`}>
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
              name="pencil-outline"
              size={32}
              color={tw`text-light`["color"]}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}?xd=${act}`,
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
  );
};
