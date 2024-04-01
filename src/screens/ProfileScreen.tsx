import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { style } from "../constants/styles/style";
import { color, fontSize } from "../constants/theme/theme";
import Button from "../components/shared/Button";
import { useDosageContext } from "../providers/DosageProvider";

const ProfileScreen = () => {
  const { userProfile } = useDosageContext();
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "100" }}>Address: {userProfile?.address}</Text>
      <Text style={styles.textStyle}>
        First Name: {userProfile?.first_name}
      </Text>
      <Text style={styles.textStyle}>Last Name: {userProfile?.last_name}</Text>
      <Button
        title="Logout"
        size={fontSize.Heading2.fontSize}
        padding={10}
        backgroundColor="gray"
        color="#fff"
        onPress={() => {}}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    display: "flex",
    rowGap: 20,
  },
  logout: {
    backgroundColor: "red",
  },
  textStyle: {
    fontSize: fontSize.Heading2.fontSize,
  },
});
