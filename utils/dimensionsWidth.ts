import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const WP = (percentage: number) => (width * percentage) / 100;
export const HP = (percentage: number) => (height * percentage) / 100;
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
