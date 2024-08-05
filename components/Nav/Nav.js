import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Nav = ({ icon, title, iconTwo }) => {
  return (
    <View style={styles.outline}>
      <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
        <Text>{icon}</Text>
      </TouchableOpacity>
      <Text style={styles.navText}>{title}</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
        <Text>{iconTwo}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#242424",
    padding: 8,
    borderRadius: 50,
  },
  navText: {
    color: "#fff",
    fontWeight: "500",
  },
});

export default Nav;
