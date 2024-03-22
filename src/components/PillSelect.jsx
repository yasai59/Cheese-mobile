import React, { useContext } from "react";
import { Text, View } from "react-native";
import tw from "../../twrnc";
import { AppContext } from "../context/AppContext";
import { Pill } from "./Pill";
import { ScrollView } from "react-native";

export const PillSelect = () => {
  const { allTastes } = useContext(AppContext);

  console.log(allTastes);

  return (
    <View style={tw`bg-base rounded-lg h-13 relative z-50`}>
      <View
        style={tw`absolute top-12 w-full border-t border-base-light bg-base rounded-b-lg `}
      >
        <ScrollView style={tw`flex-1`}>
          <View style={tw`flex-row flex-wrap gap-2 p-1 overflow-scroll h-100`}>
            {allTastes.map((taste, i) => (
              <Pill
                key={i}
                text={taste.name}
                active={false}
                className={"text-sm"}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
