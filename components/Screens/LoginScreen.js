import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { GOOGLE_AUTH_CLIENT_ID } from "@env";
import { APP_ICONS, APP_PAGES } from "../../context/Settings";
import Nav from "../Nav/Nav";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { AppContext } from "../../context/AppProvider";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../../firebase/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";

// Make sure to use this line to handle web browser-based auth
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { setNavPage, userPhoneNumber, setUserPhoneNumber } =
    useContext(AppContext);
  const [userPhoneNumberError, setUserPhoneNumberError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [storedCode, setStoredCode] = useState(null);

  // Google sign-in setup
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_AUTH_CLIENT_ID,
    useProxy: true,
  });

  // Handle Google login response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("ID Token:", id_token);
      // Here, you can send the id_token to your backend for verification
    }
  }, [response]);

  // Handle phone number login (sending OTP)
  const handleLogin = async () => {
    setIsLoading(true);
    Keyboard.dismiss();

    if (!userPhoneNumber) {
      setUserPhoneNumberError("Phone Number is required");
      setIsLoading(false);
      return;
    }

    try {
      // Initialize reCAPTCHA
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved
          },
        },
        auth
      );

      // Send OTP code
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        userPhoneNumber,
        recaptchaVerifier
      );
      setStoredCode(confirmationResult);
      setCodeSent(true);
      setNavPage(APP_PAGES.APP.VERIFY_USER);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setUserPhoneNumberError("Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.outline}>
      <Nav
        icon={APP_ICONS.BACK}
        onPress={() => setNavPage(APP_PAGES.APP.HOME)}
      />
      <Text style={styles.header}>Log in to Taskify</Text>
      <Text style={styles.description}>
        Log in to access your tasks from anywhere, securely stored in the cloud.
      </Text>

      <View style={styles.formCtrl}>
        <Input
          title={"Phone Number"}
          placeholder={"(123) 456-7890"}
          placeholderTextColor={"#242424"}
          keyboardType="phone-pad"
          onChangeText={(e) => setUserPhoneNumber(e)}
          error={userPhoneNumberError}
        />
      </View>
      <Button title={"Send Verification Code"} onPress={handleLogin} />
      <Text style={styles.separator}>or</Text>
      <Button title={APP_ICONS.GOOGLE} onPress={() => promptAsync()} />
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
  },
  header: {
    color: "#fff",
    fontSize: 28,
    marginTop: 16,
  },
  description: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 20,
  },
  formCtrl: {
    marginBottom: 20,
  },
  separator: {
    color: "white",
    textAlign: "center",
    marginVertical: 16,
  },
});

export default LoginScreen;
