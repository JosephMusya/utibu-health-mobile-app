import { Pressable, Text, View, StyleSheet } from "react-native";
import React from "react";
import { ColorType } from "../../types";
import { color, fontSize } from "../../constants/theme/theme";
import { style } from "../../constants/styles/style";
import { TouchableNativeFeedback } from "react-native";
type Button = {
  title: string;
  backgroundColor?: string;
  color?: string;
  onPress?: () => void;
  padding?: number;
  size: number;
  // color?: Partial<ColorType>
};

const Button = ({
  title,
  backgroundColor,
  size,
  color,
  padding,
  onPress,
}: Button) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          style.flexRow,
          { backgroundColor: backgroundColor, padding: padding },
        ]}
      >
        <Text style={{ color: color, fontSize: size }}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: color.primaryColor,
    color: "#fff",
    overflow: "hidden",
    minWidth: 50,
  },
});
