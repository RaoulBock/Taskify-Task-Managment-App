import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Dimensions,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Nav from "../Nav/Nav";
import { APP_ICONS, APP_PAGES } from "../../context/Settings";
import Input from "../Input/Input";
import TouchInput from "../Input/TouchInput";
import { AppContext } from "../../context/AppProvider";
import Models from "../Models/Models";
import CalenderView from "../Views/CalenderView";
import ClockVIew from "../Views/ClockVIew";
import PriorityCard from "../Card/PriorityCard";
import { getRandomColor } from "../../utils/helpers";
import Button from "../Button/Button";

const { width, height } = Dimensions.get("window");

const CreateTaskScreen = () => {
  const {
    setCalenderVisable,
    calenderVisable,
    dueDateData,
    clockVisable,
    setClockVisable,
    clockData,
    setDueDateData,
    priorityData,
    setPropertyData,
    setClockData,
    setNavPage,
  } = React.useContext(AppContext);
  const PRIORITY_LEVEL = ["Low", "Medium", "High"];
  const [titleTask, setTitleTask] = React.useState("");
  const [titleTaskError, setTitleTaskError] = React.useState("");
  const [descriptionTask, setDescriptionTask] = React.useState("");
  const [descriptionTaskError, setDescriptionTaskError] = React.useState("");
  const [dueDateTaskError, setDueDateTaskError] = React.useState("");
  const [clockDataTaskError, setClockDataTaskError] = React.useState("");
  const [priorityDataTaskError, setPriorityDataTaskError] = React.useState("");

  const handleSave = async () => {
    console.log("Waiting");
    let isValid = true;
    Keyboard.dismiss();

    if (!titleTask) {
      setTitleTaskError("Title is required");
      isValid = false;
    } else {
      setTitleTaskError("");
    }

    if (!descriptionTask) {
      setDescriptionTaskError("Description is required");
      isValid = false;
    } else {
      setDescriptionTaskError("");
    }

    if (!dueDateData) {
      setDueDateTaskError("Due date is required");
      isValid = false;
    } else {
      setDueDateTaskError("");
    }

    // if (!clockData) {
    //   setClockDataTaskError("Estimate time is required");
    //   isValid = false;
    // } else {
    //   setClockDataTaskError("");
    // }

    if (!priorityData) {
      setPriorityDataTaskError("Estimate time is required");
      isValid = false;
    } else {
      setPriorityDataTaskError("");
    }

    if (isValid) {
      const newTask = {
        title: titleTask,
        description: descriptionTask,
        dueDate: dueDateData,
        estimatedTime: clockData,
        priority: priorityData,
        color: getRandomColor(),
        isCompleted: false,
      };

      try {
        // Retrieve existing tasks
        const existingTasks = await AsyncStorage.getItem("taskData");
        let taskArray = existingTasks ? JSON.parse(existingTasks) : [];

        // Add the new task to the array
        taskArray.push(newTask);

        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem("taskData", JSON.stringify(taskArray));

        setNavPage(APP_PAGES.APP.HOME);
        console.log("Data successfully saved");
      } catch (err) {
        console.log("Failed to save the data to AsyncStorage:", err);
      }
    }
  };

  return (
    <View style={styles.outline}>
      {calenderVisable && (
        <Models
          visible={calenderVisable}
          onClose={setCalenderVisable}
          children={<CalenderView />}
        />
      )}
      {clockVisable && (
        <Models
          visible={clockVisable}
          onClose={setClockVisable}
          children={<ClockVIew />}
          customHeight={height * 0.85}
        />
      )}
      <Nav
        icon={APP_ICONS.BACK}
        title={"Create new task"}
        iconTwo={APP_ICONS.SAVE}
        onPressTwo={handleSave}
        onPress={() => setNavPage(APP_PAGES.APP.HOME)}
      />
      <View style={{ marginVertical: 18 }}>
        <View style={styles.formCtrl}>
          <Input
            title={"Title"}
            placeholder={"Enter task title"}
            placeholderTextColor={"#242424"}
            error={titleTaskError}
            onChangeText={(e) => setTitleTask(e)}
          />
        </View>
        <View style={styles.formCtrl}>
          <Input
            title={"Desciprion"}
            placeholder={"Enter task description"}
            placeholderTextColor={"#242424"}
            multiline
            numberOfLines={4}
            style={{ textAlignVertical: "top" }}
            error={descriptionTaskError}
            onChangeText={(e) => setDescriptionTask(e)}
          />
        </View>
        <View style={styles.grid}>
          <View style={styles.formCtrl}>
            <TouchInput
              title={"Due date"}
              style={{ width: width / 2 }}
              onPress={() => setCalenderVisable(true)}
              text={dueDateData}
              icon={APP_ICONS.CALENDER}
              error={dueDateTaskError}
            />
          </View>
          <View style={styles.formCtrl}>
            <TouchInput
              title={"Images"}
              style={{ width: width / 2.5 }}
              icon={APP_ICONS.CAMERA}
            />
          </View>
        </View>
        <View>
          <PriorityCard
            title={"Priority"}
            data={PRIORITY_LEVEL}
            error={priorityDataTaskError}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
    flex: 1,
  },
  formCtrl: {
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CreateTaskScreen;
