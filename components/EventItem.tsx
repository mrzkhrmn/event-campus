import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { EventCardItemType } from "@/types/EventTypes";
import {
  formatToClock,
  formatToDayMonth,
  formatToDayMonthYear,
} from "@/utils/formatDate";
import { router } from "expo-router";
import { WP } from "@/utils/dimensionsWidth";
const EventItem = ({ item }: { item: EventCardItemType }) => {
  console.log(item);
  return (
    <View className="gap-2 bg-white p-4">
      <View className="flex-row items-center gap-2">
        <Pressable
          className=" w-12 h-12 overflow-hidden rounded-full items-center justify-center relative"
          onPress={() => {
            router.push(`/student/${item.eventOwner.id}`);
          }}
        >
          <Image
            source={{ uri: item.eventOwner.profileImage }}
            resizeMode="cover"
            className="w-full h-full object-center"
          />
        </Pressable>
        <View className="flex-row flex-1 justify-between">
          <View>
            <Text className="font-semibold leading-4">
              {item.eventOwner.name} {item.eventOwner.surname}
            </Text>
            <Text className="text-sm text-gray-500 leading-4">
              {item.eventOwner.departmentName}
            </Text>
            <Text className="text-sm text-gray-500 leading-4 ">
              {item.eventOwner.facultyName}
            </Text>
          </View>
          <Text className="text-sm text-gray-500 leading-4 ">
            {formatToDayMonthYear(item.createdAt)}
          </Text>
        </View>
      </View>
      <View className="border border-gray-300 rounded-xl overflow-hidden">
        <Image
          source={{ uri: item.eventImages[0] }}
          className="w-full h-48 z-10"
          resizeMode="cover"
        />
        <View className="bg-purple-500">
          <View className="flex-row justify-between p-3">
            <View className="gap-2">
              <View className="flex-row gap-1">
                <Text className="text-white font-bold">Etkinlik Adı:</Text>
                <Text
                  className="text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                  numberOfLines={1}
                  style={{ width: WP(32) }}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
              </View>
              <View className="flex-row gap-1">
                <Text className="text-white font-bold">Katılımcı Sayısı:</Text>
                <Text className="text-white font-medium">
                  {item.currentParticipants}/{item.maxParticipants}
                </Text>
              </View>
              {item.isFree ? (
                <Text className="text-white font-bold">Ücretsiz</Text>
              ) : (
                <View className="flex-row gap-1">
                  <Text className="text-white font-bold">Ücret:</Text>
                  <Text className="text-white font-medium">
                    {item.eventPrice} ₺
                  </Text>
                </View>
              )}
            </View>
            <View className="items-end gap-2">
              <Text className="text-white font-bold">
                📅 {formatToDayMonth(item.startDate)}
              </Text>
              <Text className="text-white font-bold">
                🕒 {formatToClock(item.startDate)} -{" "}
                {formatToClock(item.endDate)}
              </Text>
              <TouchableOpacity
                className="bg-white rounded-full py-0.5 px-2"
                onPress={() => {
                  if (item?.id) {
                    router.push(`/${item.id.toString()}`);
                  }
                }}
              >
                <Text className="text-purple-500 font-bold">{"Detay"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventItem;
