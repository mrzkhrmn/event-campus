import { useAppSelector } from "@/hooks/hooks";
import { useGetStudentByIdQuery } from "@/redux/api/student/studentApi";
import { formatToClock, formatToDayMonthYear } from "@/utils/formatDate";
import { router, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const StudentProfile = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userInfo } = useAppSelector((state) => state.user);

  const { data: studentData, isLoading } = useGetStudentByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  // Eğer kendi profilimizse profile sayfasına yönlendir
  if (userInfo?.id === id) {
    router.replace("/(campus)/profile");
    return null;
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-500">Yükleniyor...</Text>
      </View>
    );
  }

  if (!studentData?.data) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-red-500">Kullanıcı bulunamadı</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center mt-4">
        <Image
          source={{
            uri:
              studentData?.data?.profileImageUrl ||
              require("@/assets/images/default-user.png"),
          }}
          resizeMode="cover"
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />
        <Text className="text-2xl font-bold text-purple-500 mt-2">
          {studentData?.data?.name} {studentData?.data?.surname}
        </Text>
        <Text className="text-xl font-bold text-gray-500">
          {studentData?.data?.facultyName}
        </Text>
        <Text className="text-xl font-bold text-gray-500">
          {studentData?.data?.email}
        </Text>
      </View>

      <View className="flex-row items-center justify-center my-4">
        <View className="border-r border-purple-400 flex-1 items-center justify-center">
          <Text className="text-2xl font-bold">
            {studentData?.data?.participatedEventsCount || 0}
          </Text>
          <Text className="text-md">Etkinliğe katıldı</Text>
        </View>
        <View className="border-r border-purple-400 flex-1 items-center justify-center">
          <Text className="text-2xl font-bold">
            {studentData?.data?.organizedEventsCount || 0}
          </Text>
          <Text className="text-md">Etkinlik oluşturdu</Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl font-bold">2</Text>
          <Text className="text-md">Takipçi</Text>
        </View>
      </View>

      {studentData?.data?.organizedEvents.length > 0 && (
        <View className="mt-4 px-4">
          <Text className="text-2xl text-gray-700 font-bold">
            Düzenlenen Etkinlikler
          </Text>
          <FlatList
            data={studentData?.data?.organizedEvents || []}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            ListEmptyComponent={
              <Text className="text-gray-500 text-center py-4">
                Henüz etkinlik düzenlenmemiş
              </Text>
            }
            renderItem={({ item }) => (
              <View className="border border-gray-300 rounded-xl overflow-hidden w-[250px]">
                <Image
                  source={{
                    uri: item.eventImages && item?.eventImages[0],
                  }}
                  className="w-full h-24 z-10"
                  resizeMode="cover"
                />
                <View className="bg-purple-500 p-3">
                  <View className="flex-row gap-1 mb-2">
                    <Text className="text-white font-bold">Etkinlik Adı:</Text>
                    <Text
                      className="text-white font-medium flex-1"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text className="text-white font-bold mb-1">
                    📅 {formatToDayMonthYear(item.startDate)}
                  </Text>
                  <Text className="text-white font-bold mb-2">
                    🕒 {formatToClock(item.startDate)} -{" "}
                    {formatToClock(item.endDate)}
                  </Text>
                  <TouchableOpacity
                    className="bg-white rounded-full py-1 px-3 self-start"
                    onPress={() => {
                      if (item?.id) {
                        router.push(`/${item.id.toString()}`);
                      }
                    }}
                  >
                    <Text className="text-purple-500 font-bold">Detay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}

      {studentData?.data?.participatedEvents.length > 0 && (
        <View className="mt-4 px-4 mb-8">
          <Text className="text-2xl text-gray-700 font-bold">
            Katıldığı Etkinlikler
          </Text>
          <FlatList
            data={studentData?.data?.participatedEvents || []}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            ListEmptyComponent={
              <Text className="text-gray-500 text-center py-4">
                Henüz etkinliğe katılmamış
              </Text>
            }
            renderItem={({ item }) => (
              <View className="border border-gray-300 rounded-xl overflow-hidden w-[250px]">
                <Image
                  source={{
                    uri: item.eventImages && item?.eventImages[0],
                  }}
                  className="w-full h-24 z-10"
                  resizeMode="cover"
                />
                <View className="bg-purple-500 p-3">
                  <View className="flex-row gap-1 mb-2">
                    <Text className="text-white font-bold">Etkinlik Adı:</Text>
                    <Text
                      className="text-white font-medium flex-1"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text className="text-white font-bold mb-1">
                    📅 {formatToDayMonthYear(item.startDate)}
                  </Text>
                  <Text className="text-white font-bold mb-2">
                    🕒 {formatToClock(item.startDate)} -{" "}
                    {formatToClock(item.endDate)}
                  </Text>
                  <TouchableOpacity
                    className="bg-white rounded-full py-1 px-3 self-start"
                    onPress={() => {
                      if (item?.id) {
                        router.push(`/${item.id.toString()}`);
                      }
                    }}
                  >
                    <Text className="text-purple-500 font-bold">Detay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default StudentProfile;
