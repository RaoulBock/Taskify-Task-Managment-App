import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";

const VerifyUserScreen = () => {
  return (
    <View style={styles.outline}>
      <Text>dasdsa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
  },
});

export default VerifyUserScreen;
