import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SliderItem from "./SliderItem";
import { useAppSelector } from "@/hooks/hooks";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Üniversitene özel sosyal etkinlik ağına hoşgeldin!",
    description: "EventCampus is a platform for creating and sharing events",
    image: "",
  },
  {
    id: 2,
    title: "Kendi etkinliğini oluştur, katıl, sosyalleş",
    description: "EventCampus is a platform for creating and sharing events",
    image: "",
  },
  {
    id: 3,
    title: "Yalnızca üniversitene özel bir ortam",
    description: "EventCampus is a platform for creating and sharing events",
    image: "",
  },
];

const Onboarding = ({ onDone }: { onDone: () => void }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isTermsAndConditionsDone } = useAppSelector((state) => state.global);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onDone(); // onboarding bittiğinde ana sayfaya geç
    }
  };
  useEffect(() => {
    if (isTermsAndConditionsDone) {
      setTimeout(() => {
        router.replace("/auth/login");
      }, 0);
    }
  }, [isTermsAndConditionsDone]);
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SliderItem item={item} />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={flatListRef}
      />

      {/* Dotlar ve Butonlar */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={onDone}>
          <Text style={styles.buttonText}>Atla</Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={[styles.dot, { width: dotWidth }]}
              />
            );
          })}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Başla" : "Devam"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Onboarding;
