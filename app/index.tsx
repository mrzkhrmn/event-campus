import { View, Text } from "react-native";
import React from "react";
import Onboarding from "@/components/Onboarding";
import { router } from "expo-router";
const index = () => {
  return (
    <View className="flex-1 ">
      <Onboarding onDone={() => router.replace("/terms-conditions")} />
    </View>
  );
};

export default index;
