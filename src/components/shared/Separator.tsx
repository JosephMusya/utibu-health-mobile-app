import { View } from "react-native";

type SeparatorType = {
  height?: number;
};
export const Separator = ({ height = 10 }: SeparatorType) => {
  return (
    <View
      style={{
        width: height,
        height: height,
      }}
    />
  );
};
