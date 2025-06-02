import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { formatToDayMonthYear } from "@/utils/formatDate";

const EventDetail = () => {
  const { id } = useLocalSearchParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);

  console.log(id);

  const fullDescription =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.";

  const truncatedDescription = fullDescription
    .split(" ")
    .slice(0, 20)
    .join(" ");

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 bg-white px-4">
      <ScrollView
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row mt-4 items-center gap-2">
          <Pressable
            className="bg-purple-500 flex-row rounded-full py-1 px-4"
            onPress={() => router.back()}
          >
            <Text className="text-lg font-medium text-white">Geri</Text>
          </Pressable>
          <Text className="text-2xl font-medium">Etkinlik Detay</Text>
        </View>
        <View className="mt-4">
          <Image
            source={{
              uri: "https://picsum.photos/200/300",
            }}
            resizeMode="cover"
            className="w-full h-[20rem] rounded-lg"
          />
          <View className="border-b py-4 gap-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Etkinlik Adı:</Text>
              <Text className="text-xl font-medium">Futol Etkinligi</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Tarih:</Text>
              <Text className="text-xl font-medium">
                {formatToDayMonthYear(new Date().toISOString())}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">
                Başlangıç-Bitiş Saati:
              </Text>
              <Text className="text-xl font-medium">14:00 - 15:00</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Katılımcı Sayısı:</Text>
              <Text className="text-xl font-medium">2/100</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Düzenleyen:</Text>
              <Text className="text-xl font-medium">Ahmet Yılmaz</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Ücret:</Text>
              <Text className="text-xl font-medium">100 TL</Text>
            </View>
          </View>
          <View className="flex-col gap-2 mt-4 border-b pb-4">
            <Text className="text-xl font-medium">Etkinlik Açıklaması:</Text>
            <View>
              <Text className="text-xl font-medium">
                {showFullDescription ? (
                  <>
                    {fullDescription}
                    <Text
                      className="text-purple-500 font-medium"
                      onPress={() => setShowFullDescription(false)}
                    >
                      {" "}
                      Daha az gör
                    </Text>
                  </>
                ) : (
                  <>
                    {truncatedDescription}...
                    <Text
                      className="text-purple-500 font-medium"
                      onPress={() => setShowFullDescription(true)}
                    >
                      {" "}
                      devamını gör
                    </Text>
                  </>
                )}
              </Text>
            </View>
          </View>
          <View className="flex-col gap-2 mt-4 border-b pb-4">
            <Text className="text-xl font-medium">Kurallar ve Notlar:</Text>
            <Text className="text-xl font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </Text>
          </View>
          <Text className="text-xl font-medium mt-4">Harita Konumu:</Text>
          <Text className="text-lg font-medium mt-2">
            Tiklayip haritalarda görebilirsiniz.
          </Text>
          <Pressable onPress={openInGoogleMaps} className="mt-2">
            <MapView
              style={{
                width: "100%",
                height: 200,
                borderRadius: 10,
              }}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              pointerEvents="none" // haritaya tıklamayı devre dışı bırak
            >
              <Marker
                coordinate={{ latitude, longitude }}
                title="Etkinlik Konumu"
              />
            </MapView>
          </Pressable>
          <TouchableOpacity className="bg-purple-500 py-2 px-4 rounded-full mt-4">
            <Text className="text-xl font-bold text-center text-white">
              Etkinliğe Katıl
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetail;
