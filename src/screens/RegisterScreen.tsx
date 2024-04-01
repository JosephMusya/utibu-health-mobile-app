import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import LogoContent from "../components/shared/LogoContent";
import { inputStyle, style } from "../constants/styles/style";
import { color, fontSize } from "../constants/theme/theme";
import {
  NavigationProps,
  RegisterFormik,
  UserRegistrationType,
} from "../types";
import Input, { ErrorBox } from "../components/shared/Input";
import { useState } from "react";
import Button from "../components/shared/Button";
import { KeyboardAvoidingView } from "react-native";
import { Formik, FormikProps } from "formik";
import { API_URL } from "../private/env";

export interface ErrorType {
  username?: string[];
  address?: string[];
  first_name?: string[];
  last_name?: string[];
  password_1?: string[];
  password_2?: string[];
  detail?: string;
  password_error?: string[];
}

const RegisterScreen = ({ navigation }: NavigationProps) => {
  const [errors, setErrors] = useState<ErrorType | null>({});
  const [loading, setLoading] = useState<boolean>(false);

  const [hidePassword, setHidePassword] = useState(true);
  const registerUser = async (values: UserRegistrationType) => {
    try {
      setLoading(true);
      const addUser = await fetch(`${API_URL}/register/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          first_name: values.first_name,
          last_name: values.last_name,
          address: values.address,
          password_1: values.password1,
          password_2: values.password2,
        }),
      });
      if (addUser.ok) {
        if (addUser.status === (200 | 201)) {
          setErrors(null);
          navigation.navigate("LoginScreen");
        } else {
          console.log("Errrr");
        }
      } else {
        const errors = await addUser.json();
        console.log(errors);
        setErrors(errors);
      }
    } catch (error) {
      Alert.alert(
        "Registration",
        `Failed to register ${values.username}! Try again`
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    // <KeyboardAvoidingView behavior="padding">
    <ScrollView style={[styles.container]}>
      <LogoContent />
      <Formik
        initialValues={
          {
            username: "",
            address: "",
            first_name: "",
            last_name: "",
            password1: "",
            password2: "",
          } as UserRegistrationType
        }
        onSubmit={(values, { resetForm }) => {
          registerUser(values);
          // resetForm();
        }}
      >
        {(props) => (
          <View>
            {errors?.detail && (
              <Text style={{ color: "red" }}>{errors.detail}</Text>
            )}

            <View>
              <Input
                label="Username"
                placeholder="username"
                borderColor={color.primaryColor}
                errors={errors?.username}
                value={props.values.username}
                onChange={props.handleChange("username")}
              />
            </View>
            <View>
              <Input
                label="First name"
                placeholder="Utibu"
                borderColor={color.primaryColor}
                errors={errors?.first_name}
                value={props.values.first_name}
                onChange={props.handleChange("first_name")}
              />
            </View>
            <View>
              <Input
                label="Last name"
                placeholder="Health"
                borderColor={color.primaryColor}
                errors={errors?.last_name}
                value={props.values.last_name}
                onChange={props.handleChange("last_name")}
              />
            </View>
            <View>
              <Input
                label="Address"
                placeholder="P.O 123-123, Nairobi"
                borderColor={color.primaryColor}
                errors={errors?.address}
                value={props.values.address}
                onChange={props.handleChange("address")}
              />
            </View>
            {errors?.password_error && (
              <View style={{ paddingTop: 10 }}>
                <ErrorBox error={errors.password_error} />
              </View>
            )}
            <View>
              <Input
                label="Password 1"
                errors={errors?.password_1}
                placeholder="password"
                hidden={hidePassword}
                value={props.values.password1}
                onChange={props.handleChange("password1")}
              />
            </View>

            <View>
              <Input
                label="Password 2"
                placeholder="Confirm password"
                hidden={hidePassword}
                errors={errors?.password_2}
                value={props.values.password2}
                onChange={props.handleChange("password2")}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              {loading ? (
                <ActivityIndicator size={40} color={color.primaryColor} />
              ) : (
                <Button
                  title="Register"
                  backgroundColor={color.primaryColor}
                  color="#fff"
                  size={fontSize.heading1.fontSize}
                  padding={10}
                  onPress={props.submitForm}
                />
              )}
            </View>
            <View style={[style.flexColumn, { marginTop: 30 }]}>
              <Text>Already have an account?</Text>
              <Text
                style={{
                  color: color.primaryColor,
                  fontSize: fontSize.heading1.fontSize,
                }}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                Login
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  register: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },
});
