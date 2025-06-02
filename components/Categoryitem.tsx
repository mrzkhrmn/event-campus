import { View, Text, Pressable } from "react-native";
import React from "react";
import { CategoryItemType } from "@/types/CategoryTypes";

const Categoryitem = ({
  item,
  handlePressCategory,
}: {
  item: CategoryItemType;
  handlePressCategory: () => void;
}) => {
  return (
    <Pressable
      className={`rounded-lg p-2 border ${
        item.isSelected
          ? "bg-purple-500 border-purple-500"
          : "bg-white border-purple-300"
      }`}
      onPress={handlePressCategory}
    >
      <Text
        className={`font-medium ${
          item.isSelected ? "text-white" : "text-purple-500"
        }`}
      >
        {item.icon}
        {item.name}
      </Text>
    </Pressable>
  );
};

export default Categoryitem;
