import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dose, Prescription } from "../types";
import ImageCard from "../components/shared/ImageCard";
import { fontSize } from "../constants/theme/theme";
import { medics } from "../utils/medic";
import { Dimensions } from "react-native";
import { style, style as Style } from "../constants/styles/style";
import { color } from "../constants/theme/theme";
import Button from "../components/shared/Button";
import EmptyPlaceholder from "../components/shared/EmptyPlaceholder";
import { useDosageContext } from "../providers/DosageProvider";
import { API_URL } from "../private/env";

const DosageView = ({ navigation, route }: any) => {
  const width = Dimensions.get("window").width;
  const { id, name } = route.params;
  const [prescription, setPrescription] = useState<Prescription>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const {
    addToCart = () => {},
    deleteCartItem = () => {},
    cartItems,
  } = useDosageContext();

  const getPrescription = async ({ id }: Partial<Dose>) => {
    try {
      setLoading(true);
      setError(false);
      const getPresc: Response = await fetch(`${API_URL}/dosage/${id}`);
      if (getPresc.ok) {
        const presc = await getPresc.json();
        setPrescription(presc);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrescription({ id: id });
  }, []);
  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size={40} color={color.primaryColor} />
      ) : error ? (
        <EmptyPlaceholder
          text="Error getting dosage"
          color={color.secondaryColor}
        />
      ) : (
        <ScrollView style={styles.container}>
          <View style={{ width: width * 1, aspectRatio: 1 }}>
            {prescription?.instock ? (
              <Text style={[styles.floater, { color: color.secondaryColor }]}>
                In Stock
              </Text>
            ) : (
              <Text style={[styles.floater, { color: "red" }]}>
                Out of Stock
              </Text>
            )}
            <ImageCard image={prescription?.image} />
          </View>
          <View
            style={
              (style.flexColumn,
              { justifyContent: "flex-start", rowGap: 10, padding: 4 })
            }
          >
            <Text style={{ fontSize: fontSize.heading1.fontSize }}>
              {prescription?.name}
            </Text>
            <View
              style={
                (Style.flexRow,
                { flexDirection: "row", justifyContent: "flex-start", gap: 30 })
              }
            >
              <Text>Stock Available</Text>
              <Text
                style={{
                  fontSize: fontSize.heading1.fontSize,
                  color: prescription?.instock ? color.secondaryColor : "red",
                }}
              >
                {prescription?.qty} Units
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: fontSize.heading1.fontSize,
                  fontWeight: fontSize.heading1.fontWeight,
                }}
              >
                KSH: {prescription?.price}
              </Text>
            </View>
            {cartItems?.some((item) => item.dosage.id === prescription?.id) ? (
              <Button
                title="Dosage added to cart"
                size={fontSize.heading1.fontSize}
                backgroundColor={color.secondaryColor}
                padding={10}
                color="#fff"
                onPress={() => {
                  navigation.navigate("CartScreen");
                }}
              />
            ) : (prescription?.qty as number) < 1 ? (
              <Button
                title="Out of stock"
                backgroundColor={color.secondaryColor}
                size={fontSize.heading1.fontSize}
                padding={10}
                color="#fff"
                onPress={() => {
                  Alert.alert(
                    "Dose",
                    "We will notify you when this dose is available"
                  );
                }}
              />
            ) : (
              <Button
                title="Add to cart"
                size={fontSize.heading1.fontSize}
                backgroundColor={color.primaryColor}
                padding={10}
                color="#fff"
                onPress={() => {
                  addToCart(prescription?.id as unknown as string);
                }}
              />
            )}

            <Text>{prescription?.description}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DosageView;

const styles = StyleSheet.create({
  container: {
    // borderTopEndRadius: 41,
    // backgroundColor: "red",
  },
  floater: {
    position: "absolute",
    top: 4,
    right: 10,
    zIndex: 1,
    paddingRight: 4,
  },
});

{
  /* <Button
          title="Add to Cart"
          onPress={() => {}}
          size={fontSize.Heading3.fontSize}
        /> */
}
