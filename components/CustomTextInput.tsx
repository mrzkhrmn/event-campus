import { View, Text, TextInput } from "react-native";
import React from "react";
import { CustomTextInputProps } from "@/types/ComponentTypes";

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  type = "text",
}: CustomTextInputProps) => {
  return (
    <View>
      <Text className="font-medium">{label}</Text>
      <TextInput
        keyboardType={type === "numeric" ? "numeric" : "default"}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="border border-purple-300 rounded-md p-3 placeholder:text-gray-400 focus:border-purple-500"
      />
    </View>
  );
};

export default CustomTextInput;
