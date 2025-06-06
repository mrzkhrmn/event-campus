import { useAppDispatch } from "@/hooks/hooks";
import { logout } from "@/redux/slices/userSlice";
import { router } from "expo-router";
import React from "react";
import { Text, Pressable } from "react-native";

const Profile = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/(auth)/login");
  };

  return (
    <Pressable onPress={handleLogout}>
      <Text className="text-red-500 text-center text-lg font-bold">Logout</Text>
    </Pressable>
  );
};

export default Profile;
