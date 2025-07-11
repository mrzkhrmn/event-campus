import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import HomeTabIcon from "@/constants/icons/HomeTabIcon";
import { router, usePathname } from "expo-router";

const TabIcon = ({
  focused,
  activeIcon,
  inactiveIcon,
  title,
}: {
  focused: boolean;
  activeIcon: any;
  inactiveIcon: any;
  title: string;
}) => {
  return (
    <View className="w-50 items-center py-2">
      {focused ? activeIcon : inactiveIcon}
      <Text
        className={`w-full text-center text-[12px] font-[600] ${
          focused ? "text-white" : "text-gray-200"
        }`}
      >
        {title}
      </Text>
    </View>
  );
};

const tabs = [
  {
    route: "/(campus)/home" as const,
    name: "home",
    title: "Anasayfa",
    icon: HomeTabIcon,
  },
  {
    route: "/(campus)/new-event" as const,
    name: "new-event",
    title: "Yeni Etkinlik",
    icon: HomeTabIcon,
  },
  {
    route: "/(campus)/profile" as const,
    name: "profile",
    title: "Profil",
    icon: HomeTabIcon,
  },
];

const TabBar = () => {
  const pathname = usePathname();

  return (
    <View className="flex-row justify-around bg-purple-700 pb-4">
      {tabs.map((tab) => {
        const isActive = pathname === `/${tab.name}`;
        const Icon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.route}
            onPress={() => {
              if (isActive) return;
              router.push(tab.route as any);
            }}
            className="flex-1"
          >
            <TabIcon
              focused={isActive}
              activeIcon={<Icon />}
              inactiveIcon={<Icon />}
              title={tab.title}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
