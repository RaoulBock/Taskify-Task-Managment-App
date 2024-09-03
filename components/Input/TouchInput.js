import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { APP_ICONS } from "../../context/Settings";

const TouchInput = ({
  title,
  text,
  style,
  onPress,
  icon,
  error,
  styleTitle,
  styleText,
}) => {
  return (
    <View>
      <Text style={[styles.title, styleTitle]}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.touchInput, style, error ? styles.inputError : null]}
        onPress={onPress}
      >
        <Text style={[styles.text, styleText]}>{text}</Text>
        <Text>{icon}</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  inputError: {
    borderColor: "red", // Red border for error state
  },
});

export default TouchInput;
