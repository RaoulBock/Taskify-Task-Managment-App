import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import Nav from "../Nav/Nav";
import { APP_ICONS } from "../../context/Settings";
import { AppContext } from "../../context/AppProvider";

const CalenderScreen = () => {
  const { specTaskData: taskData } = React.useContext(AppContext);

  console.log(taskData);

  return (
    <View style={styles.outline}>
      <Nav title={"Calender"} icon={APP_ICONS.BACK} />
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginHorizontal: 10,
    flex: 1,
    marginTop: 10,
  },
});

export default CalenderScreen;
