import { View, Text } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { CustomCheckboxProps } from "@/types/ComponentTypes";

const CustomCheckbox = ({
  value,
  onValueChange,
  color,
  label,
}: CustomCheckboxProps) => {
  return (
    <View className="flex-row items-center gap-2">
      <Checkbox color={color} value={value} onValueChange={onValueChange} />
      <Text className="font-medium">{label}</Text>
    </View>
  );
};

export default CustomCheckbox;
