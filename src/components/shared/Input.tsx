import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { InputType } from "../../types";
import { color } from "../../constants/theme/theme";
const Input = ({
  placeholder,
  borderColor = color.primaryColor,
  hidden,
  borderWidth = 1.5,
  padding = 8,
  label = "",
  errors,
  value,
  onChange,
}: InputType) => {
  const ErrorBox = ({ error }: { error: string[] }) => {
    return <Text style={{ color: "red" }}>{error}</Text>;
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      {errors && <ErrorBox error={errors} />}
      <TextInput
        value={value}
        onChangeText={onChange}
        style={[
          styles.container,
          {
            borderColor: borderColor,
            borderWidth: borderWidth,
            padding: padding,
          },
        ]}
        placeholder={placeholder}
        secureTextEntry={hidden}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderColor: color.primaryColor,
    borderRadius: 4,
  },
  label: {
    paddingTop: 4,
    paddingBottom: 4,
    color: color.primaryColor,
  },
});
