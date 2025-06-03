import React from "react";
import { View, Text, Pressable } from "react-native";
import { ChatRoomItems } from "@/types/ChatTypes";
import { router } from "expo-router";
const ChatRoomItem = ({ item }: { item: ChatRoomItems }) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(chat)/[id]",
          params: { id: item.id },
        })
      }
      className="w-full py-2 bg-gray-100 border-t border-gray-400 px-2"
    >
      <View className="flex-row items-center justify-between gap-2">
        <View className="w-14 h-14 rounded-full bg-gray-400 items-center justify-center">
          <Text className="text-white">Resim</Text>
        </View>
        <View className="flex-1 gap-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-medium">{item.roomName}</Text>
            <Text className="text-white bg-green-500 py-1 px-2 rounded-full mr-2">
              2
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text>{item.lastMessageSender}:</Text>
            <View className="flex-row items-center gap-2 justify-between flex-1">
              <Text>{item.lastMessage}</Text>
              <Text>{item.lastMessageTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatRoomItem;
