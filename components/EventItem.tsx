import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { EventCardItemType } from "@/types/EventTypes";
import { formatToDayMonth } from "@/utils/formatDate";
import { router } from "expo-router";
const EventItem = ({ item }: { item: EventCardItemType }) => {
  return (
    <View className="border border-gray-300 rounded-xl overflow-hidden">
      <Image
        source={{ uri: item.image }}
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
                {item.participants}/{item.quota}
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
            <View className="flex-row gap-1">
              <Text className="text-white font-bold">Düzenleyen:</Text>
              <Text className="text-white font-medium">{item.owner}</Text>
            </View>
          </View>
          <View className="items-end gap-2">
            <Text className="text-white font-bold">
              📅 {formatToDayMonth(item.date)}
            </Text>
            <Text className="text-white font-bold">
              🕒 {item.startTime} - {item.endTime}
            </Text>
            <Text className="text-white font-bold">🗺️{item.location}</Text>
            <Pressable
              className="bg-white rounded-full py-0.5 px-2"
              onPress={() => router.push(`/${item.id}`)}
            >
              <Text className="text-purple-500 font-bold">Katıl</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventItem;
