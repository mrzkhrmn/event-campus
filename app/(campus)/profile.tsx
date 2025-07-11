import EventItem from "@/components/EventItem";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useGetParticipatedEventsQuery } from "@/redux/api/event/eventApi";
import { logout } from "@/redux/slices/userSlice";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, Pressable, View, FlatList } from "react-native";
const Profile = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<"participated" | "created">(
    "participated"
  );

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/(auth)/login");
  };

  const { data: participatedEvents } = useGetParticipatedEventsQuery(
    userInfo?.id,
    { refetchOnMountOrArgChange: true }
  );

  const activeTabStyle = "bg-gray-300 font-semibold";
  const inactiveTabStyle = "bg-gray-200";

  return (
    <View>
      <View className="w-full flex-row items-center justify-center">
        <Pressable
          className={`flex-1 items-center justify-center ${
            selectedTab === "participated" ? activeTabStyle : inactiveTabStyle
          } py-2`}
          onPress={() => setSelectedTab("participated")}
        >
          <Text
            className={`${
              selectedTab === "participated" ? "font-semibold" : "font-normal"
            } text-center text-lg`}
          >
            Katıldığım Etkinlikler
          </Text>
        </Pressable>
        <Pressable
          className={`flex-1 items-center justify-center ${
            selectedTab === "created" ? activeTabStyle : inactiveTabStyle
          } py-2`}
          onPress={() => setSelectedTab("created")}
        >
          <Text
            className={`${
              selectedTab === "created" ? "font-semibold" : "font-normal"
            } text-center text-lg`}
          >
            Düzenlediğim Etkinlikler
          </Text>
        </Pressable>
      </View>
      <View className="">
        <FlatList
          data={participatedEvents?.data}
          renderItem={({ item }) => <EventItem item={item} />}
        />
      </View>
      <Pressable onPress={handleLogout}>
        <Text className="text-red-500 text-center text-lg font-bold">
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default Profile;
