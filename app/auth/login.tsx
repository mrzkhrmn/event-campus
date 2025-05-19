import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
const Login = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.replace("/campus/home");
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-10 ">
        <View className=" gap-4 justify-center items-center h-full">
          <Image
            source={require("../../assets/images/eventCampus-logo.png")}
            className="w-250"
            resizeMode="contain"
          />
          <View className="w-full">
            <Text className="text-base text-gray-600">Email</Text>
            <TextInput
              placeholder="Okul mailiniz..."
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
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-purple-600 py-2 px-4 rounded-lg w-full"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Giriş Yap
            </Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => router.replace("/auth/signup")}
            className="underline"
          >
            <Text>Halen hesabin yok mu?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
