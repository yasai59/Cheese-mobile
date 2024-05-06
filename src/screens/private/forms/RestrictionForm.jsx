import { StatusBar } from "expo-status-bar";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import tw from "../../../../twrnc";
import { AppContext } from "../../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FormBtn, Input, OptionSelecter } from "../../../components";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export const RestrictionForm = () => {
  const { restrictions, setRestrictions } = useContext(AppContext);
  const navigate = useNavigation();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [selectedRestrictions, setSelectedRestrictions] =
    useState(restrictions);

  const [allRestrictions, setAllRestrictions] = useState([]);

  const actualDiet = selectedRestrictions.find((r) => r < 3);

  const [diet, setDiet] = useState(actualDiet ?? 3);

  useEffect(() => {
    axios.get("/api/restriction/all").then((res) => {
      setAllRestrictions(res.data.restrictions);
    });
  }, []);

  useEffect(() => {
    setSelectedRestrictions(restrictions);
  }, [restrictions]);

  const handleNext = () => {
    setRestrictions([diet, ...selectedRestrictions.filter((r) => r > 3)]);
    navigate.navigate("Cheese");
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        ...tw`flex-1 bg-base-dark border-base-light`,
      }}
    >
      <View style={tw`border-b border-base-light`}>
        <Text style={tw`text-primary text-3xl font-bold ml-5 mb-3`}>
          Cheese
        </Text>
      </View>
      <View style={tw`flex-1 w-96 m-auto`}>
        <Text style={tw`text-light font-bold text-4xl mt-10`}>
          Are you vegan or have an allergy?
        </Text>
        <View style={tw`flex flex-row justify-between gap-2 mt-2 w-[90%]`}>
          <TouchableOpacity
            onPress={() => setDiet(3)}
            style={tw`flex-grow aspect-square`}
          >
            {diet === 3 ? (
              <LinearGradient
                colors={[
                  tw`text-primary`["color"],
                  tw`text-secondary`["color"],
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.7, y: 0.7 }}
                style={tw`bg-base h-full items-center justify-center rounded-xl`}
              >
                <Text style={tw`text-light font-bold`}>Omnivore</Text>
              </LinearGradient>
            ) : (
              <View
                style={tw`bg-base h-full items-center justify-center rounded-xl`}
              >
                <Text style={tw`text-light`}>Omnivore</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDiet(2)}
            style={tw`flex-grow aspect-square`}
          >
            {diet === 2 ? (
              <LinearGradient
                colors={[tw`text-primary`["color"], "#1A936F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.7, y: 0.7 }}
                style={tw`bg-base h-full items-center justify-center rounded-xl`}
              >
                <Text style={tw`text-light font-bold`}>Vegetarian</Text>
              </LinearGradient>
            ) : (
              <View
                style={tw`bg-base h-full items-center justify-center rounded-xl`}
              >
                <Text style={tw`text-light`}>Vegetarian</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDiet(1)}
            style={tw`flex-grow aspect-square`}
          >
            {diet === 1 ? (
              <LinearGradient
                colors={[tw`text-primary`["color"], "#1A936F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 0.7 }}
                style={tw`bg-base h-full items-center justify-center rounded-xl`}
              >
                <Text style={tw`text-light font-bold`}>Vegan</Text>
              </LinearGradient>
            ) : (
              <View
                style={tw`bg-base h-full items-center justify-center rounded-xl`}
              >
                <Text style={tw`text-light`}>Vegan</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Input
          className={`mt-5 mb-5`}
          placeholder={"Search for types of food"}
          value={search}
          onChange={(text) => setSearch(text)}
        />
        <OptionSelecter
          selectedOptions={selectedRestrictions}
          setSelectedOptions={setSelectedRestrictions}
          options={allRestrictions.filter((r) => r.id > 3)}
          filter={search}
        />
        <View style={tw`mb-5`} />
        <FormBtn title={"Start exploring"} handlePress={handleNext} />
      </View>
      <StatusBar style="light" />
    </View>
  );
};
