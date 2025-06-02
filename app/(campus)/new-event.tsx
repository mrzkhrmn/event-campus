import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import CustomPicker from "@/components/CustomPicker";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";

const NewEvent = () => {
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const categories = [
    { text: "Futbol", value: "futbol" },
    { text: "Basketbol", value: "basketbol" },
    { text: "Voleybol", value: "voleybol" },
    { text: "Tenis", value: "tenis" },
    { text: "Atletizm", value: "atletizm" },
  ];

  const [eventData, setEventData] = useState({
    name: "",
    category: "",
    capacity: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
  });

  console.log(eventData);

  return (
    <View className="flex-1 bg-white">
      <View className="px-4">
        <Text className="text-2xl font-bold my-4">Yeni Etkinlik Oluştur</Text>
        <View className="gap-4">
          <CustomTextInput
            label="Etkinlik Adı"
            placeholder="Etkinlik Adı"
            value={eventData.name}
            onChangeText={(text) => setEventData({ ...eventData, name: text })}
          />
          <CustomPicker
            selectedValue={eventData.category}
            setSelectedValue={(value) =>
              setEventData({ ...eventData, category: value })
            }
            itemData={categories}
            isModalVisible={showCategoryPicker}
            setIsModalVisible={setShowCategoryPicker}
            label="Kategori"
          />
          <CustomTextInput
            type="numeric"
            label="Kontenjan"
            placeholder="Kontenjan"
            value={eventData.capacity}
            onChangeText={(text) =>
              setEventData({ ...eventData, capacity: text })
            }
          />
          <CustomDateTimePicker
            mode="date"
            value={eventData.startDate}
            onChange={(date) => setEventData({ ...eventData, startDate: date })}
            isModalVisible={showStartDatePicker}
            setIsModalVisible={setShowStartDatePicker}
            label="Başlangıç Tarihi"
          />
          <CustomDateTimePicker
            mode="date"
            value={eventData.endDate}
            onChange={(date) => setEventData({ ...eventData, endDate: date })}
            isModalVisible={showEndDatePicker}
            setIsModalVisible={setShowEndDatePicker}
            label="Bitiş Tarihi"
          />
          <CustomDateTimePicker
            mode="time"
            value={eventData.startTime}
            onChange={(date) => setEventData({ ...eventData, startTime: date })}
            isModalVisible={showStartTimePicker}
            setIsModalVisible={setShowStartTimePicker}
            label="Başlangıç Saati"
          />
          <CustomDateTimePicker
            mode="time"
            value={eventData.endTime}
            onChange={(date) => setEventData({ ...eventData, endTime: date })}
            isModalVisible={showEndTimePicker}
            setIsModalVisible={setShowEndTimePicker}
            label="Bitiş Saati"
          />
        </View>
      </View>
    </View>
  );
};

export default NewEvent;
