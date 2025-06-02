import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { CustomPickerProps } from "@/types/ComponentTypes";

const CustomPicker = ({
  selectedValue,
  setSelectedValue,
  itemData,
  isModalVisible = false,
  setIsModalVisible,
  label,
}: CustomPickerProps) => {
  const [tempSelectedValue, setTempSelectedValue] = useState(selectedValue);

  const handleCancel = () => {
    setTempSelectedValue(selectedValue); // Orijinal değere geri döndür
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    setSelectedValue(tempSelectedValue); // Seçili değeri kaydet
    setIsModalVisible(false);
  };

  // Seçili kategorinin text'ini bul
  const getSelectedText = () => {
    const selectedItem = itemData.find((item) => item.value === selectedValue);
    return selectedItem ? selectedItem.text : "Kategori Seç";
  };

  return (
    <>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text className="font-medium">{label}</Text>
        <View className="border border-purple-300 rounded-md p-3">
          <Text className="text-gray-700">{getSelectedText()}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.headerButton}
              >
                <Text style={styles.cancelText}>İptal</Text>
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Kategori Seç</Text>

              <TouchableOpacity
                onPress={handleConfirm}
                style={styles.headerButton}
              >
                <Text style={styles.confirmText}>Tamam</Text>
              </TouchableOpacity>
            </View>

            {/* Picker */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tempSelectedValue}
                onValueChange={(itemValue) => setTempSelectedValue(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {itemData.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.text}
                    value={item.value}
                    color="#000000"
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  headerButton: {
    minWidth: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cancelText: {
    fontSize: 16,
    color: "red",
  },
  confirmText: {
    fontSize: 16,
    color: "#a855f7",
    fontWeight: "600",
    textAlign: "right",
  },
  pickerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    color: "#000000",
    fontSize: 16,
  },
});

export default CustomPicker;
