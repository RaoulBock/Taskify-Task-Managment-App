import React from "react";
import { TouchableOpacity } from "react-native";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { APP_ICONS } from "../../context/Settings";

const Input = ({
  keyboardType,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onSubmitEditing,
  title,
  editable,
  placeholderTextColor,
}) => {
  return (
    <View style={styles.outline}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        editabl={editable}
        placeholderTextColor={placeholderTextColor}
      />
      {secureTextEntry === true && (
        <TouchableOpacity
          style={styles.eye}
          activeOpacity={0.8}
          onPress={() => console.log("Hello")}
        >
          <Text>{APP_ICONS.EYE}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#242424",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: "#fff",
  },
  title: {
    color: "#fff",
    marginBottom: 10,
    fontWeight: "200",
  },
  outline: {},
  eye: {
    position: "relative",
    top: "-35%",
    left: "90%",
  },
});

export default Input;
