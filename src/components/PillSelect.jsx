import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import tw from "../../twrnc";
import { AppContext } from "../context/AppContext";
import { Pill } from "./Pill";
import { ScrollView } from "react-native";
import { FormBtn } from "./FormBtn";

export const PillSelect = ({
  title = "No title",
  items = [],
  setSelectedItemsDef = () => {},
  initialSelected = [],
}) => {
  const [open, setOpen] = React.useState(false);

  const [selected, setSelected] = React.useState([]);

  const [confirmed, setConfirmed] = React.useState([]);

  useEffect(() => {
    setConfirmed(initialSelected || []);
    setSelected(initialSelected || []);
  }, []);

  const handleClickPill = (index) => {
    setSelected((prev) => {
      if (!!prev.find((i) => i.id === index.id)) {
        return prev.filter((i) => i.id !== index.id);
      }
      return [...prev, index];
    });
  };

  const handleSave = () => {
    setSelectedItemsDef(selected);
    setConfirmed(selected);
    setOpen(false);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setSelected(confirmed);
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        style={tw`bg-base rounded-lg h-13 relative z-50 flex-row  items-center p-2 gap-2 overflow-hidden`}
        onPress={handleOpen}
      >
        {confirmed?.map((item, i) => (
          <Pill key={i} text={item.name} className={"text-sm"} active={true} />
        ))}
      </TouchableOpacity>
      <Modal isVisible={open} onBackButtonPress={handleClose}>
        <View style={tw`bg-base-dark rounded-xl border-2 border-base`}>
          <Text style={tw`px-5 pt-3 text-light text-2xl text-center`}>
            {title}
          </Text>

          <View style={tw`flex-row flex-wrap gap-2 p-5 `}>
            {items.map((item, i) => (
              <Pill
                key={i}
                text={item.name}
                className={"text-sm"}
                active={!!selected.find((i) => i.id === item.id)}
                onPress={() => handleClickPill(item)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={tw`w-20 self-end m-5 bg-primary h-10 items-center justify-center rounded-lg`}
            onPress={handleSave}
          >
            <Text style={tw`font-bold text-lg`}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};
