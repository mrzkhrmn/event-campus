import { View, Text, SafeAreaView, Pressable, FlatList } from "react-native";
import React from "react";
import { router } from "expo-router";
import ChatRoomItem from "@/components/ChatRoomItem";

const Chat = () => {
  const chatData = [
    {
      id: 1,
      roomName: "Futbol Etkinligi",
      lastMessage: "Merhaba",
      lastMessageTime: "12:00",
      lastMessageSender: "Mehmet",
    },
    {
      id: 2,
      roomName: "Voleybol Etkinligi",
      lastMessage: "Merhaba",
      lastMessageTime: "12:00",
      lastMessageSender: "Ayse",
    },
    {
      id: 3,
      roomName: "Basketbol Etkinligi",
      lastMessage: "Merhaba",
      lastMessageTime: "12:00",
      lastMessageSender: "Ali",
    },
  ];
  return (
    <View className="flex-1 bg-purple-700 ">
      <View className="bg-purple-700 justify-end h-[6.5rem]">
        <View className="flex-row items-center justify-between px-4 py-4">
          <Pressable onPress={() => router.back()} className="w-1/3 ">
            <Text className="text-start text-lg leading-5 text-white font-medium">
              Geri
            </Text>
          </Pressable>
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
      <View className="flex-1 bg-white">
        <Text className="text-2xl text-center py-4 font-semibold">
          Mesajlar
        </Text>
        <FlatList
          data={chatData}
          renderItem={({ item }) => <ChatRoomItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default Chat;
