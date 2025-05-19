import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
const Signup = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <View className="px-10 ">
        <View className=" gap-4 justify-center items-center h-full">
          <Text className="text-3xl font-bold">LOGO</Text>
          <View className="w-full">
            <Text className="text-base text-gray-600">Email</Text>
            <TextInput
              placeholder="Okul mailiniz..."
              className=" border border-gray-400 py-2 px-4 rounded-lg"
            />
          </View>
          <View className="w-full">
            <Text className="text-base text-gray-600">Username</Text>
            <TextInput
              placeholder="Kullanıcı adınız..."
              className=" border border-gray-400 py-2 px-4 rounded-lg"
            />
          </View>
          <View className="w-full">
            <Text className="text-base text-gray-600">Password</Text>
            <TextInput
              placeholder="Şifreniz..."
              className=" border border-gray-400 py-2 px-4 rounded-lg"
            />
          </View>
          <TouchableOpacity className="bg-purple-600 py-2 px-4 rounded-lg w-full">
            <Text className="text-white text-center font-semibold">
              Kayıt Ol
            </Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => router.replace("/auth/login")}
            className="underline"
          >
            <Text>Zaten üyeyim!</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
