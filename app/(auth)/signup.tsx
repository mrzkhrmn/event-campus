import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
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
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (values: any) => {
    dispatch(setIsLoading(true));
    try {
      const response = await register({
        Name: values.name,
        Surname: values.surname,
        Email: values.email,
        Password: values.password,
        Birthday: new Date(),
        UniversityId: values.university,
        FacultyId: values.faculty,
        ProfileImageUrl: "",
      });

      if (response.data.IsSuccess) {
        dispatch(
          loginSuccess({
            token: response.data.token,
            user: response.data.student,
          })
        );
        router.replace("/(campus)/home");
      }
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

  return (
    <SafeAreaView className="flex-1">
      <View className="px-10 ">
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
            <View className=" gap-4 justify-center items-center h-full">
              <Text className="text-3xl font-bold">LOGO</Text>
              <View className="w-full flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-base text-gray-600">İsim</Text>
                  <TextInput
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
