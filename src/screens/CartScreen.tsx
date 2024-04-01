import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableNativeFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import CartCard from "../components/ui/CartCard";
// import { carts } from "../utils/cart";
import {
  CartCreationType,
  CartItems,
  CartType,
  OrderType,
  Prescription,
} from "../types";
import { medics } from "../utils/medic";
import { Separator } from "../components/shared/Separator";
import Button from "../components/shared/Button";
import { color, fontSize } from "../constants/theme/theme";
import { Picker } from "@react-native-picker/picker";
import EmptyPlaceholder from "../components/shared/EmptyPlaceholder";
import { useDosageContext } from "../providers/DosageProvider";

const CartScreen = ({ navigation }: any) => {
  const API_URL: string = "http://192.168.0.102:8000";
  const [payment, setPayment] = useState<Partial<OrderType>>({
    payment: "On Order",
  });
  const [delivery, setDelivery] = useState<Partial<OrderType>>({
    delivery_method: "Pick from pharmacy",
  });
  const {
    getCarts = () => {},
    createOrder = () => {},
    createErr,
    loadingCart,
    cartItems,
    deleteCartItem = () => {},
  } = useDosageContext();

  function calculateTotalPrice(data: any) {
    let totalPrice = 0;
    data.forEach((item: { dosage: { price: number }; qty: number }) => {
      totalPrice += item.dosage.price * item.qty;
    });
    return totalPrice;
  }
  ``;

  const navigate = ({ id, name }: Partial<Prescription>) => {
    navigation.navigate("DosageViewScreen", {
      id: id,
      name: name,
    });
  };

  const getCartItems = (cartItems: CartItems[]): string[] => {
    const ids: string[] = [];

    cartItems.forEach((item) => {
      ids.push(item.id);
    });

    return ids;
  };
  useEffect(() => {
    getCarts();
  }, []);
  return (
    <SafeAreaView>
      {loadingCart ? (
        <ActivityIndicator size={40} color={color.primaryColor} />
      ) : cartItems?.length ? (
        <ScrollView style={styles.container}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => Separator({})}
            renderItem={({ item }) => {
              return (
                <CartCard
                  dosage={item.dosage}
                  name={item.dosage.name}
                  image={item.dosage.image}
                  id={item.id}
                  price={item.dosage.price * item.qty}
                  qty={item.qty}
                  onPress={() =>
                    navigate({ id: item.dosage.id, name: item.dosage.name })
                  }
                  onDelete={() => deleteCartItem({ id: item.id })}
                />
              );
            }}
          />
          {cartItems && (
            <View style={{ padding: 4 }}>
              <Text
                style={{
                  fontSize: fontSize.heading1.fontSize,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                Please pay <Text>Ksh: {calculateTotalPrice(cartItems)}</Text>
              </Text>
              <Picker
                selectedValue={payment.payment}
                onValueChange={(itemValue) => {
                  setPayment({ payment: itemValue });
                }}
              >
                <Picker.Item label="Pay on order" value="On Order" />
                <Picker.Item label="Pay on delivery" value="On Delivery" />
              </Picker>
              <Picker
                style={{ borderWidth: 1, borderColor: "red" }}
                selectedValue={delivery.delivery_method}
                onValueChange={(itemValue) => {
                  setDelivery({ delivery_method: itemValue });
                }}
              >
                <Picker.Item
                  label="Pick from pharmacy"
                  value="Pick from pharmacy"
                />
                <Picker.Item
                  label="Deliver to my address"
                  value="Deliver to my address"
                />
              </Picker>
              <Button
                title="Checkout"
                backgroundColor={color.primaryColor}
                padding={10}
                color="#fff"
                size={fontSize.heading1.fontSize}
                onPress={() =>
                  createOrder({
                    cartItem: getCartItems(cartItems),
                    payment: payment.payment,
                    deliveryMethod: delivery.delivery_method,
                    status: "In Progress",
                    user: "mucia",
                    paid: payment.payment === "On Delivery" ? false : true,
                    navigation: navigation,
                  })
                }
              />
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={{ marginTop: 20, padding: 50, display: "flex", rowGap: 10 }}
        >
          <EmptyPlaceholder text="Your dosage cart is empty!" color="black" />
          <TouchableNativeFeedback>
            <Button
              size={fontSize.Heading2.fontSize}
              title="Search for prescription"
              backgroundColor={color.primaryColor}
              padding={10}
              color="#fff"
              onPress={() => navigation.navigate("HomeScreen")}
            />
          </TouchableNativeFeedback>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    // padding: 4,
    display: "flex",
    backgroundColor: "#f5f5f5",
  },
});
