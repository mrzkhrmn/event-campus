import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";

const DateTimePickerExample = () => {
  // Sadece tarih seçimi
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Sadece saat seçimi
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Tarih ve saat seçimi
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-6 text-center">
          CustomDateTimePicker Örnekleri
        </Text>

        <View className="space-y-4">
          {/* Sadece Tarih */}
          <CustomDateTimePicker
            mode="date"
            value={selectedDate}
            onChange={setSelectedDate}
            isModalVisible={showDatePicker}
            setIsModalVisible={setShowDatePicker}
            label="Etkinlik Tarihi"
          />

          {/* Sadece Saat */}
          <CustomDateTimePicker
            mode="time"
            value={selectedTime}
            onChange={setSelectedTime}
            isModalVisible={showTimePicker}
            setIsModalVisible={setShowTimePicker}
            label="Etkinlik Saati"
          />

          {/* Tarih ve Saat */}
          <CustomDateTimePicker
            mode="datetime"
            value={selectedDateTime}
            onChange={setSelectedDateTime}
            isModalVisible={showDateTimePicker}
            setIsModalVisible={setShowDateTimePicker}
            label="Etkinlik Tarih ve Saati"
          />
        </View>

        <View className="mt-8 p-4 bg-gray-100 rounded-lg">
          <Text className="text-lg font-semibold mb-2">Seçilen Değerler:</Text>
          <Text>Tarih: {selectedDate.toLocaleDateString("tr-TR")}</Text>
          <Text>
            Saat:{" "}
            {selectedTime.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text>
            Tarih-Saat: {selectedDateTime.toLocaleDateString("tr-TR")}{" "}
            {selectedDateTime.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DateTimePickerExample;
