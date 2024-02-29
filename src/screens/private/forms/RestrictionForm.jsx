import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import tw from "../../../../twrnc";
import { AppContext } from "../../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FormBtn, Input, OptionSelecter } from "../../../components";
import axios from "axios";

export const RestrictionForm = () => {
  const { restrictions, setRestrictions } = useContext(AppContext);
  const navigate = useNavigation();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [selectedRestrictions, setSelectedRestrictions] =
    useState(restrictions);

  const [allRestrictions, setAllRestrictions] = useState([]);

  useEffect(() => {
    axios.get("/api/restriction/all").then((res) => {
      setAllRestrictions(res.data.restrictions);
    });
  }, []);

  useEffect(() => {
    setSelectedRestrictions(restrictions);
  }, [restrictions]);

  const handleNext = () => {
    setRestrictions(selectedRestrictions);
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
        <Input
          className={`mt-5 mb-5`}
          placeholder={"Search for types of food"}
          value={search}
          onChange={(text) => setSearch(text)}
        />
        <OptionSelecter
          selectedOptions={selectedRestrictions}
          setSelectedOptions={setSelectedRestrictions}
          options={allRestrictions}
          filter={search}
        />
        <View style={tw`mb-5`} />
        <FormBtn title={"Start exploring"} handlePress={handleNext} />
      </View>
      <StatusBar style="light" />
    </View>
  );
};
