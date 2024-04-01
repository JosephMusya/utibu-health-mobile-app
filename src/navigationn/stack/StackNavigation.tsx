import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import TabNavigation from "../tab/TabNavigation";
import { Screen } from "../../types";
import DosageViewScreen from "../../screens/DosageViewScreen";
import { color } from "../../constants/theme/theme";
import CartScreen from "../../screens/CartScreen";
import { Text } from "react-native";
const Stack = createNativeStackNavigator<Screen>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: color.primaryColor,
        },
      }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={TabNavigation} />
      <Stack.Screen
        name="DosageViewScreen"
        component={DosageViewScreen}
        options={({ route }) => ({
          // title: route.params.,
          title: "Dosage",
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={({ route }) => ({
          // title: route.params.,
          title: "Cart",
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
