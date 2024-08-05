import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppProvider, { AppContext } from "./context/AppProvider";
import { APP_PAGES } from "./context/Settings";
import LoginScreen from "./components/Screens/LoginScreen";
import HomeScreen from "./components/Screens/HomeScreen";
import CreateTaskScreen from "./components/Screens/CreateTaskScreen";

function App() {
  return (
    <AppProvider>
      <NavWrapper />
    </AppProvider>
  );
}

const NavWrapper = () => {
  const { navPage, setNavPage } = React.useContext(AppContext);

  const onSetNavPage = (e) => {
    setNavPage(e);
  };

  React.useEffect(() => {
    console.log("App Nav: ", navPage);
  }, [navPage]);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#0a0a0a"
        barStyle={"light-content"}
        style="light"
      />
      {navPage === APP_PAGES.APP.LOGIN && <LoginScreen />}
      {navPage === APP_PAGES.APP.HOME && <HomeScreen />}
      {navPage === APP_PAGES.APP.CREATE && <CreateTaskScreen />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
});
