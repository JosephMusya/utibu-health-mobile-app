import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { style } from "../../constants/styles/style";
import logo from "../../../assets/img/icon.png";
import { color } from "../../constants/theme/theme";

const LogoContent = () => {
  return (
    <View style={[style.flexColumn, styles.logo]}>
      <Text
        style={{ fontSize: 30, fontWeight: "bold", color: color.primaryColor }}
      >
        Utibu Health
      </Text>
      <Image source={logo} width={100} height={100} />
    </View>
  );
};

export default LogoContent;

const styles = StyleSheet.create({
  logo: {
    // flex: 1,
    rowGap: 20,
    height: 300,
  },
});
