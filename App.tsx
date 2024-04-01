import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
// import TabNavigation from "./src/navigationn/tab/TabNavigation";
import StacKNavigation from "./src/navigationn/stack/StackNavigation";
import React, { useEffect, useState } from "react";
import { NavigationProps } from "./src/types";
import { DoseProvider } from "./src/providers/DosageProvider";
import { getToken } from "./src/utils/token";

export const navigationRef =
  React.createRef<NavigationContainerRef<NavigationProps>>();

export function navigate(name: any, params: any) {
  navigationRef.current?.navigate(name, params);
}

export default function App() {
  // const token = useState(getToken("token"));
  getToken("token").then((token) => {
    console.log("TOKEN: ", token);
    if (token) {
      navigate("HomeScreen", {});
    } else {
      navigate("LoginScreen", {});
    }
  });

  return (
    <NavigationContainer>
      <DoseProvider>
        <StacKNavigation />
      </DoseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
