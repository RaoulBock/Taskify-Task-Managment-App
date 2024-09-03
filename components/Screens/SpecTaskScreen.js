import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { AppContext } from "../../context/AppProvider";
import Nav from "../Nav/Nav";
import { APP_ICONS, APP_PAGES } from "../../context/Settings";

const SpecTaskScreen = () => {
  const { specTaskData: taskData, setNavPage } = React.useContext(AppContext);

  console.log(taskData);
  return (
    <View style={styles.outline}>
      <Nav
        title={taskData.title}
        icon={APP_ICONS.BACK}
        iconTwo={APP_ICONS.PENCIL}
        onPress={() => setNavPage(APP_PAGES.APP.HOME)}
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

export default SpecTaskScreen;
