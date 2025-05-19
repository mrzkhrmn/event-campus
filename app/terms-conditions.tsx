import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { useAppDispatch } from "@/hooks/hooks";
import { setIsTermsAndConditionsDone } from "@/redux/slices/globalSlice";

const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (!isChecked) {
      Alert.alert("Lütfen kullanım sartlarini kabul ediniz.");
      return;
    }
    dispatch(setIsTermsAndConditionsDone(true));
    router.replace("/auth/login");
  };
  return (
    <SafeAreaView className="flex-1">
      <View className=" w-full flex-1 items-center justify-center bg-gray-200">
        <Text>Buraya gorsel gelecek</Text>
      </View>
      <View className="w-full  px-6">
        <Text className=" text-base mt-4">
          EventCampus universite ogrencilerine ozgu bir etkinlik tasarlama ve
          sosyallesme programidir.
        </Text>
        <View className="flex-row items-start gap-2 mt-4 w-full">
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            className="w-6 h-6"
          />
          <Text>
            Acik riza metnini okudum. Kullanim sartlarini kabul ediyor ve
            onayliyorum.
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-purple-700 py-2 rounded-lg mt-3"
        >
          <Text className="text-lg font-bold text-white text-center">
            Devam Et
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
