import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Modal,
  View,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SelectLocationProps } from "../types/ComponentTypes";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const SelectLocationScreen = ({
  selectedLocation,
  setSelectedLocation,
  visible,
  onClose,
  setAddress,
  address,
}: SelectLocationProps) => {
  const mapRef = useRef<MapView>(null);

  const handleLongPress = (event: {
    nativeEvent: { coordinate: Coordinates };
  }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    fetchAddress(latitude, longitude);
  };

  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  const handleSave = () => {
    if (selectedLocation) {
      setSelectedLocation(selectedLocation);
      onClose();
    } else {
      Alert.alert("Lütfen haritada bir konum seçin");
    }
  };

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const addressInfo = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (addressInfo.length > 0) {
        const addr = addressInfo[0];
        const formatted = `${addr.name || ""} ${addr.street || ""}, ${
          addr.district || ""
        } ${addr.city || ""}/${addr.region}`;
        setAddress(formatted);
      }
    } catch (err) {
      console.error("Adres alınamadı:", err);
      setAddress("");
    }
  };

  const handleGoToCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Konum izni reddedildi");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setSelectedLocation({ latitude, longitude });
      fetchAddress(latitude, longitude);

      if (mapRef.current) {
        mapRef.current.animateToRegion(region, 1000);
      }
    } catch (error) {
      console.error("Mevcut konum alınamadı:", error);
      Alert.alert("Mevcut konum alınamadı");
    }
  };

  useEffect(() => {
    if (visible) {
      (async () => {
        // Eğer zaten seçili bir konum varsa ve (0,0) değilse onu kullan
        if (
          selectedLocation &&
          selectedLocation.latitude !== 0 &&
          selectedLocation.longitude !== 0
        ) {
          const region = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setInitialRegion(region);
          // Adres bilgisi yoksa getir
          if (!address) {
            fetchAddress(selectedLocation.latitude, selectedLocation.longitude);
          }
          return;
        }

        // Seçili konum yoksa veya (0,0) ise cihazın mevcut konumunu al
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Konum izni reddedildi");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setInitialRegion(region);
        setSelectedLocation({ latitude, longitude });
        fetchAddress(latitude, longitude);
      })();
    }
  }, [visible, selectedLocation]);

  if (!initialRegion) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1">
        <View className="px-4 h-20 flex-row justify-around items-end bg-black/70">
          <Button title="İptal" color="red" onPress={onClose} />
          <Button title="Konumu Kaydet" onPress={handleSave} />
        </View>

        <View className="flex-1 relative">
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            onPress={handleLongPress}
          >
            {selectedLocation && (
              <Marker coordinate={selectedLocation} title="Seçilen Konum" />
            )}
          </MapView>

          {/* Floating Mevcut Konumum Butonu */}
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={handleGoToCurrentLocation}
          >
            <Text style={styles.floatingButtonText}>📍</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 24,
    color: "white",
  },
});

export default SelectLocationScreen;
