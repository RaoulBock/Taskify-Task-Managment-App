import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { APP_ICONS } from "../../context/Settings";
import Nav from "../Nav/Nav";
import Input from "../Input/Input";
import Button from "../Button/Button";

const LoginScreen = () => {
  return (
    <View style={styles.outline}>
      <Nav icon={APP_ICONS.BACK} />
      <Text style={styles.header}>Log in to Taskify</Text>

      <View style={styles.formCtrl}>
        <Input
          title={"Email"}
          placeholder={"someone@something.com"}
          placeholderTextColor={"#242424"}
        />
      </View>
      <View>
        <Input
          title={"Password"}
          placeholder={"••••••••"}
          placeholderTextColor={"#242424"}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.8}>
        <Text style={styles.forgotText}>Forgot Password ?</Text>
      </TouchableOpacity>

      <Button title={"Login"} />
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 20,
  },
  btn: {
    backgroundColor: "#242424",
  },
  header: {
    color: "#fff",
    marginVertical: 18,
    fontSize: 28,
  },
  forgotText: {
    color: "#a2fe65",
    fontWeight: "300",
  },
  formCtrl: {
    marginBottom: 20,
  },
  forgotBtn: {
    marginBottom: 20,
    marginTop: 20,
  },
});

export default LoginScreen;
