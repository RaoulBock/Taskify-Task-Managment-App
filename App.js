import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AppProvider, { AppContext } from "./context/AppProvider";
import { APP_PAGES, COLORS } from "./context/Settings";
import LoginScreen from "./components/Screens/LoginScreen";
import HomeScreen from "./components/Screens/HomeScreen";
import CreateTaskScreen from "./components/Screens/CreateTaskScreen";
import SpecTaskScreen from "./components/Screens/SpecTaskScreen";

// Function to request permissions and schedule notifications
const handleNotifications = async () => {
  // Request notification permissions
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission for notifications not granted.");
    return;
  }

  // Example: Fetch tasks due today (you'll need to implement this part)
  const tasksDueToday = await fetchTasksDueToday();

  // Schedule notifications for tasks due today
  tasksDueToday.forEach(async (task) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task Due Today!",
        body: `You have a task due today:`,
        sound: true, // Optional
        priority: Notifications.AndroidNotificationPriority.HIGH, // Optional for Android
      },
      trigger: {
        // Schedule for today at 9 AM
        hour: 11,
        minute: 0,
        repeats: true,
      },
    });
  });
};

// Mock function to fetch tasks due today
const fetchTasksDueToday = async () => {
  // Replace with your actual logic to fetch tasks from your database or state
  return [
    { title: "Complete React Native project" },
    { title: "Meeting with team" },
  ];
};

function App() {
  useEffect(() => {
    handleNotifications();
  }, []);

  return (
    <AppProvider>
      <NavWrapper />
    </AppProvider>
  );
}

const NavWrapper = () => {
  const { navPage, setNavPage } = React.useContext(AppContext);

  React.useEffect(() => {
    console.log("App Nav: ", navPage);
  }, [navPage]);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.MAIN_BACKGROUND}
        barStyle={"light-content"}
        style="light"
      />
      {navPage === APP_PAGES.APP.LOGIN && <LoginScreen />}
      {navPage === APP_PAGES.APP.HOME && <HomeScreen />}
      {navPage === APP_PAGES.APP.CREATE && <CreateTaskScreen />}
      {navPage === APP_PAGES.APP.SPECTASK && <SpecTaskScreen />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.MAIN_BACKGROUND,
  },
});
