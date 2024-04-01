import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { color, fontSize } from "../constants/theme/theme";
import Button from "../components/shared/Button";
import LogoContent from "../components/shared/LogoContent";
import { style } from "../constants/styles/style";
import { KeyboardAvoidingView } from "react-native";
import Input from "../components/shared/Input";
import { NavigationProps } from "../types";
import { Formik } from "formik";
import { useDosageContext } from "../providers/DosageProvider";

const LoginScreen = ({ navigation }: NavigationProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const { loginUser = () => {}, loginErr, loginLoading } = useDosageContext();
  return (
    <ScrollView style={styles.container}>
      {/* <StatusBar backgroundColor="transparent" /> */}
      <LogoContent />
      {
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) =>
            loginUser(values.username, values.password, navigation)
          }
        >
          {(props) => (
            <View style={styles.login}>
              {loginErr?.detail && (
                <Text style={{ color: "red" }}>{loginErr.detail}</Text>
              )}
              <View>
                <Input
                  label="Username"
                  placeholder="username"
                  borderColor={color.primaryColor}
                  value={props.values.username}
                  onChange={props.handleChange("username")}
                  errors={loginErr?.username}
                />
              </View>
              <View>
                <Input
                  label="Password"
                  placeholder="password"
                  hidden={hidePassword}
                  value={props.values.password}
                  onChange={props.handleChange("password")}
                  errors={loginErr?.password}
                />
              </View>
              {loginLoading ? (
                <ActivityIndicator size={40} color={color.primaryColor} />
              ) : (
                <Button
                  title="Login"
                  backgroundColor={color.primaryColor}
                  color="#fff"
                  size={fontSize.heading1.fontSize}
                  padding={10}
                  onPress={props.submitForm}
                  // onPress={() => navigation.navigate("HomeScreen")}
                />
              )}
            </View>
          )}
        </Formik>
      }
      <View style={[style.flexColumn, { marginTop: 30 }]}>
        <Text>Don't have an account?</Text>
        <Text
          style={{
            color: color.primaryColor,
            fontSize: fontSize.heading1.fontSize,
          }}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          Register
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    // alignItems: "center",
  },
  login: {
    display: "flex",
    rowGap: 10,
    // backgroundColor: "red",
    // justifyContent: "center",
  },
});
