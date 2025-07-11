import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { formatToDayMonthYear } from "@/utils/formatDate";
import {
  useGetEventByIdQuery,
  useJoinEventMutation,
  useLeaveEventMutation,
} from "@/redux/api/event/eventApi";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setIsLoading } from "@/redux/slices/globalSlice";
import { formatTime } from "@/utils/formatTime";
const EventDetail = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const eventId = Array.isArray(id) ? id[0] : id;

  const { data: eventData, isLoading } = useGetEventByIdQuery(eventId, {
    refetchOnMountOrArgChange: true,
  });

  const eventOwner = `${eventData?.data.createdByUser.name} ${eventData?.data.createdByUser.surname}`;

  const truncatedDescription = eventData?.data.description
    .split(" ")
    .slice(0, 20)
    .join(" ");

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${eventData?.data.latitude},${eventData?.data.longitude}`;
    Linking.openURL(url);
  };

  const [joinEvent] = useJoinEventMutation();
  const [leaveEvent] = useLeaveEventMutation();
  const handleJoinEvent = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await joinEvent(eventId).unwrap();
      Alert.alert("Başarılı", response.message);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Hata", error.data.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleLeaveEvent = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await leaveEvent(eventId).unwrap();
      Alert.alert("Başarılı", response.message);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Hata", error.data.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  const isUserParticipant = eventData?.data?.participants.find(
    (user: any) => user.user.id == userInfo?.id
  );

  console.log(eventData?.data.participants);
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
              <Text className="text-xl font-medium">
                {eventData?.data.name}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Tarih:</Text>
              <Text className="text-xl font-medium">
                {formatToDayMonthYear(eventData?.data.startDate)}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">
                Başlangıç-Bitiş Saati:
              </Text>
              <Text className="text-xl font-medium">
                {formatTime(eventData?.data?.startTime)} -{" "}
                {formatTime(eventData?.data?.endTime)}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Katılımcı Sayısı:</Text>
              <Text className="text-xl font-medium">
                {eventData?.data.currentParticipantCount}/
                {eventData?.data.maxParticipants}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Düzenleyen:</Text>
              <Text className="text-xl font-medium">{eventOwner}</Text>
            </View>
            {eventData?.data.isFree ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-xl font-medium">Ücretsiz</Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-2">
                <Text className="text-xl font-medium">Ücret:</Text>
                <Text className="text-xl font-medium">
                  {eventData?.data.price} TL
                </Text>
              </View>
            )}
          </View>
          <View className="flex-col gap-2 mt-4 border-b pb-4">
            <Text className="text-xl font-medium">Mevcut Katılımcılar:</Text>
            <View>
              {eventData?.data?.participants.length > 0 ? (
                eventData?.data?.participants.map(
                  (participant: any, index: number) => (
                    <Text key={index}>
                      {participant.user.name} {participant.user.surname}
                    </Text>
                  )
                )
              ) : (
                <Text>Bu etkinlikte herhangi bir katılımcı yok.</Text>
              )}
            </View>
          </View>
          <View className="flex-col gap-2 mt-4 border-b pb-4">
            <Text className="text-xl font-medium">Etkinlik Açıklaması:</Text>
            <View>
              <Text className="text-xl font-medium">
                {showFullDescription ? (
                  <>
                    {eventData?.data.description}
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
          <Text className="text-xl font-medium mt-4">Harita Konumu:</Text>
          <Text className="text-lg font-medium mt-2">
            Tiklayip haritalarda görebilirsiniz.
          </Text>
          <Pressable onPress={openInGoogleMaps} className="mt-2">
            {eventData?.data?.latitude && eventData?.data?.longitude ? (
              <MapView
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                }}
                initialRegion={{
                  latitude: eventData.data.latitude,
                  longitude: eventData.data.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                pointerEvents="none"
              >
                <Marker
                  coordinate={{
                    latitude: eventData.data.latitude,
                    longitude: eventData.data.longitude,
                  }}
                  title="Etkinlik Konumu"
                />
              </MapView>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                  backgroundColor: "#f0f0f0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Harita yükleniyor...</Text>
              </View>
            )}
          </Pressable>
          <View className="mt-4 ">
            <Text className="text-xl font-medium">Adres Detayı:</Text>
            <Text className="text-lg font-medium">
              {eventData?.data.address}
            </Text>
          </View>
          {isUserParticipant ? (
            <TouchableOpacity
              className="bg-red-500 py-2 px-4 rounded-full mt-4"
              onPress={handleLeaveEvent}
            >
              <Text className="text-xl font-bold text-center text-white">
                Katılımı İptal Et
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-purple-500 py-2 px-4 rounded-full mt-4"
              onPress={handleJoinEvent}
            >
              <Text className="text-xl font-bold text-center text-white">
                Etkinliğe Katıl
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetail;
