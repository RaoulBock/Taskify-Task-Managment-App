import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import Nav from "../Nav/Nav";
import { APP_ICONS } from "../../context/Settings";

const CreateTaskScreen = () => {
  return (
    <View style={styles.outline}>
      <Nav
        icon={APP_ICONS.BACK}
        title={"Create new task"}
        iconTwo={APP_ICONS.SAVE}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 20,
    flex: 1,
  },
});

export default CreateTaskScreen;
