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
  ScrollView,
  Image,
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
  const [isCompleted, setIsCompleted] = React.useState(
    taskData ? taskData.isCompleted : false
  );

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

  // Function to mark task as complete
  const markAsComplete = async () => {
    if (!taskData || !taskData.title) {
      console.error("No task data or task title available for updating.");
      return;
    }

    try {
      // Retrieve existing tasks
      const existingTasks = await AsyncStorage.getItem("taskData");
      let taskArray = existingTasks ? JSON.parse(existingTasks) : [];

      // Update the task's completion status
      taskArray = taskArray.map((task) =>
        task.title === taskData.title ? { ...task, isCompleted: true } : task
      );

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("taskData", JSON.stringify(taskArray));

      // Update the local state
      setIsCompleted(true);
      console.log("Task marked as complete");
    } catch (err) {
      console.log("Failed to update the task in AsyncStorage:", err);
    }
  };

  console.log(taskData.images);

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
      <ScrollView>
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
      </ScrollView>

      <View>
        <ScrollView
          horizontal
          style={styles.imageContainer}
          showsHorizontalScrollIndicator={false}
        >
          {taskData.images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </ScrollView>

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
              <Text style={styles.text}>
                {taskData ? taskData.dueDate : ""}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {!isCompleted ? (
        <Button
          title={"Mark as complete ✅"}
          onPress={markAsComplete} // Call the mark as complete function
        />
      ) : (
        <Button title={"Completed ✅"} style={{ backgroundColor: "#16c60c" }} />
      )}

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

      {/* {isCompleted && (
        <Text
          style={{
            textAlign: "right",
            fontWeight: "500",
            color: "green", // Or any color you prefer
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Completed ✅
        </Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
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
    marginVertical: 16,
  },
  seeMore: {
    color: COLORS.WHITE,
    fontWeight: "500",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default SpecTaskScreen;
