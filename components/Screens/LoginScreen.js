import React, { Fragment } from "react";
import { CLICK_A_TELL_API_KEY, GOOGLE_AUTH_CLIENT_ID } from "@env";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { APP_ICONS, APP_PAGES } from "../../context/Settings";
import Nav from "../Nav/Nav";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { AppContext } from "../../context/AppProvider";
import * as Google from "expo-auth-session/providers/google";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { generateCode } from "../../utils/helpers";
import { ApiServices } from "../../utils/ApiServices";

const CELL_COUNT = 6;

const LoginScreen = () => {
  const { setNavPage } = React.useContext(AppContext);
  const [code, setCode] = React.useState("");
  const [userCode, setUserCode] = React.useState();
  const [codeSent, setCodeSent] = React.useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = React.useState("");
  const [userPhoneNumberError, setUserPhoneNumberError] = React.useState("");
  const [storedCode, setStoredCode] = React.useState(""); // Store the generated code
  const [isLoading, setIsLoading] = React.useState(false);

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.select({
      ios: GOOGLE_AUTH_CLIENT_ID,
      android: GOOGLE_AUTH_CLIENT_ID,
    }),
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("ID Token:", id_token);
    }
  }, [response]);

  const handleLogin = async () => {
    setIsLoading(true);
    let isValid = true;
    Keyboard.dismiss();

    if (!userPhoneNumber) {
      setUserPhoneNumberError("Phone Number is required");
      isValid = false;
    } else {
      setUserPhoneNumberError("");
    }

    if (isValid) {
      console.log("working");
      const response = await ApiServices.onReg({
        phone_number: userPhoneNumber,
      });

      if (!response.error) {
        setNavPage(APP_PAGES.APP.VERIFY_USER);
      } else {
        console.log(response.error);
      }

      console.log(response);
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

      <Text style={styles.seperator}>or</Text>
      <Button title={APP_ICONS.GOOGLE} onPress={() => promptAsync()} />
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
  },
  btn: {
    backgroundColor: "#242424",
  },
  header: {
    color: "#fff",
    fontSize: 28,
    marginTop: 16,
  },
  forgotText: {
    color: "#a2fe65",
    fontWeight: "300",
  },
  formCtrl: {
    marginBottom: 20,
  },
  forgotBtn: {
    marginVertical: 16,
  },
  description: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 20,
  },
  seperator: {
    color: "white",
    textAlign: "center",
    marginVertical: 16,
  },
});

export default LoginScreen;
