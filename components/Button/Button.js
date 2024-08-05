import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title }) => {
  return (
    <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
      <Text style={styles.btnText}>{title}</Text>
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
