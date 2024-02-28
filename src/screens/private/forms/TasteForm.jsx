import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useContext, useState } from "react";
import tw from "../../../../twrnc";
import { AppContext } from "../../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FormBtn, Input, OptionSelecter } from "../../../components";

export const TasteForm = () => {
  const { tastes } = useContext(AppContext);
  const navigate = useNavigation();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [selectedTastes, setSelectedTastes] = useState(tastes);

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
          Let us know what you do like
        </Text>
        <Input
          className={`mt-5 mb-5`}
          placeholder={"Search for types of food"}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <OptionSelecter
          selectedOptions={selectedTastes}
          setSelectedOptions={setSelectedTastes}
        />
        <FormBtn
          title={"Next step"}
          handlePress={() => navigate.navigate("RestrictionForm")}
        />
        <Text
          style={tw`text-primary underline mt-5`}
          onPress={() => {
            navigate.navigate("Cheese");
          }}
        >
          Skip form - taste
        </Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
};
