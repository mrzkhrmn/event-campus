export type CustomTextInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: "text" | "numeric";
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
