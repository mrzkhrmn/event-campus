import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";

const SearchBar = ({ handleSearch }: { handleSearch: () => void }) => {
  return (
    <View className="px-4 mt-4 flex-row items-center  w-full">
      <TextInput
        placeholder="Arama yapiniz..."
        className="border border-purple-300 rounded-l-lg p-2 focus:border-purple-500 flex-1 placeholder:text-gray-400"
      />
      <Pressable
        onPress={handleSearch}
        className="bg-purple-500 rounded-r-lg p-2 w-1/6 justify-center items-center"
      >
        <Text className="text-white text-lg">Ara</Text>
      </Pressable>
    </View>
  );
};

export default SearchBar;
