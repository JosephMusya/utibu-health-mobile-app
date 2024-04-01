import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { CartItems, Dose, Prescription } from "../../types";
import { style as Style } from "../../constants/styles/style";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../shared/Button";
import { color } from "../../constants/theme/theme";
import { Dimensions } from "react-native";
import ImageCard from "../shared/ImageCard";
import { medics } from "../../utils/medic";
import { useDosageContext } from "../../providers/DosageProvider";

const width: number = Dimensions.get("window").width;

const DosageCard = ({
  image,
  name,
  price,
  instock,
  onPress,
  id,
  qty,
}: Dose) => {
  const checkItemInCart = (items: CartItems[] | undefined, id: string) => {
    return cartItems?.some((item) => item.dosage.id === id);
  };
  const { addToCart = () => {}, cartItems } = useDosageContext();
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[style.container]}>
        {instock ? (
          <Text style={[style.floater, { color: color.secondaryColor }]}>
            In Stock
          </Text>
        ) : (
          <Text style={[style.floater, { color: "red" }]}>Out of Stock</Text>
        )}
        <ImageCard image={image} />
        <View style={{ padding: 5, display: "flex", rowGap: 5 }}>
          <Text numberOfLines={1}>{name}</Text>
          <View style={[Style.flexRow, { justifyContent: "space-between" }]}>
            {checkItemInCart(cartItems, id) ? (
              <Button
                title="Added"
                backgroundColor={color.secondaryColor}
                padding={4}
                color="#ffff"
                size={10}
                onPress={() => {
                  checkItemInCart(cartItems, id)
                    ? Alert.alert("Dose", "Dose already added to  your cart")
                    : addToCart(id);
                }}
              />
            ) : (
              <Button
                title="Add"
                backgroundColor={instock ? color.primaryColor : "gray"}
                padding={4}
                color="#ffff"
                size={10}
                onPress={() =>
                  instock
                    ? addToCart(id)
                    : Alert.alert("Dosage", "This dosage is out of stock")
                }
              />
            )}

            <View style={[Style.flexRow]}>
              <Text>KSH{price}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default DosageCard;

const style = StyleSheet.create({
  container: {
    elevation: 5,
    width: width * 0.45,
    display: "flex",
    aspectRatio: 1,
    alignContent: "center",
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
    margin: 5,
  },
  image: {
    width: "100%",
    objectFit: "cover",
    flex: 1,
    overflow: "hidden",
  },

  floater: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    paddingRight: 4,
  },
});
