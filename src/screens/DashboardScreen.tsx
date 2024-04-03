import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import DosageCard from "../components/ui/DosageCard";
import { style as Style } from "../constants/styles/style";
// import { medics } from "../utils/medic";
import { CartItems, Dose, Prescription } from "../types";
import { color } from "../constants/theme/theme";
import EmptyPlaceholder from "../components/shared/EmptyPlaceholder";
import { useDosageContext } from "../providers/DosageProvider";
import { API_URL } from "../private/env";

const DashboardScreen = ({ navigation }: any) => {
  const [dose, setDose] = useState<Prescription[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getDosage = async () => {
    try {
      setError(false);
      setLoading(true);
      const getDose: Response = await fetch(`${API_URL}/dosage`, {
        method: "get",
        mode: "no-cors",
      });

      if (getDose.ok) {
        const dose: Prescription[] = await getDose.json();
        setDose(dose);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = ({ id, name }: Partial<Dose>) => {
    navigation.navigate("DosageViewScreen", {
      id: id,
      name: name,
    });
  };

  const refetch = () => {
    setRefreshing(true);
    getDosage();
    setRefreshing(false);
  };

  useEffect(() => {
    getDosage();
  }, []);

  return (
    <View style={[Style.flexRow, style.container]}>
      {loading ? (
        <ActivityIndicator size={40} color={color.primaryColor} />
      ) : error ? (
        <EmptyPlaceholder
          text="Error occured! Try again."
          color={color.secondaryColor}
        />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetch} />
          }
        >
          <FlatList
            style={style.flatlist}
            // ItemSeparatorComponent={() => Separator({ height: 15 })}
            data={dose}
            numColumns={2}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() =>
              EmptyPlaceholder({ text: "No Dosages available" })
            }
            renderItem={({ item }) => {
              return (
                <DosageCard
                  onPress={() => navigate({ id: item.id })}
                  image={item.image}
                  instock={item.instock}
                  name={item.name}
                  price={item.price}
                  qty={item.qty}
                  id={item.id}
                />
              );
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default DashboardScreen;

const style = StyleSheet.create({
  container: {
    padding: 4,
    display: "flex",
    justifyContent: "center",
  },

  flatlist: {
    // backgroundColor: "red",
    paddingHorizontal: 4,
    display: "flex",
    width: "100%",
    // rowGap: 50,
    // columnGap: 50,
  },
});
