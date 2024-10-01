import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Dimensions,
  Keyboard,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Nav from "../Nav/Nav";
import { APP_ICONS, APP_PAGES } from "../../context/Settings";
import Input from "../Input/Input";
import TouchInput from "../Input/TouchInput";
import { AppContext } from "../../context/AppProvider";
import Models from "../Models/Models";
import CalenderView from "../Views/CalenderView";
import ClockVIew from "../Views/ClockVIew";
import PriorityCard from "../Card/PriorityCard";
import { getRandomSoftColor } from "../../utils/helpers";
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
  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleImagePicker = async () => {
    const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
    const galleryPermission =
      await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!cameraPermission.granted || !galleryPermission.granted) {
      Alert.alert(
        "Permission needed",
        "We need your permission to access camera and gallery."
      );
      return false;
    }

    Alert.alert("Select Image", "Choose an option to select an image", [
      {
        text: "Camera",
        onPress: async () => {
          try {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.cancelled) {
              setSelectedImages((prevImages) => [
                ...prevImages,
                result.assets[0].uri,
              ]);
            }
          } catch (error) {
            Alert.alert("Error", "Failed to pick an image");
          }
        },
      },
      {
        text: "Gallery",
        onPress: async () => {
          try {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.cancelled) {
              setSelectedImages((prevImages) => [
                ...prevImages,
                result.assets[0].uri,
              ]);
            }
          } catch (error) {
            Alert.alert("Error", "Failed to pick an image");
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    let isValid = true;

    // Validation code...

    if (isValid) {
      const newTask = {
        title: titleTask,
        description: descriptionTask,
        dueDate: dueDateData,
        estimatedTime: clockData,
        priority: priorityData,
        color: getRandomSoftColor(),
        isCompleted: false,
        //images: selectedImages,
      };

      try {
        const existingTasks = await AsyncStorage.getItem("taskData");
        let taskArray = existingTasks ? JSON.parse(existingTasks) : [];
        taskArray.push(newTask);
        await AsyncStorage.setItem("taskData", JSON.stringify(taskArray));

        setNavPage(APP_PAGES.APP.HOME);
        console.log("Data successfully saved");
      } catch (error) {
        Alert.alert("Error", "Failed to save the task");
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
            title={"Description"}
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
          {/* <View style={styles.formCtrl}>
            <TouchInput
              title={"Images"}
              style={{ width: width / 2.5 }}
              icon={APP_ICONS.CAMERA}
              onPress={handleImagePicker}
            />
          </View> */}
        </View>
        <View>
          <PriorityCard
            title={"Priority"}
            data={PRIORITY_LEVEL}
            error={priorityDataTaskError}
          />
        </View>
        <ScrollView
          horizontal
          style={styles.imageContainer}
          showsHorizontalScrollIndicator={false}
        >
          {selectedImages.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </ScrollView>
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
  imageContainer: {
    marginTop: 20,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default CreateTaskScreen;
