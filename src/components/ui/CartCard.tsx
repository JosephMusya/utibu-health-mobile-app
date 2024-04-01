import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Alert,
} from "react-native";
import React from "react";
import ImageCard from "../shared/ImageCard";
import { CardCard, CartType, Prescription } from "../../types";
import { Dimensions } from "react-native";
import { style } from "../../constants/styles/style";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDosageContext } from "../../providers/DosageProvider";

const width: number = Dimensions.get("window").width;

const CartCard = ({
  image,
  dosage,
  qty,
  price,
  id,
  onDelete,
  onPress,
}: Partial<CardCard>) => {
  const { updateCart = () => {}, updateCartLoading } = useDosageContext();
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.image}>
          <ImageCard image={image} />
        </View>
      </TouchableNativeFeedback>
      <Text>KSH {price}</Text>
      <View style={styles.qty}>
        <TouchableNativeFeedback
          onPress={() => {
            (qty as number) > 1 &&
              updateCart({
                id: id as string,
                qty: (qty as number) - 1,
              });
          }}
        >
          <AntDesign
            name="minus"
            size={20}
            color={(qty as number) < 2 ? "gray" : "black"}
          />
        </TouchableNativeFeedback>
        {updateCartLoading ? <Text>...</Text> : <Text>{qty}</Text>}
        <TouchableNativeFeedback
          onPress={() => {
            (qty as number) === dosage.qty
              ? Alert.alert(
                  "Cart",
                  `Only ${dosage.qty} ${dosage.name} available`
                )
              : updateCart({ id: id as string, qty: (qty as number) + 1 });
          }}
        >
          <Ionicons name="add-outline" size={20} color="black" />
        </TouchableNativeFeedback>
      </View>
      <TouchableNativeFeedback onPress={onDelete}>
        <AntDesign name="delete" size={20} color="red" />
      </TouchableNativeFeedback>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 4,
    marginRight: 5,
    marginLeft: 5,
  },
  image: {
    width: width * 0.15,
    aspectRatio: 1,
    borderRadius: 10,
  },
  qty: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
});
