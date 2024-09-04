import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title, style, styleText, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, style]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.btnText, styleText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    borderRadius: 6,
  },
  btnText: {
    textAlign: "center",
    color: "#1d1d1d",
    fontWeight: "600",
  },
});

export default Button;
