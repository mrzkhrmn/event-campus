import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import CustomPicker from "@/components/CustomPicker";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import Checkbox from "expo-checkbox";
import CustomCheckbox from "@/components/CustomCheckbox";
import SelectLocationScreen from "@/components/SelectLocationScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const NewEvent = () => {
  const [isFree, setIsFree] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  const [address, setAddress] = useState<string>("");

  const [showLocationModal, setShowLocationModal] = useState(false);
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
    price: "",
    openAddress: "",
    description: "",
  });

  console.log(eventData);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      enableOnAndroid={true}
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className=" bg-white flex-1 ">
          <View className="px-4 pb-10 flex-1 justify-end">
            <Text className="text-2xl font-bold my-4">
              Yeni Etkinlik Oluştur
            </Text>
            <View className="gap-4">
              <CustomTextInput
                label="Etkinlik Adı"
                placeholder="Etkinlik Adını Giriniz"
                value={eventData.name}
                onChangeText={(text) =>
                  setEventData({ ...eventData, name: text })
                }
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
                placeholder="Maksimum Katılımcı Sayısı"
                value={eventData.capacity}
                onChangeText={(text) =>
                  setEventData({ ...eventData, capacity: text })
                }
              />
              <CustomDateTimePicker
                mode="date"
                value={eventData.startDate}
                onChange={(date) =>
                  setEventData({ ...eventData, startDate: date })
                }
                isModalVisible={showStartDatePicker}
                setIsModalVisible={setShowStartDatePicker}
                label="Başlangıç Tarihi"
              />
              <CustomDateTimePicker
                mode="date"
                value={eventData.endDate}
                onChange={(date) =>
                  setEventData({ ...eventData, endDate: date })
                }
                isModalVisible={showEndDatePicker}
                setIsModalVisible={setShowEndDatePicker}
                label="Bitiş Tarihi"
              />
              <CustomDateTimePicker
                mode="time"
                value={eventData.startTime}
                onChange={(date) =>
                  setEventData({ ...eventData, startTime: date })
                }
                isModalVisible={showStartTimePicker}
                setIsModalVisible={setShowStartTimePicker}
                label="Başlangıç Saati"
              />
              <CustomDateTimePicker
                mode="time"
                value={eventData.endTime}
                onChange={(date) =>
                  setEventData({ ...eventData, endTime: date })
                }
                isModalVisible={showEndTimePicker}
                setIsModalVisible={setShowEndTimePicker}
                label="Bitiş Saati"
              />
              <View>
                <Text className="font-medium">Konum Seç:</Text>
                <Pressable
                  onPress={() => setShowLocationModal(true)}
                  className="border border-purple-300 rounded-md p-3 placeholder:text-gray-400 focus:border-purple-500"
                >
                  <Text className={address ? "text-black" : "text-gray-400"}>
                    {address ? address : "Konum Seçmek İçin Tıklayın"}
                  </Text>
                </Pressable>
              </View>
              <CustomTextInput
                type="text"
                label="Açık Adres"
                placeholder="Açık Adres"
                value={eventData.openAddress}
                onChangeText={(text) =>
                  setEventData({ ...eventData, openAddress: text })
                }
                multiline={true}
              />
              <View className="flex-row gap-4 mt-2">
                <CustomCheckbox
                  value={isFree === true}
                  onValueChange={() => setIsFree(true)}
                  color={"purple"}
                  label={"Ücretsiz Etkinlik"}
                />
                <CustomCheckbox
                  value={isFree === false}
                  onValueChange={() => setIsFree(false)}
                  color={"purple"}
                  label={"Ücretli Etkinlik"}
                />
              </View>
              {!isFree && (
                <CustomTextInput
                  type="numeric"
                  label="Ücret"
                  placeholder="Ödenecek Ücreti Giriniz"
                  value={eventData.price}
                  onChangeText={(text) =>
                    setEventData({ ...eventData, price: text })
                  }
                />
              )}
              <CustomTextInput
                type="text"
                label="Açıklama / Kural"
                placeholder="Açıklama, kurallar, notlar vs.."
                value={eventData.description}
                onChangeText={(text) =>
                  setEventData({ ...eventData, description: text })
                }
                multiline={true}
              />
              <SelectLocationScreen
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                visible={showLocationModal}
                onClose={() => setShowLocationModal(false)}
                setAddress={setAddress}
                address={address}
              />
            </View>
            <TouchableOpacity className="bg-purple-500 py-3 mt-6 rounded-md">
              <Text className="text-white text-lg font-bold text-center">
                Etkinlik Oluştur
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default NewEvent;
