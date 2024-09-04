import React, { useState, useContext } from "react";
import { StyleSheet, Dimensions, View, Keyboard } from "react-native";
import Input from "../Input/Input";
import Nav from "../Nav/Nav";
import { APP_ICONS, COLORS, APP_PAGES } from "../../context/Settings";
import TouchInput from "../Input/TouchInput";
import { AppContext } from "../../context/AppProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const SpecEditTaskView = ({ taskData: data }) => {
  const { setSpecTaskEditVisable, setNavPage } = useContext(AppContext);
  const [titleTask, setTitleTask] = useState(data.title);
  const [descriptionTask, setDescriptionTask] = useState(data.description);
  const [dueDateTask, setDueDateTask] = useState(data.dueDate);

  const handleSaveEdit = async () => {
    Keyboard.dismiss();

    const updatedTask = {
      ...data,
      title: titleTask,
      description: descriptionTask,
      dueDate: dueDateTask,
    };

    try {
      // Retrieve existing tasks
      const existingTasks = await AsyncStorage.getItem("taskData");
      let taskArray = existingTasks ? JSON.parse(existingTasks) : [];

      // Find index of the task being edited
      const taskIndex = taskArray.findIndex((task) => task.id === data.id);

      if (taskIndex !== -1) {
        // Update the task at the found index
        taskArray[taskIndex] = updatedTask;

        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem("taskData", JSON.stringify(taskArray));

        setSpecTaskEditVisable(false);
        setNavPage(APP_PAGES.APP.HOME);
        console.log("Task successfully updated");
      } else {
        console.log("Task not found");
      }
    } catch (err) {
      console.log("Failed to save the updated data to AsyncStorage:", err);
    }
  };

  return (
    <View style={styles.outline}>
      <Nav
        title={"Edit your task"}
        icon={APP_ICONS.BACK}
        style={{ color: COLORS.MAIN_BACKGROUND }}
        iconTwo={APP_ICONS.SAVE}
        onPressTwo={handleSaveEdit}
        onPress={() => setSpecTaskEditVisable(false)}
      />
      <View style={styles.formCtrl}>
        <Input
          title={"Title"}
          value={titleTask}
          placeholderTextColor={"#242424"}
          styleTitle={{ color: COLORS.MAIN_BACKGROUND }}
          style={{ color: COLORS.MAIN_BACKGROUND }}
          onChangeText={setTitleTask}
        />
      </View>
      <View style={styles.formCtrl}>
        <Input
          title={"Description"}
          value={descriptionTask}
          placeholderTextColor={"#242424"}
          styleTitle={{ color: COLORS.MAIN_BACKGROUND }}
          multiline
          numberOfLines={4}
          style={{ color: COLORS.MAIN_BACKGROUND }}
          onChangeText={setDescriptionTask}
        />
      </View>
      <View style={styles.formCtrl}>
        <TouchInput
          title={"Due date"}
          style={{ width: width / 2 }}
          text={dueDateTask}
          icon={APP_ICONS.CALENDER}
          styleTitle={{ color: COLORS.MAIN_BACKGROUND }}
          styleText={{ color: COLORS.MAIN_BACKGROUND }}
          onPress={() => {
            /* Show date picker here and update `setDueDateTask` */
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formCtrl: {
    marginTop: 10,
  },
});

export default SpecEditTaskView;
