import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import {
  useLoginMutation,
  useVerifyOtpMutation,
} from "../../redux/api/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setIsLoading } from "@/redux/slices/globalSlice";
import { loginSuccess, setRememberMe } from "@/redux/slices/userSlice";

const Login = () => {
  const { userInfo, rememberMe } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [email, setEmail] = useState("mrzkhrmn@hotmail.com");
  const [password, setPassword] = useState("mirza123");
  const [verifyOtp] = useVerifyOtpMutation();

  const handleLogin = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await login({
        email: email,
        password: password,
      });
      console.log("response", response);

      if (response.data.data.requiresVerification) {
        setShowVerificationModal(true);
        dispatch(setIsLoading(false));
        return;
      }

      if (response.error) {
        return Alert.alert(
          "Giriş Yapılamadı",
          "Kullanıcı bilgilerinizi kontrol ediniz!"
        );
      }

      dispatch(
        loginSuccess({
          token: response.data.data.token,
          user: response.data.data.student,
        })
      );
      router.replace("/(campus)/home");
    } catch (error: any) {
      Alert.alert("Hata", error.message);
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleVerificationSubmit = async () => {
    if (!verificationCode.trim()) {
      Alert.alert("Uyarı", "Doğrulama kodunu giriniz");
      return;
    }

    dispatch(setIsLoading(true));
    try {
      const response = await verifyOtp({
        code: verificationCode,
      });

      console.log("verifyResponse", response);
      if (response.error) {
        Alert.alert("Hata", "Doğrulama kodu hatalı");
        return;
      }

      const loginResponse = await login({
        email: email,
        password: password,
      });

      if (loginResponse.error) {
        return Alert.alert(
          "Giriş Yapılamadı",
          "Kullanıcı bilgilerinizi kontrol ediniz!"
        );
      }

      dispatch(
        loginSuccess({
          token: loginResponse.data.data.token,
          user: loginResponse.data.data.student,
        })
      );

      setShowVerificationModal(false);
      setVerificationCode("");
      router.replace("/(campus)/home");
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleSubmit = () => {
    if (!email) {
      Alert.alert("Uyarı", "Email adresi zorunludur");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Uyarı", "Geçerli bir email adresi giriniz");
      return;
    }

    if (!password) {
      Alert.alert("Uyarı", "Şifre zorunludur");
      return;
    }

    if (password.length < 4) {
      Alert.alert("Uyarı", "Şifre en az 4 karakter olmalıdır");
      return;
    }

    handleLogin();
  };

  const closeVerificationModal = () => {
    setShowVerificationModal(false);
    setVerificationCode("");
  };
  console.log("login ekraninda", userInfo);
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
              className={`border border-gray-400 py-2 px-4 rounded-lg focus:border-black `}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="w-full">
            <Text className="text-base text-gray-600">Password</Text>
            <TextInput
              placeholder="Şifreniz..."
              className={`border border-gray-400 py-2 px-4 rounded-lg focus:border-black `}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View className="w-full justify-between flex-row">
            <View className="flex-row  gap-2">
              <Checkbox
                value={rememberMe}
                onValueChange={() => dispatch(setRememberMe(!rememberMe))}
                color={rememberMe ? "#9333ea" : "gray"}
              />
              <Text>Beni hatırla</Text>
            </View>
            <Text className="underline">Şifrenizi mi unuttunuz?</Text>
          </View>

          <TouchableOpacity
            onPress={() => handleSubmit()}
            className="bg-purple-600 py-2 px-4 rounded-lg w-full"
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Text>
          </TouchableOpacity>

          <Pressable onPress={() => router.replace("/(auth)/signup")}>
            <Text className="underline self-center">Hayla hesabın yok mu?</Text>
          </Pressable>
        </View>
      </View>

      {/* Doğrulama Kodu Modal */}
      <Modal
        visible={showVerificationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeVerificationModal}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white rounded-lg p-6 w-80 mx-4">
            <Text className="text-xl font-bold text-center mb-4">
              Doğrulama Kodu
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Email adresinize gönderilen doğrulama kodunu giriniz
            </Text>

            <TextInput
              placeholder="Doğrulama kodunu giriniz..."
              className="border border-gray-400 py-3 px-4 rounded-lg mb-4 text-center text-lg"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="numeric"
              maxLength={6}
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={closeVerificationModal}
                className="flex-1 bg-gray-300 py-3 px-4 rounded-lg"
              >
                <Text className="text-gray-700 text-center font-semibold">
                  İptal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-purple-600 py-3 px-4 rounded-lg"
                onPress={() => handleVerificationSubmit()}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-semibold">
                  {isLoading ? "Doğrulanıyor..." : "Doğrula"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Login;
