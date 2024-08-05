import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TouchInput = ({ title, text, style, onPress }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.touchInput, style]}
        onPress={onPress}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    marginBottom: 10,
    fontWeight: "200",
  },
  touchInput: {
    borderColor: "#242424",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: "#fff",
    paddingVertical: 11,
  },
  text: {
    color: "#fff",
  },
});

export default TouchInput;
