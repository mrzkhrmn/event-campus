import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../redux/api/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setIsLoading } from "@/redux/slices/globalSlice";
import { loginSuccess, setRememberMe } from "@/redux/slices/userSlice";

// Validasyon şeması
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email adresi zorunludur"),
  password: Yup.string()
    .min(4, "Şifre en az 4 karakter olmalıdır")
    .required("Şifre zorunludur"),
});

const Login = () => {
  const { userInfo, rememberMe } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (values: { email: string; password: string }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      console.log(response);

      if (response.error) {
        return Alert.alert(
          "Giriş Yapılamadı",
          "Kullanıcı bilgilerinizi kontrol ediniz!"
        );
      }

      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.userInfo,
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

  const handleSubmit = (
    values: { email: string; password: string },
    { setFieldError }: any
  ) => {
    // Manuel validasyon kontrolü
    if (!values.email) {
      Alert.alert("Uyarı", "Email adresi zorunludur");
      return;
    }

    if (!values.email.includes("@")) {
      Alert.alert("Uyarı", "Geçerli bir email adresi giriniz");
      return;
    }

    if (!values.password) {
      Alert.alert("Uyarı", "Şifre zorunludur");
      return;
    }

    if (values.password.length < 4) {
      Alert.alert("Uyarı", "Şifre en az 4 karakter olmalıdır");
      return;
    }

    // Validasyon başarılı, login işlemini başlat
    handleLogin(values);
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

          <Formik
            initialValues={{
              email: (userInfo as any)?.email || "mirza.kahraman@itu.edu.tr",
              password: (userInfo as any)?.password || "Test123!",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <View className="w-full">
                  <Text className="text-base text-gray-600">Email</Text>
                  <TextInput
                    placeholder="Okul mailiniz..."
                    className={`border border-gray-400 py-2 px-4 rounded-lg ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "focus:border-black"
                    }`}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.email as string}
                    </Text>
                  )}
                </View>

                <View className="w-full">
                  <Text className="text-base text-gray-600">Password</Text>
                  <TextInput
                    placeholder="Şifreniz..."
                    className={`border border-gray-400 py-2 px-4 rounded-lg ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : "focus:border-black"
                    }`}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.password as string}
                    </Text>
                  )}
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
              </>
            )}
          </Formik>

          <Pressable onPress={() => router.replace("/(auth)/signup")}>
            <Text className="underline self-center">Hayla hesabın yok mu?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
