import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

type DateTimePickerMode = "date" | "time" | "datetime";

interface CustomDateTimePickerProps {
  mode: DateTimePickerMode;
  value?: Date;
  onChange?: (date: Date) => void;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  label: string;
}

const CustomDateTimePicker = ({
  mode,
  value = new Date(),
  onChange,
  isModalVisible,
  setIsModalVisible,
  label,
}: CustomDateTimePickerProps) => {
  const [tempValue, setTempValue] = useState(value);

  const handleCancel = () => {
    setTempValue(value);
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    if (onChange) onChange(tempValue);
    setIsModalVisible(false);
  };

  const getMinimumDate = () => {
    const today = new Date();

    // Sadece tarih seçimi için günün başlangıcına ayarla
    if (mode === "date") {
      today.setHours(0, 0, 0, 0);
    }

    return today;
  };

  const formatDisplayValue = () => {
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const formatDateTime = (date: Date) => {
      return `${formatDate(date)} ${formatTime(date)}`;
    };

    switch (mode) {
      case "date":
        return formatDate(value);
      case "time":
        return formatTime(value);
      case "datetime":
        return formatDateTime(value);
      default:
        return "Tarih/Saat Seçin";
    }
  };

  const getHeaderTitle = () => {
    const titles = {
      date: "Tarih Seç",
      time: "Saat Seç",
      datetime: "Tarih ve Saat Seç",
    };
    return titles[mode];
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempValue(selectedDate);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text className="font-medium">{label}</Text>
        <View className="border border-purple-300 rounded-md p-3">
          <Text className="text-gray-700">{formatDisplayValue()}</Text>
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

              <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>

              <TouchableOpacity
                onPress={handleConfirm}
                style={styles.headerButton}
              >
                <Text style={styles.confirmText}>Tamam</Text>
              </TouchableOpacity>
            </View>

            {/* DateTimePicker */}
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={tempValue}
                mode={mode}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
                locale="tr-TR"
                style={styles.dateTimePicker}
                textColor="#000000"
                accentColor="#a855f7"
                themeVariant="light"
                {...(mode !== "time" && { minimumDate: getMinimumDate() })}
              />
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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  dateTimePicker: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default CustomDateTimePicker;
