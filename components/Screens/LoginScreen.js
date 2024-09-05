import React, { Fragment } from "react";
import { CLICK_A_TELL_API_KEY, GOOGLE_AUTH_CLIENT_ID } from "@env";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
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

const CELL_COUNT = 6;

const LoginScreen = () => {
  const { setNavPage } = React.useContext(AppContext);
  const [code, setCode] = React.useState("");
  const [userCode, setUserCode] = React.useState();
  const [codeSent, setCodeSent] = React.useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = React.useState("+264814954704");
  const [storedCode, setStoredCode] = React.useState(""); // Store the generated code

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

  const sendSMS = () => {
    const apiKey = CLICK_A_TELL_API_KEY; // Replace with your actual API key
    const phoneNumber = userPhoneNumber;
    const code = generateCode();
    setStoredCode(code); // Store the code
    const message = `Your verification code is: ${code}. Please use this to complete your registration.`;

    const url = `https://platform.clickatell.com/messages/http/send?apiKey=${apiKey}&to=${phoneNumber}&content=${encodeURIComponent(
      message
    )}`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.messages[0]?.accepted) {
          console.log("Message sent successfully:", data);
          setCodeSent(true);
        } else {
          console.error("Failed to send message:", data.messages[0]?.error);
          setCodeSent(false);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setCodeSent(false);
      });
  };

  const handleLogin = () => {
    if (code === storedCode) {
      console.log("Logged in");
      // Proceed with the login process
    } else {
      console.log("Incorrect code");
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

      {codeSent === false ? (
        <>
          <View style={styles.formCtrl}>
            <Input
              title={"Phone Number"}
              placeholder={"(123) 456-7890"}
              placeholderTextColor={"#242424"}
              keyboardType="phone-pad"
              onChangeText={(e) => setUserPhoneNumber(e)}
            />
          </View>
          <Button title={"Send Verification Code"} onPress={sendSMS} />
        </>
      ) : (
        <View style={styles.formCtrl}>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={Platform.select({
              android: "sms-otp",
              default: "one-time-code",
            })}
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
              <Fragment key={index}>
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}
                >
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
                {index === 2 ? (
                  <View key={`separator-${index}`} style={styles.separator} />
                ) : null}
              </Fragment>
            )}
          />
          <Button title={"Verify Code"} onPress={handleLogin} />
        </View>
      )}

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
