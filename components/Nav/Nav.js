import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Nav = ({ icon, title, iconTwo, style, onPress, onPressTwo }) => {
  return (
    <View style={styles.outline}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        onPress={onPress}
      >
        <Text>{icon}</Text>
      </TouchableOpacity>
      <Text numberOfLines={1} style={[styles.navText, style, styles.title]}>
        {title}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        onPress={onPressTwo}
      >
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: "#fff",
    fontWeight: "500",
  },
  title: {
    flex: 1, // Allow the title to grow and shrink
    textAlign: "center", // Center the text in its allocated space
    marginHorizontal: 10, // Add margin to prevent collision with icons
  },
});

export default Nav;
