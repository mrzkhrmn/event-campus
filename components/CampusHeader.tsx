import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
const CampusHeader = () => {
  return (
    <View className="bg-purple-700">
      <View className="flex-row items-center justify-between px-4 py-4">
        <Text className="w-1/3 text-start text-lg leading-5 text-white font-medium">{`Hosgeldin\nMehmet`}</Text>
        <Text className="text-white text-2xl font-bold text-center w-1/3">
          LOGO
        </Text>
        <View className="w-1/3 items-end">
          <Pressable
            className="text-lg text-white font-medium"
            onPress={() => router.push("/chat")}
          >
            <Text className="text-lg text-white font-medium">Chat</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CampusHeader;
