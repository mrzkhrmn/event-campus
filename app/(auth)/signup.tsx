import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useRegisterMutation } from "@/redux/api/auth/authApi";
import { useAppDispatch } from "@/hooks/hooks";
import { loginSuccess } from "@/redux/slices/userSlice";
import { setIsLoading } from "@/redux/slices/globalSlice";
import { Formik } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("İsim boş bırakılamaz"),
  surname: Yup.string().required("Soyisim boş bırakılamaz"),
  email: Yup.string().required("Email boş bırakılamaz"),
  password: Yup.string().required("Şifre boş bırakılamaz"),
});

const Signup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (values: any) => {
    dispatch(setIsLoading(true));
    try {
      const response = await register({
        Name: values.name,
        Surname: values.surname,
        Email: values.email,
        Password: values.password,
      });

      console.log("response", response);
      if (response.error) {
        // Backend'den gelen hata mesajlarını işle
        const error = response.error as any;

        if (error.data && error.data.errors) {
          const errors = error.data.errors;
          let errorMessages: string[] = [];

          // Tüm field'lardaki hata mesajlarını topla
          Object.keys(errors).forEach((field) => {
            const fieldErrors = errors[field];
            if (Array.isArray(fieldErrors)) {
              errorMessages = errorMessages.concat(fieldErrors);
            }
          });

          // Hata mesajlarını alert ile göster
          Alert.alert("Kayıt Hatası", errorMessages.join("\n\n"), [
            { text: "Tamam", style: "default" },
          ]);
        } else {
          // Genel hata mesajı
          Alert.alert(
            "Hata",
            "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.",
            [{ text: "Tamam", style: "default" }]
          );
        }
        return;
      }
      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.userInfo,
        })
      );
      router.replace("/(campus)/home");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Hata",
        "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="px-10 ">
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className=" gap-4 justify-center items-center h-full">
              <Text className="text-3xl font-bold">LOGO</Text>
              <View className="w-full flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-base text-gray-600">İsim</Text>
                  <TextInput
                    placeholder="İsminiz..."
                    className=" border border-gray-400 py-2 px-4 rounded-lg"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />
                  {touched.name && errors.name && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </Text>
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-base text-gray-600">Soyisim</Text>
                  <TextInput
                    placeholder="Soyisminiz..."
                    className=" border border-gray-400 py-2 px-4 rounded-lg"
                    value={values.surname}
                    onChangeText={handleChange("surname")}
                    onBlur={handleBlur("surname")}
                  />
                  {touched.surname && errors.surname && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.surname}
                    </Text>
                  )}
                </View>
              </View>
              <View className="w-full">
                <Text className="text-base text-gray-600">Email</Text>
                <TextInput
                  placeholder="Okul mailiniz..."
                  className=" border border-gray-400 py-2 px-4 rounded-lg"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>
              <View className="w-full">
                <Text className="text-base text-gray-600">Şifre</Text>
                <TextInput
                  placeholder="Şifreniz..."
                  className=" border border-gray-400 py-2 px-4 rounded-lg"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                className="bg-purple-600 py-2 px-4 rounded-lg w-full"
                disabled={isLoading}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
                </Text>
              </TouchableOpacity>
              <Pressable
                onPress={() => router.replace("/(auth)/login")}
                className="underline"
              >
                <Text className="underline">Zaten üyeyim!</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
