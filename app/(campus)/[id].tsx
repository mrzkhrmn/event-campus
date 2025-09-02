import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { formatToClock, formatToDayMonthYear } from "@/utils/formatDate";
import {
  useGetEventDetailQuery,
  useJoinEventMutation,
  useLeaveEventMutation,
} from "@/redux/api/event/eventApi";
import { useWindowDimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setIsLoading } from "@/redux/slices/globalSlice";
const EventDetail = () => {
  const { width, height } = useWindowDimensions();
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const eventId = Array.isArray(id) ? id[0] : id;

  const { data: eventData, isLoading } = useGetEventDetailQuery(eventId, {
    refetchOnMountOrArgChange: true,
  });

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${eventData?.data.latitude},${eventData?.data.longitude}`;
    Linking.openURL(url);
  };

  const [joinEvent] = useJoinEventMutation();
  const [leaveEvent] = useLeaveEventMutation();
  const handleJoinEvent = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await joinEvent({
        eventId: eventId,
        studentId: userInfo?.id,
      }).unwrap();

      console.log("etkinlik katilim response", response);
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
      const response = await leaveEvent({
        eventId: eventId,
        studentId: userInfo?.id,
      }).unwrap();
      Alert.alert("Başarılı", response.message);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Hata", error.data.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  const isUserParticipant = eventData?.data?.participants.some(
    (participant: any) => participant.studentId == userInfo?.id
  );

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
        <View className="mt-4 flex-1 rounded-lg overflow-hidden relative">
          <View>
            <FlatList
              data={eventData?.data.eventImages}
              horizontal
              pagingEnabled
              bounces={false}
              snapToInterval={width}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  resizeMode="cover"
                  style={{ width: width, height: height * 0.3 }}
                />
              )}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              {eventData?.data.eventImages.map((_: string, index: number) => (
                <View
                  key={index}
                  style={{
                    width: activeIndex === index ? 12 : 8,
                    height: activeIndex === index ? 12 : 8,
                    borderRadius: 6,
                    backgroundColor: activeIndex === index ? "#333" : "#ccc",
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>
          </View>
          <View className="border-b py-4 gap-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Etkinlik Adı:</Text>
              <Text className="text-xl font-medium ">
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
                {formatToClock(eventData?.data?.startDate)} -{" "}
                {formatToClock(eventData?.data?.endDate)}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Katılımcı Sayısı:</Text>
              <Text className="text-xl font-medium">
                {eventData?.data.currentParticipants}/
                {eventData?.data.maxParticipants}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-medium">Düzenleyen:</Text>
              <Text className="text-xl font-medium">
                {eventData?.data.eventOwner.name}{" "}
                {eventData?.data.eventOwner.surname}
              </Text>
            </View>
            {eventData?.data.isFree ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-xl font-medium">Ücretsiz</Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-2">
                <Text className="text-xl font-medium">Ücret:</Text>
                <Text className="text-xl font-medium">
                  {eventData?.data.eventPrice || "Ücret"} TL
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
                    <Text key={index}>{participant.studentName}</Text>
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
                {eventData?.data.description}
              </Text>
            </View>
          </View>
          <Text className="text-xl font-medium mt-4">Harita Konumu:</Text>
          <View className="mt-2">
            {eventData?.data?.mapLatitude && eventData?.data?.mapLongitude ? (
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
          </View>
          <Pressable
            onPress={openInGoogleMaps}
            className="bg-green-600 py-2 px-4 rounded-full mt-4"
          >
            <Text className="text-white font-bold text-center text-lg">
              Konum tarifi al
            </Text>
          </Pressable>
          <View className="mt-4 ">
            <Text className="text-xl font-medium">Adres Detayı:</Text>
            <Text className="text-lg font-medium">
              {eventData?.data.openAddress}
            </Text>
          </View>

          {isUserParticipant ? (
            <TouchableOpacity
              className="bg-purple-500 py-2 px-4 rounded-full mt-4"
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
