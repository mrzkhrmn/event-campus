import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";

const Login = () => {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const router = useRouter();
  const handleLogin = () => {
    router.replace("/(campus)/home");
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-10 ">
        <View className=" gap-4  justify-center h-full">
          <Image
            source={require("../../assets/images/eventCampus-logo.png")}
            className="w-250 self-center"
            resizeMode="contain"
          />
          <View className="w-full">
            <Text className="text-base text-gray-600">Email</Text>
            <TextInput
              placeholder="Okul mailiniz..."
              className=" border border-gray-400 py-2 px-4 rounded-lg focus:border-black"
            />
          </View>
          <View className="w-full">
            <Text className="text-base text-gray-600">Password</Text>
            <TextInput
              placeholder="Şifreniz..."
              className=" border border-gray-400 py-2 px-4 rounded-lg"
            />
          </View>
          <View className="flex-row  gap-2">
            <Checkbox
              value={isRememberMe}
              onValueChange={setIsRememberMe}
              color={isRememberMe ? "#9333ea" : "gray"}
            />
            <Text>Beni hatirla</Text>
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
            onPress={() => router.replace("/(auth)/signup")}
            className="underline self-center"
          >
            <Text>Halen hesabin yok mu?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
