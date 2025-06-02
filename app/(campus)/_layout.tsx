import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import TabBar from "@/components/TabBar";
import CampusHeader from "@/components/CampusHeader";
const CampusLayout = () => {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-purple-700">
        <CampusHeader />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" />
          <Stack.Screen name="new-event" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="[id]" />
        </Stack>
      </SafeAreaView>
      <TabBar />
    </View>
  );
};

export default CampusLayout;
