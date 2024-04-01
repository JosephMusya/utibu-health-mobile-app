import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { style } from "../../constants/styles/style";

const LogoContent = () => {
  return (
    <View style={[style.flexColumn, styles.logo]}>
      <Text style={{ fontSize: 30 }}>UTIBU HEALTH</Text>
      <Image
        source={{
          uri: "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/6/2/f/62f64963b3b8eda573996bdfb646729e818ef77b.png",
          height: 100,
          width: 100,
        }}
      />
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
