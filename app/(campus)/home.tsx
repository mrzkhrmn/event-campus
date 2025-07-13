import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Keyboard,
} from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Categoryitem from "@/components/Categoryitem";
import { EventCardItemType } from "@/types/EventTypes";
import EventItem from "@/components/EventItem";
import SearchBar from "@/components/SearchBar";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { useGetCategoriesQuery } from "@/redux/api/cateogory/categoryApi";
import { useGetEventsQuery } from "@/redux/api/event/eventApi";
import { setIsLoading } from "@/redux/slices/globalSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { userInfo, token } = useAppSelector((state: any) => state.user);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const { data: categoriesData } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const allCategories = useMemo(() => {
    const tumuCategory = {
      id: 0,
      name: "Tümü",
      homeText: "Tüm Etkinlikler",
      icon: "🌟",
      isSelected: false,
    };

    if (!categoriesData?.data) return [tumuCategory];

    return [tumuCategory, ...categoriesData.data];
  }, [categoriesData]);

  console.log("userInfo", userInfo, "token", token);

  const selectedCategoryText = useMemo(() => {
    const selectedCat = allCategories.find(
      (cat: any) => cat.id === selectedCategory
    );
    return selectedCat?.id === 0
      ? "Tüm Etkinlikler"
      : selectedCat?.name + " Etkinlikler";
  }, [selectedCategory, allCategories]);

  const handleSearch = () => {
    Keyboard.dismiss();
  };

  const handlePressCategory = (id: number) => {
    setSelectedCategory(id);
  };

  const { data: eventsData, isLoading: isEventsLoading } = useGetEventsQuery(
    selectedCategory === 0 ? undefined : selectedCategory,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    dispatch(setIsLoading(isEventsLoading));
  }, [isEventsLoading]);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Search Bar */}
      <SearchBar handleSearch={handleSearch} />
      {/* Categories */}
      <View className="px-4  w-full ">
        <Text className="text-2xl mt-2 mb-2 font-bold">Kategoriler</Text>
        <FlatList
          data={allCategories}
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
      <View className="mt-4 flex-1">
        <View className="flex-row justify-between items-center mb-2 px-4">
          <Text className="text-2xl font-bold ">{selectedCategoryText}</Text>
          <Text className="text-purple-500 text-lg font-bold">Filtrele</Text>
        </View>
        {eventsData?.data.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={eventsData?.data}
            renderItem={({ item }) => <EventItem item={item} />}
            contentContainerStyle={{ gap: 20 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text className="text-center text-lg mt-10 text-gray-500">
            Bu kategoride etkinlik bulunamadı. 😭
          </Text>
        )}
      </View>
    </View>
  );
};

export default Home;
