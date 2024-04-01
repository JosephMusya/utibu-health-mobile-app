import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { color, fontSize } from "../../constants/theme/theme";
import { style } from "../../constants/styles/style";

const EmptyPlaceholder = ({
  text,
  color = "black",
}: {
  text: string;
  color?: string;
}) => {
  return (
    <SafeAreaView style={[styles.container, style.flexRow]}>
      <Text style={{ color: color }}>{text}</Text>
    </SafeAreaView>
  );
};

export default EmptyPlaceholder;

const styles = StyleSheet.create({
  container: {
    color: color.primaryColor,
    fontSize: fontSize.Heading2.fontSize,
    display: "flex",
  },
});
