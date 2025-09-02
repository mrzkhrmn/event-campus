import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useRegisterMutation } from "@/redux/api/auth/authApi";
import { useAppDispatch } from "@/hooks/hooks";
import { loginSuccess } from "@/redux/slices/userSlice";
import { setIsLoading } from "@/redux/slices/globalSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { useGetAllUniversitiesQuery } from "@/redux/api/university/universityApi";
import CustomPicker from "@/components/CustomPicker";
import { University } from "@/types/University";
import { useGetFacultiesByUniversityIdQuery } from "@/redux/api/faculty/facultyApi";
import { useGetDepartmentsByFacultyIdQuery } from "@/redux/api/department/departmentApi";
import * as ImagePicker from "expo-image-picker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("İsim boş bırakılamaz"),
  surname: Yup.string().required("Soyisim boş bırakılamaz"),
  email: Yup.string().required("Email boş bırakılamaz"),
  password: Yup.string().required("Şifre boş bırakılamaz"),
  university: Yup.string().required("Üniversite boş bırakılamaz"),
  faculty: Yup.string().required("Fakülte boş bırakılamaz"),
  department: Yup.string().required("Bölüm boş bırakılamaz"),
});

const Signup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showUniversityPicker, setShowUniversityPicker] = useState(false);
  const [showFacultyPicker, setShowFacultyPicker] = useState(false);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>("");
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>("");

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (values: any) => {
    dispatch(setIsLoading(true));
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Name", values.name);
      formDataToSend.append("Surname", values.surname);
      formDataToSend.append("Email", values.email);
      formDataToSend.append("Password", values.password);
      formDataToSend.append("Birthday", new Date().toISOString());
      formDataToSend.append("UniversityId", values.university);
      formDataToSend.append("FacultyId", values.faculty);
      formDataToSend.append("DepartmentId", values.department);
      formDataToSend.append("ProfileImage", {
        uri: selectedImage.uri,
        name: `profile-image.jpg`,
        type: "image/jpeg",
      } as any);

      const response = await register(formDataToSend).unwrap();

      console.log("response", response);

      if (!response.isSuccess || response.data) {
        Alert.alert("Hata", response.errors[0].message);
        return;
      }

      dispatch(
        loginSuccess({
          token: response.data.data.token,
          user: response.data.data.student,
        })
      );
      router.replace("/(campus)/home");
    } catch (error) {
      console.log("signup error", error);
      Alert.alert(
        "Hata",
        "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const { data: universities } = useGetAllUniversitiesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const { data: faculties } = useGetFacultiesByUniversityIdQuery(
    selectedUniversityId,
    {
      skip: !selectedUniversityId,
    }
  );

  const { data: departments } = useGetDepartmentsByFacultyIdQuery(
    selectedFacultyId,
    {
      skip: !selectedFacultyId,
    }
  );

  const handleSelectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Hata", "Fotoğraf izinleri verilmedi.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  console.log("universities", universities);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="px-10 flex-1">
            <Formik
              initialValues={{
                name: "",
                surname: "",
                email: "",
                password: "",
                university: "",
                faculty: "",
                department: "",
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
                setFieldValue,
              }) => (
                <View className=" gap-2 justify-center items-center h-full">
                  <View className=" items-center gap-2 relative">
                    <Image
                      className="w-28 h-28 border rounded-full border-purple-400 object-center"
                      source={
                        selectedImage
                          ? { uri: selectedImage.uri }
                          : require("@/assets/images/default-user.png")
                      }
                      resizeMode="cover"
                    />
                    <Pressable
                      onPress={handleSelectImage}
                      className="border-purple-400 border rounded-lg py-1 px-2"
                    >
                      <Text className="text-purple-400">Fotoğraf Seç</Text>
                    </Pressable>
                    {selectedImage && (
                      <Pressable
                        onPress={() => setSelectedImage("")}
                        className="border border-red-500 rounded-lg py-1 px-2 absolute top-0 -right-5"
                      >
                        <Text className="text-red-500">X</Text>
                      </Pressable>
                    )}
                  </View>
                  <View className="w-full flex-row gap-4">
                    <View className="flex-1">
                      <Text className="text-base text-gray-600">İsim</Text>
                      <TextInput
                        placeholderTextColor="gray"
                        placeholder="İsminiz..."
                        className=" border border-purple-300 rounded-md p-3"
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
                        placeholderTextColor="gray"
                        placeholder="Soyisminiz..."
                        className=" border border-purple-300 rounded-md p-3"
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
                      placeholderTextColor="gray"
                      placeholder="Okul mailiniz..."
                      className=" border border-purple-300 rounded-md p-3"
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
                    <Text className="text-base text-gray-600">Üniversite</Text>
                    <CustomPicker
                      selectedValue={values.university}
                      setSelectedValue={(value: string) => {
                        setFieldValue("university", value);
                        setSelectedUniversityId(value);
                        setFieldValue("faculty", "");
                      }}
                      itemData={
                        universities?.data
                          ? universities.data.map((item: University) => ({
                              text: item.name,
                              value: item.id,
                            }))
                          : []
                      }
                      isModalVisible={showUniversityPicker}
                      setIsModalVisible={setShowUniversityPicker}
                      label=""
                    />
                    {touched.university && errors.university && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.university}
                      </Text>
                    )}
                  </View>
                  <View className="w-full">
                    <Text className="text-base text-gray-600">Fakülte</Text>
                    <CustomPicker
                      selectedValue={values.faculty}
                      setSelectedValue={(value: string) => {
                        setFieldValue("faculty", value);
                        setSelectedFacultyId(value);
                      }}
                      itemData={
                        faculties?.data
                          ? faculties.data.map((item: any) => ({
                              text: item.name,
                              value: item.id,
                            }))
                          : []
                      }
                      isModalVisible={showFacultyPicker}
                      setIsModalVisible={setShowFacultyPicker}
                      label=""
                    />
                    {touched.faculty && errors.faculty && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.faculty}
                      </Text>
                    )}
                  </View>
                  <View className="w-full">
                    <Text className="text-base text-gray-600">Bölüm</Text>
                    <CustomPicker
                      selectedValue={values.department}
                      setSelectedValue={(value: string) =>
                        setFieldValue("department", value)
                      }
                      itemData={
                        departments?.data
                          ? departments.data.map((item: any) => ({
                              text: item.name,
                              value: item.id,
                            }))
                          : []
                      }
                      isModalVisible={showDepartmentPicker}
                      setIsModalVisible={setShowDepartmentPicker}
                      label=""
                    />
                    {touched.department && errors.department && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.department}
                      </Text>
                    )}
                  </View>
                  <View className="w-full">
                    <Text className="text-base text-gray-600">Şifre</Text>
                    <TextInput
                      placeholderTextColor="gray"
                      placeholder="Şifreniz..."
                      className=" border border-purple-300 rounded-md p-3"
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
                    className="bg-purple-600 py-2 px-4 rounded-lg w-full mt-4"
                    disabled={isLoading}
                  >
                    <Text className="text-white text-center font-semibold text-lg">
                      {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
                    </Text>
                  </TouchableOpacity>
                  <Pressable
                    onPress={() => router.replace("/(auth)/login")}
                    className="underline mt-3"
                  >
                    <Text className="underline">Zaten üyeyim!</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
