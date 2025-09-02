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
import { useAddEventMutation } from "@/redux/api/event/eventApi";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/redux/slices/globalSlice";
import { useGetCategoriesQuery } from "@/redux/api/cateogory/categoryApi";
import PhotoSelectionModal from "@/components/PhotoSelectionModal";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
const NewEvent = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [eventName, setEventName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<string>("1");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [openAddress, setOpenAddress] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isFree, setIsFree] = useState<boolean>(true);
  const [eventPrice, setEventPrice] = useState<string>("0");
  const [eventImages, setEventImages] = useState<string[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [showPhotoSelectionModal, setShowPhotoSelectionModal] = useState(false);

  const { data: categories } = useGetCategoriesQuery();

  const [addEvent] = useAddEventMutation();

  console.log("eventImages", eventImages);

  const handleCreateEvent = async () => {
    dispatch(setIsLoading(true));
    try {
      const formData = new FormData();
      formData.append("name", eventName);
      formData.append("categoryId", categoryId);
      formData.append("maxParticipants", maxParticipants);
      formData.append("startDate", startDate.toISOString());
      formData.append("endDate", endDate.toISOString());
      formData.append("mapLatitude", selectedLocation.latitude.toString());
      formData.append("mapLongitude", selectedLocation.longitude.toString());
      formData.append("openAddress", openAddress);
      formData.append("description", description);
      formData.append("isFree", isFree.toString());
      formData.append("eventPrice", eventPrice);
      eventImages.forEach((image, index) => {
        formData.append("EventImages", {
          uri: image,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        } as any);
      });
      formData.append("eventOwnerId", userInfo?.id);
      formData.append("city", "istanbul");
      formData.append("county", "istanbul");
      const response = await addEvent(formData).unwrap();
      console.log("etkinlik olsuturma respoinse", response);
      if (!response.isSuccess) {
        return Alert.alert("Hata", "Etkinlik oluşturulamadı");
      }

      Alert.alert("Başarılı", "Etkinlik oluşturuldu");
      handleResetData();
    } catch (error: any) {
      console.log("error", error);
      Alert.alert("Hata", error.data.errors[0]);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleResetData = () => {
    setEventName("");
    setCategoryId("");
    setMaxParticipants("1");
    setStartDate(new Date());
    setEndDate(new Date());
    setOpenAddress("");
    setDescription("");
    setSelectedLocation({
      latitude: 0,
      longitude: 0,
    });
    setEventImages([]);
  };

  const handleImageSelected = (imageUri: string) => {
    setEventImages([...eventImages, imageUri]);
  };

  const handleRemoveImage = (index: number) => {
    setEventImages(eventImages.filter((_, i) => i !== index));
  };

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
                  value={eventName}
                  label="Etkinlik Adı"
                  placeholder="Etkinlik Adını Giriniz"
                  onChangeText={(text) => setEventName(text)}
                />
                <CustomPicker
                  selectedValue={categoryId}
                  setSelectedValue={(value) => setCategoryId(value)}
                  itemData={categories?.data?.map(
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
                  value={maxParticipants}
                  onChangeText={(text) => setMaxParticipants(text)}
                />
                <CustomDateTimePicker
                  mode="date"
                  value={startDate}
                  onChange={(date) => {
                    const updatedStartDate = new Date(startDate);
                    updatedStartDate.setFullYear(date.getFullYear());
                    updatedStartDate.setMonth(date.getMonth());
                    updatedStartDate.setDate(date.getDate());
                    setStartDate(updatedStartDate);
                  }}
                  isModalVisible={showStartDatePicker}
                  setIsModalVisible={setShowStartDatePicker}
                  label="Başlangıç Tarihi"
                />
                <CustomDateTimePicker
                  mode="date"
                  value={endDate}
                  onChange={(date) => {
                    const updatedEndDate = new Date(endDate);
                    updatedEndDate.setFullYear(date.getFullYear());
                    updatedEndDate.setMonth(date.getMonth());
                    updatedEndDate.setDate(date.getDate());
                    setEndDate(updatedEndDate);
                  }}
                  isModalVisible={showEndDatePicker}
                  setIsModalVisible={setShowEndDatePicker}
                  label="Bitiş Tarihi"
                />
                <CustomDateTimePicker
                  mode="time"
                  value={startDate}
                  onChange={(date) => {
                    const updatedStartDate = new Date(startDate);
                    updatedStartDate.setHours(date.getHours());
                    updatedStartDate.setMinutes(date.getMinutes());
                    setStartDate(updatedStartDate);
                  }}
                  isModalVisible={showStartTimePicker}
                  setIsModalVisible={setShowStartTimePicker}
                  label="Başlangıç Saati"
                />
                <CustomDateTimePicker
                  mode="time"
                  value={endDate}
                  onChange={(date) => {
                    const updatedEndDate = new Date(endDate);
                    updatedEndDate.setHours(date.getHours());
                    updatedEndDate.setMinutes(date.getMinutes());
                    setEndDate(updatedEndDate);
                  }}
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
                  value={openAddress}
                  onChangeText={(text) => setOpenAddress(text)}
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
                    value={eventPrice}
                    onChangeText={(text) => setEventPrice(text)}
                  />
                )}

                <CustomTextInput
                  type="text"
                  label="Açıklama / Kural"
                  placeholder="Açıklama, kurallar, notlar vs.."
                  value={description}
                  onChangeText={(text) => setDescription(text)}
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
              {eventImages.length > 0 && (
                <FlatList
                  horizontal
                  contentContainerStyle={{ gap: 14 }}
                  data={eventImages}
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
