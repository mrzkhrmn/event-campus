export type CustomTextInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: "text" | "numeric";
  multiline?: boolean;
};

export type CustomPickerProps = {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  itemData: { text: string; value: string }[];
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  label: string;
};

export type DateTimePickerMode = "date" | "time" | "datetime";

export type CustomDateTimePickerProps = {
  mode: DateTimePickerMode;
  value?: Date;
  onChange?: (date: Date) => void;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  label: string;
};

export type CustomCheckboxProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  color: string;
  label: string;
};

export type SelectLocationProps = {
  selectedLocation: { latitude: number; longitude: number };
  setSelectedLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
  visible: boolean;
  onClose: () => void;
  address: string;
  setAddress: (address: string) => void;
};
