import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import TabBar from "@/components/TabBar";

const CampusLayout = () => {
  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="new-event" />
        <Stack.Screen name="settings" />
      </Stack>
      <TabBar />
    </View>
  );
};

export default CampusLayout;
