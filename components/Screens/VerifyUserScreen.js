import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import Nav from "../Nav/Nav";
import { APP_ICONS, APP_PAGES } from "../../context/Settings";
import { AppContext } from "../../context/AppProvider";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

const VerifyUserScreen = () => {
  const { setNavPage, userPhoneNumber, setUserPhoneNumber } =
    React.useContext(AppContext);
  const [code, setCode] = React.useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const [timer, setTimer] = useState(60); // Initial timer set to 60 seconds
  const [isTimerActive, setIsTimerActive] = useState(true); // Manage whether the timer is running

  // Use useEffect to handle the countdown
  useEffect(() => {
    let interval;
    if (timer > 0 && isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval); // Clear the interval when timer reaches 0 or is inactive
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timer, isTimerActive]);

  // Function to request a new OTP and reset the timer
  const requestNewOTP = () => {
    setTimer(60); // Reset the timer to 60 seconds
    setIsTimerActive(true); // Activate the timer
    // Logic to request a new OTP goes here
    console.log("New OTP requested");
  };

  return (
    <View style={styles.outline}>
      <Nav
        title={`Code has been sent to ${userPhoneNumber}`}
        icon={APP_ICONS.BACK}
        onPress={() => setNavPage(APP_PAGES.APP.LOGIN)}
      />

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

      <Text style={styles.timerText}>
        {timer > 0
          ? `Request new OTP in ${timer}s`
          : "You can request a new OTP now"}
      </Text>

      {timer === 0 && (
        <Text style={styles.resendOTP} onPress={requestNewOTP}>
          Resend OTP
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
  },
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  focusCell: {
    borderColor: "#000",
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: "#333",
    alignSelf: "center",
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  timerText: {
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
    fontSize: 16,
  },
  resendOTP: {
    textAlign: "center",
    color: "#007BFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default VerifyUserScreen;
