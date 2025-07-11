import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import CustomPicker from "@/components/CustomPicker";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import CustomCheckbox from "@/components/CustomCheckbox";
import SelectLocationScreen from "@/components/SelectLocationScreen";
import { useCreateEventMutation } from "@/redux/api/event/eventApi";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/redux/slices/globalSlice";
import { useGetCategoriesQuery } from "@/redux/api/cateogory/categoryApi";
import PhotoSelectionModal from "@/components/PhotoSelectionModal";
const NewEvent = () => {
  const dispatch = useDispatch();

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

  const [showPhotoSelectionModal, setShowPhotoSelectionModal] = useState(false);

  const { data: categories } = useGetCategoriesQuery();

  const [eventData, setEventData] = useState({
    name: "",
    categoryId: "",
    MaxParticipants: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    isFree: true,
    isPublic: true,
    price: 0,
    address: "",
    description: "",
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
    images: [] as string[],
  });

  const [createEvent] = useCreateEventMutation();

  const handleCreateEvent = async () => {
    dispatch(setIsLoading(true));
    console.log(JSON.stringify(eventData, null, 2));
    try {
      const response = await createEvent(eventData).unwrap();
      if (!response.IsSuccess) {
        return Alert.alert("Hata", "Etkinlik oluşturulamadı");
      }
      Alert.alert("Başarılı", "Etkinlik oluşturuldu");
      handleResetData();
    } catch (error: any) {
      console.log(error.data.errors);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleResetData = () => {
    setEventData({
      name: "",
      categoryId: "",
      MaxParticipants: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      isFree: true,
      isPublic: true,
      price: 0,
      images: [] as string[],
      address: "",
      description: "",
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  };

  const handleImageSelected = (imageUri: string) => {
    setEventData((prevData) => ({
      ...prevData,
      images: [...prevData.images, imageUri],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setEventData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    setEventData((prevData) => ({
      ...prevData,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    }));
  }, [selectedLocation]);
  return (
    <>
      <ScrollView>
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
                  selectedValue={eventData.categoryId}
                  setSelectedValue={(value) =>
                    setEventData({ ...eventData, categoryId: value })
                  }
                  itemData={categories?.data.map(
                    (category: { id: string; name: string }) => ({
                      text: category.name,
                      value: category.id,
                    })
                  )}
                  isModalVisible={showCategoryPicker}
                  setIsModalVisible={setShowCategoryPicker}
                  label="Kategori"
                />
                <CustomTextInput
                  type="numeric"
                  label="Kontenjan"
                  placeholder="Maksimum Katılımcı Sayısı"
                  value={eventData.MaxParticipants}
                  onChangeText={(text) =>
                    setEventData({ ...eventData, MaxParticipants: text })
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
                  value={eventData.address}
                  onChangeText={(text) =>
                    setEventData({ ...eventData, address: text })
                  }
                  multiline={true}
                />
                <View className="flex-row gap-4 mt-2">
                  <CustomCheckbox
                    value={eventData.isFree === true}
                    onValueChange={() =>
                      setEventData({ ...eventData, isFree: true })
                    }
                    color={"purple"}
                    label={"Ücretsiz Etkinlik"}
                  />
                  <CustomCheckbox
                    value={eventData.isFree === false}
                    onValueChange={() =>
                      setEventData({ ...eventData, isFree: false })
                    }
                    color={"purple"}
                    label={"Ücretli Etkinlik"}
                  />
                </View>
                {!eventData.isFree && (
                  <CustomTextInput
                    type="numeric"
                    label="Ücret"
                    placeholder="Ödenecek Ücreti Giriniz"
                    value={eventData.price.toString()}
                    onChangeText={(text) =>
                      setEventData({ ...eventData, price: Number(text) })
                    }
                  />
                )}
                <View className="flex-row gap-4 mt-2">
                  <CustomCheckbox
                    value={eventData.isPublic === true}
                    onValueChange={() =>
                      setEventData({ ...eventData, isPublic: true })
                    }
                    color={"purple"}
                    label={"Açık Alan"}
                  />
                  <CustomCheckbox
                    value={eventData.isPublic === false}
                    onValueChange={() =>
                      setEventData({ ...eventData, isPublic: false })
                    }
                    color={"purple"}
                    label={"Kapalı Alan"}
                  />
                </View>

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
              <Pressable
                onPress={() => setShowPhotoSelectionModal(true)}
                className="mt-4"
              >
                <Text className="font-medium">Fotoğraf Yükle</Text>
                <View className="border border-purple-300 rounded-md p-4 ">
                  <Text className="text-gray-400">
                    Etkinlikle ilgili fotoğraf yüklemek için tıklayın
                  </Text>
                </View>
              </Pressable>
              {eventData.images.length > 0 && (
                <FlatList
                  horizontal
                  contentContainerStyle={{ gap: 14 }}
                  data={eventData.images}
                  renderItem={({ item, index }) => (
                    <View key={index} className="relative flex-row gap-2 mt-4">
                      <Image
                        source={{ uri: item }}
                        className="w-32 h-32 rounded-md"
                      />
                      <TouchableOpacity
                        onPress={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                      >
                        <Text className="text-white text-sm font-bold">×</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              )}
              <TouchableOpacity
                onPress={handleCreateEvent}
                className="bg-purple-500 py-3 mt-6 rounded-md"
              >
                <Text className="text-white text-lg font-bold text-center">
                  Etkinlik Oluştur
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <PhotoSelectionModal
        isVisible={showPhotoSelectionModal}
        onClose={() => setShowPhotoSelectionModal(false)}
        onImageSelected={handleImageSelected}
      />
    </>
  );
};

export default NewEvent;
