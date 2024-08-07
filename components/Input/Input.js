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
  multiline,
  numberOfLines,
  style,
  error,
}) => {
  return (
    <View style={styles.outline}>
      <Text style={[styles.title, error ? styles.errorText : null]}>
        {title}
      </Text>
      <TextInput
        style={[styles.input, style, error ? styles.inputError : null]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        editabl={editable}
        placeholderTextColor={placeholderTextColor}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: "red",
    fontSize: 12,
  },
  inputError: {
    borderColor: "red", // Red border for error state
  },
});

export default Input;
