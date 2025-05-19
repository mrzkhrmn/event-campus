import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");
const SliderItem = ({ item }: { item: any }) => {
  if (item.component) {
    return <item.component />;
  }

  return (
    <ImageBackground source={item.image} style={styles.slide}>
      <View style={styles.overlay} />
      <View className="items-center justify-center">
        <Image
          source={require("../assets/images/eventCampus-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    alignItems: "center",
    justifyContent: "space-around",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  description: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});

export default SliderItem;
