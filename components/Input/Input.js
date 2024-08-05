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
}) => {
  return (
    <View style={styles.outline}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[styles.input, style]}
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
});

export default Input;
