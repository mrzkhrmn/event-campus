import {
  View,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const GlobalLoading = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useSelector((state: RootState) => state.global);
  return (
    <View className="flex-1">
      {isLoading && (
        <TouchableWithoutFeedback>
          <View
            className="flex-1 absolute h-full w-full items-center justify-center z-[1000]"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <ActivityIndicator size="large" color="#9333ea" />
          </View>
        </TouchableWithoutFeedback>
      )}
      {children}
    </View>
  );
};

export default GlobalLoading;
