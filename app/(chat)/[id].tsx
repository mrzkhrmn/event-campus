import {
  View,
  Text,
  Pressable,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { router } from "expo-router";
const ChatRoom = () => {
  return (
    <SafeAreaView className="flex-1 bg-purple-700">
      <View className="bg-purple-700 justify-end ">
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="bg-white flex-1 ">
            <View className="w-full flex-row items-center gap-10 px-4 py-4 border-b border-purple-400">
              <Pressable onPress={() => router.back()}>
                <Text className="text-lg font-semibold">Geri</Text>
              </Pressable>
              <View className="flex-row items-center gap-2">
                <View className="w-16 h-16 bg-gray-400 rounded-full justify-center items-center">
                  <Text>Gorsel</Text>
                </View>
                <Text className="text-xl font-semibold">Futbol Etkinligi</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2 px-4 py-4">
              <View className=" w-12 h-12 bg-purple-300 items-center justify-center rounded-full">
                <Text>Gorsel</Text>
              </View>
              <View className="bg-purple-500  p-2 max-w-md rounded-lg flex-1">
                <Text className="text-white text-lg">
                  Lorem ipsum dolor sit amet consectetur elit. Quisquam, quos.
                </Text>
              </View>
            </View>
            <View className="flex-1 justify-end">
              <View className="w-full bg-purple-700 p-4 flex-row items-center gap-2">
                <Pressable className="bg-purple-500  rounded-l  w-10 h-9 items-center justify-center rounded-lg">
                  <Text className="text-white text-2xl font-bold ">+</Text>
                </Pressable>
                <TextInput
                  placeholder="Mesaj yaz..."
                  className="bg-gray-200 p-2 rounded-lg flex-1"
                />
                <Pressable className="bg-purple-500  rounded-l  items-center justify-center rounded-lg">
                  <Text className="text-white py-2 px-2 ">Gonder</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoom;
