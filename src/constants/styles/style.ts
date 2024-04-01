import { StyleSheet } from "react-native";
import { color } from "../theme/theme";
export const style = StyleSheet.create({
  flexRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  flexColumn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const inputStyle = StyleSheet.create({
  input: {
    padding: 4,
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 5,
    borderColor: color.primaryColor,
  },
});
