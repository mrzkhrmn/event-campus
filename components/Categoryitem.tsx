import { View, Text, Pressable } from "react-native";
import React from "react";
import { CategoryItemType } from "@/types/CategoryTypes";

const Categoryitem = ({
  item,
  handlePressCategory,
  selectedCategoryId,
}: {
  item: CategoryItemType;
  handlePressCategory: () => void;
  selectedCategoryId: number;
}) => {
  const isSelected = item.id === selectedCategoryId;
  return (
    <Pressable
      className={`rounded-lg py-2 border w-32 items-center justify-center ${
        isSelected
          ? "bg-purple-500 border-purple-500"
          : "bg-white border-purple-300"
      }`}
      onPress={handlePressCategory}
    >
      <Text
        className={`font-medium ${
          isSelected ? "text-white" : "text-purple-500"
        }`}
      >
        {item.icon}
        {item.name}
      </Text>
    </Pressable>
  );
};

export default Categoryitem;
