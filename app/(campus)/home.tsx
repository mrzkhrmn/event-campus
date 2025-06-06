import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Keyboard,
} from "react-native";
import React, { useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Categoryitem from "@/components/Categoryitem";
import { EventCardItemType } from "@/types/EventTypes";
import EventItem from "@/components/EventItem";
import SearchBar from "@/components/SearchBar";
import { useAppSelector } from "@/hooks/hooks";
const Home = () => {
  const { userInfo, token } = useAppSelector((state: any) => state.user);
  const [selectedCategory, setSelectedCategory] = useState<string>("1");
  const categories = [
    {
      id: "1",
      name: "Tümü",
      icon: "😎",
      isSelected: false,
      homeText: "Tüm Etkinlikler",
    },
    {
      id: "2",
      name: "Futbol",
      icon: "🏃‍♂️",
      isSelected: false,
      homeText: "Futbol Etkinlikleri",
    },
    {
      id: "3",
      name: "Basketbol",
      icon: "🏀",
      isSelected: false,
      homeText: "Basketbol Etkinlikleri",
    },
    {
      id: "4",
      name: "Voleybol",
      icon: "🏐",
      isSelected: false,
      homeText: "Voleybol Etkinlikleri",
    },
    {
      id: "5",
      name: "Parti",
      icon: "🎉",
      isSelected: false,
      homeText: "Parti Etkinlikleri",
    },
    {
      id: "6",
      name: "Konser",
      icon: "🎸",
      isSelected: false,
      homeText: "Konser Etkinlikleri",
    },
    {
      id: "7",
      name: "Sinema",
      icon: "🎥",
      isSelected: false,
      homeText: "Sinema Etkinlikleri",
    },
    {
      id: "8",
      name: "Havuz",
      icon: "🏊‍♂️",
      isSelected: false,
      homeText: "Havuz Etkinlikleri",
    },
    {
      id: "9",
      name: "Kano",
      icon: "🏄‍♂️",
      isSelected: false,
      homeText: "Kano Etkinlikleri",
    },
    {
      id: "10",
      name: "Tabu",
      icon: "🤭",
      isSelected: false,
      homeText: "Tabu Etkinlikleri",
    },
  ];

  const [events, setEvents] = useState<EventCardItemType[]>([
    {
      id: "1",
      image: "https://picsum.photos/200/300",
      categoryId: "1",
      name: "Futbol",
      quota: 14,
      description: "Futbol etkinliği",
      location: "Ankara",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "12:00",
      price: 100,
      participants: 2,
      isFree: false,
      owner: "Mehmet Yılmaz ",
    },
    {
      id: "2",
      image: "https://picsum.photos/200/300",
      categoryId: "2",
      name: "Basketbol",
      quota: 14,
      description: "Basketbol etkinliği",
      location: "Ankara",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "12:00",
      price: 100,
      participants: 2,
      isFree: false,
      owner: "Mehmet Yılmaz",
    },
    {
      id: "3",
      image: "https://picsum.photos/200/300",
      categoryId: "3",
      name: "Voleybol",
      quota: 14,
      description: "Voleybol etkinliği",
      location: "Ankara",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "12:00",
      price: 100,
      participants: 2,
      isFree: false,
      owner: "Mehmet Yılmaz",
    },
    {
      id: "4",
      image: "https://picsum.photos/200/300",
      categoryId: "4",
      name: "Parti",
      quota: 14,
      description: "Parti etkinliği",
      location: "Ankara",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "12:00",
      price: 100,
      participants: 2,
      isFree: true,
      owner: "Mehmet Yılmaz",
    },
    {
      id: "5",
      image: "https://picsum.photos/200/300",
      categoryId: "5",
      name: "Konser",
      quota: 14,
      description: "Konser etkinliği",
      location: "Ankara",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "12:00",
      price: 100,
      participants: 2,
      isFree: true,
      owner: "Mehmet Yılmaz",
    },
    {
      id: "6",
      image: "https://picsum.photos/200/300",
      categoryId: "6",
      name: "Sinema",
      quota: 14,
      description: "Sinema etkinliği",
      location: "Ankara",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "12:00",
      price: 100,
      participants: 2,
      isFree: false,
      owner: "Mehmet Yılmaz",
    },
    {
      id: "7",
      image: "https://picsum.photos/200/300",
      categoryId: "7",
      name: "Havuz",
      quota: 14,
      description: "Havuz etkinliği",
      location: "Ankara",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "12:00",
      price: 100,
      participants: 2,
      isFree: false,
      owner: "Mehmet Yılmaz",
    },
    {
      id: "8",
      image: "https://picsum.photos/200/300",
      categoryId: "8",
      name: "Kano",
      quota: 14,
      description: "Kano etkinliği",
      location: "Ankara",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "12:00",
      price: 100,
      participants: 2,
      isFree: false,
      owner: "Mehmet Yılmaz",
    },
    {
      id: "9",
      image: "https://picsum.photos/200/300",
      categoryId: "9",
      name: "Tabu",
      quota: 14,
      description: "Tabu etkinliği",
      location: "Ankara",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "12:00",
      price: 100,
      participants: 2,
      isFree: true,
      owner: "Mehmet Yılmaz",
    },
  ]);

  console.log("userInfo", userInfo, "token", token);

  // Seçilen kategorinin homeText'ini performanslı şekilde hesapla
  const selectedCategoryText = useMemo(() => {
    const selectedCat = categories.find((cat) => cat.id === selectedCategory);
    return selectedCat?.homeText || "Tüm Etkinlikler";
  }, [selectedCategory]);

  const handleSearch = () => {
    Keyboard.dismiss();
  };

  const handlePressCategory = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Search Bar */}
      <SearchBar handleSearch={handleSearch} />
      {/* Categories */}
      <View className="px-4  w-full ">
        <Text className="text-2xl mt-4 mb-2 font-bold">Kategoriler</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Categoryitem
              item={{ ...item, isSelected: selectedCategory === item.id }}
              handlePressCategory={() => handlePressCategory(item.id)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
      {/* Selected Category Content */}
      <View className="px-4 mt-6 flex-1">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-2xl font-bold ">{selectedCategoryText}</Text>
          <Text className="text-purple-500 text-lg font-bold">Filtrele</Text>
        </View>
        <FlatList
          data={events}
          renderItem={({ item }) => <EventItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Home;
