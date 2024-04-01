import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Dose } from "../../types";

const ImageCard = ({ image }: Partial<Dose>) => {
  return (
    <Image
      style={style.image}
      source={{
        uri: image,
      }}
    />
  );
};

export default ImageCard;

const style = StyleSheet.create({
  image: {
    width: "100%",
    objectFit: "cover",
    flex: 1,
    overflow: "hidden",
  },
});
