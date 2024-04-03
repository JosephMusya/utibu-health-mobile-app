import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import OrderCard from "../components/ui/OrderCard";
import { Separator } from "../components/shared/Separator";
import { useDosageContext } from "../providers/DosageProvider";
import { useEffect } from "react";
import EmptyPlaceholder from "../components/shared/EmptyPlaceholder";
import { color } from "../constants/theme/theme";

const OrdersScreen = ({ navigation }: any) => {
  const {
    getOrders = () => {},
    orders,
    loadingOrders,
    orderErr,
  } = useDosageContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  function calculateTotalPrice(data: any) {
    let totalPrice = 0;
    data.forEach((item: { dosage: { price: number }; qty: number }) => {
      totalPrice += item.dosage.price * item.qty;
    });
    return totalPrice;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    getOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loadingOrders ? (
        <ActivityIndicator size={40} color={color.primaryColor} />
      ) : orderErr ? (
        <EmptyPlaceholder
          text="Error occured while getting orders!"
          color="red"
        />
      ) : (
        <ScrollView
          style={{ padding: 4 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getOrders} />
          }
        >
          <FlatList
            data={orders}
            // keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => Separator({})}
            ListEmptyComponent={() => (
              <EmptyPlaceholder
                text="No orders placed"
                color={color.secondaryColor}
              />
            )}
            renderItem={({ item }) => {
              return (
                <OrderCard
                  status={item.status}
                  delivery_method={item.delivery_method}
                  // date={item.date}
                  paid={item.paid}
                  payment={item.payment}
                  total={calculateTotalPrice(item.cart_item)}
                />
              );
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;
