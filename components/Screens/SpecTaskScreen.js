import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { AppContext } from "../../context/AppProvider";
import Nav from "../Nav/Nav";
import { APP_ICONS, APP_PAGES, COLORS } from "../../context/Settings";
import Button from "../Button/Button";
import Models from "../Models/Models";
import SpecEditTaskView from "../Views/SpecEditTaskView";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const SpecTaskScreen = () => {
  const {
    specTaskData: taskData,
    setNavPage,
    specTaskEditVisable,
    setSpecTaskEditVisable,
    setSpecTaskData, // Added to update context after deletion
  } = React.useContext(AppContext);

  const [showFullText, setShowFullText] = React.useState(false);

  // Toggle between showing full text or truncated text
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  // Render task description based on whether full text is being shown
  const renderDescription = () => {
    if (taskData && taskData.description) {
      if (taskData.description.length <= 100 || showFullText) {
        return taskData.description;
      }
      return `${taskData.description.slice(0, 100)} ...`;
    }
    return "";
  };

  // Function to delete a task
  const deleteTask = async () => {
    if (!taskData || !taskData.title) {
      console.error("No task data or task title available for deletion.");
      return;
    }

    try {
      // Retrieve existing tasks
      const existingTasks = await AsyncStorage.getItem("taskData");
      let taskArray = existingTasks ? JSON.parse(existingTasks) : [];

      // Remove the task with the same title
      taskArray = taskArray.filter((task) => task.title !== taskData.title);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("taskData", JSON.stringify(taskArray));

      // Clear task data and navigate back
      setSpecTaskData(null); // Clear context data if necessary
      setNavPage(APP_PAGES.APP.HOME);
      console.log("Task successfully deleted");
    } catch (err) {
      console.log("Failed to delete the task from AsyncStorage:", err);
    }
  };

  // Confirm and delete task
  const confirmDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: deleteTask, style: "destructive" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.outline}>
      {specTaskEditVisable && (
        <Models
          visible={specTaskEditVisable}
          onClose={setSpecTaskEditVisable}
          children={<SpecEditTaskView taskData={taskData} />}
          customHeight={height / 2}
        />
      )}
      <Nav
        title={taskData ? taskData.title : "Task Details"}
        icon={APP_ICONS.BACK}
        iconTwo={APP_ICONS.PENCIL}
        onPress={() => setNavPage(APP_PAGES.APP.HOME)}
        onPressTwo={() => setSpecTaskEditVisable(true)}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.taskDescription}>{renderDescription()}</Text>
        {taskData &&
          taskData.description &&
          taskData.description.length > 50 && (
            <TouchableOpacity onPress={toggleText} activeOpacity={0.8}>
              <Text style={styles.seeMore}>
                {showFullText ? "^ See less" : "˅ See more"}
              </Text>
            </TouchableOpacity>
          )}
      </View>
      <View style={styles.mainGrid}>
        <View style={styles.grid}>
          <Text>{APP_ICONS.PROFILE}</Text>
          <View>
            <Text style={[styles.text, styles.assigedTo]}>Assigned to</Text>
            <Text style={styles.text}>Me</Text>
          </View>
        </View>
        <View style={styles.grid}>
          <Text>{APP_ICONS.CALENDER}</Text>
          <View>
            <Text style={[styles.text, styles.assigedTo]}>Due date</Text>
            <Text style={styles.text}>{taskData ? taskData.dueDate : ""}</Text>
          </View>
        </View>
      </View>

      <Button title={"Mark as complete ✅"} />

      <Button
        title={"Delete task 🗑️"}
        style={{
          backgroundColor: COLORS.MAIN_BACKGROUND,
          borderWidth: 1,
          borderColor: "#e74c3c",
          marginTop: 16,
        }}
        styleText={{ color: "#e74c3c" }}
        onPress={confirmDelete} // Call the confirmation function
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
  taskDescription: {
    fontWeight: "500",
    color: "white",
    marginVertical: 16,
    fontSize: 26,
  },
  grid: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: COLORS.WHITE,
    fontWeight: "500",
  },
  assigedTo: {
    color: "#6c707a",
  },
  mainGrid: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  seeMore: {
    color: COLORS.WHITE,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default SpecTaskScreen;
