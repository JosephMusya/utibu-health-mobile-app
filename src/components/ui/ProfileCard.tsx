import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { style } from "../../constants/styles/style";
import { fontSize } from "../../constants/theme/theme";

const ProfileCard = ({ user }: { user: string | undefined }) => {
  return (
    <View style={style.flexRow}>
      <Ionicons name="person-circle-outline" size={40} color="#fff" />
      <Text style={{ color: "#fff", fontSize: fontSize.heading1.fontSize }}>
        {user}
      </Text>
    </View>
  );
};

export default ProfileCard;
