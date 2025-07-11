import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { EventCardItemType } from "@/types/EventTypes";
import { formatToDayMonth } from "@/utils/formatDate";
import { router } from "expo-router";
import { formatTime } from "@/utils/formatTime";
const EventItem = ({ item }: { item: EventCardItemType }) => {
  const eventOwner = item.createdByUser.name + " " + item.createdByUser.surname;
  return (
    <View className="gap-2 bg-white p-4">
      <View className="flex-row items-center gap-2">
        <View className="bg-gray-300 p-2 w-12 h-12 rounded-full items-center justify-center relative">
          <Image
            source={require("@/assets/images/default-user.png")}
            resizeMode="contain"
            className="w-full h-full"
          />
        </View>
        <View className="">
          <Text className="font-semibold leading-4">{eventOwner}</Text>
          <Text className="text-sm text-gray-500 leading-4">
            {item.createdByUser.facultyName}
          </Text>
          <Text className="text-sm text-gray-500 leading-4 ">
            {item.createdByUser.departmentName}
          </Text>
        </View>
      </View>
      <View className="border border-gray-300 rounded-xl overflow-hidden">
        <Image
          source={{ uri: item.eventImages[0] }}
          className="w-full h-48 "
          resizeMode="cover"
        />
        <View className="bg-purple-500">
          <View className="flex-row justify-between p-3">
            <View className="gap-2">
              <View className="flex-row gap-1">
                <Text className="text-white font-bold">Etkinlik Adı:</Text>
                <Text className="text-white font-medium">{item.name}</Text>
              </View>
              <View className="flex-row gap-1">
                <Text className="text-white font-bold">Katılımcı Sayısı:</Text>
                <Text className="text-white font-medium">
                  {item.currentParticipantCount}/{item.maxParticipants}
                </Text>
              </View>
              {item.isFree ? (
                <Text className="text-white font-bold">Ücretsiz</Text>
              ) : (
                <View className="flex-row gap-1">
                  <Text className="text-white font-bold">Ücret:</Text>
                  <Text className="text-white font-medium">{item.price} ₺</Text>
                </View>
              )}
            </View>
            <View className="items-end gap-2">
              <Text className="text-white font-bold">
                📅 {formatToDayMonth(item.startDate)}
              </Text>
              <Text className="text-white font-bold">
                🕒 {formatTime(item.startTime)} - {formatTime(item.endTime)}
              </Text>
              <TouchableOpacity
                className="bg-white rounded-full py-0.5 px-2"
                onPress={() => {
                  if (item?.id) {
                    router.push(`/${item.id.toString()}`);
                  }
                }}
              >
                <Text className="text-purple-500 font-bold">
                  {item.isUserParticipant ? "Katıldınız" : "Katıl"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventItem;
