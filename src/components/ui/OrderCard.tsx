import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  TextStyle,
  StyleProp,
  ColorValue,
} from "react-native";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Order, OrderType } from "../../types";
import { color } from "../../constants/theme/theme";
import { style } from "../../constants/styles/style";

const checkColor = ({
  status,
}: {
  status: OrderType["status"] | undefined;
}): ColorValue => {
  if (status === "Completed") {
    return "green";
  } else if (status === "In Progress") {
    return color.secondaryColor;
  } else if (status === "Cancelled") {
    return "red";
  } else {
    return "black";
  }
};

const OrderCard = ({
  id,
  paid,
  status,
  total,
  delivery_method,
  payment,
}: Partial<OrderType>) => {
  return (
    <TouchableNativeFeedback>
      <View
        style={{
          padding: 4,
          backgroundColor: "#f5f5f5",
          elevation: 5,
          borderRadius: 4,
          marginRight: 5,
          marginLeft: 5,
          // borderWidth: 1,
          // borderColor: color.primaryColor,
        }}
      >
        <View style={styles.container}>
          <FontAwesome
            name="cart-plus"
            size={50}
            color={color.secondaryColor}
            style={{ paddingRight: 20 }}
            onPress={() => {}}
          />
          {/* <View style={styles.content}> */}
          <Text style={{ color: checkColor({ status }) }}>{status}</Text>
          <Text>Ksh {total}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
          <View style={style.flexRow}>
            <FontAwesome
              name="circle"
              size={12}
              color={color.primaryColor}
              style={{ marginRight: 10 }}
            />
            <Text>{delivery_method}</Text>
          </View>
          <View style={style.flexRow}>
            <FontAwesome
              name="circle"
              size={12}
              color={color.primaryColor}
              style={{ marginRight: 10 }}
            />
            <Text>Payment {payment}</Text>
          </View>
        </View>
        {/* {paid ? <Text>PAID</Text> : <Text>NOT PAID</Text>} */}
        {/* </View> */}
      </View>
    </TouchableNativeFeedback>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
