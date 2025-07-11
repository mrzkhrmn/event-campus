import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

const { height: screenHeight } = Dimensions.get("window");

const PhotoSelectionModal = ({
  isVisible,
  onClose,
  onImageSelected,
}: {
  isVisible: boolean;
  onClose: () => void;
  onImageSelected?: (imageUri: string) => void;
}) => {
  const pickImageFromGallery = async () => {
    // İzin kontrolü
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Galeriye erişim izni gerekli!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      onImageSelected?.(imageUri);
      onClose();
    }

    console.log(result);
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              <View style={styles.dragIndicator} />
              <View style={styles.content}>
                <Text style={styles.title}>Fotoğraf Seç</Text>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => console.log("Kamera")}
                >
                  <Text style={styles.optionText}>📷 Kameradan Çek</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.option}
                  onPress={pickImageFromGallery}
                >
                  <Text style={styles.optionText}>🖼️ Galeriden Seç</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelText}>İptal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    height: screenHeight * 0.3, // Ekranın %30'u
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  cancelButton: {
    paddingVertical: 16,
    marginTop: 8,
  },
  cancelText: {
    fontSize: 16,
    color: "#DC3545",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default PhotoSelectionModal;
