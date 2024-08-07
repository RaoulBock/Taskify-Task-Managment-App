import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import Nav from "../Nav/Nav";
import { APP_ICONS } from "../../context/Settings";
import Input from "../Input/Input";
import TouchInput from "../Input/TouchInput";
import { AppContext } from "../../context/AppProvider";
import Models from "../Models/Models";
import CalenderView from "../Views/CalenderView";
import ClockVIew from "../Views/ClockVIew";

const { width, height } = Dimensions.get("window");

const CreateTaskScreen = () => {
  const {
    setCalenderVisable,
    calenderVisable,
    dueDateData,
    clockVisable,
    setClockVisable,
    clockData,
    setClockData,
  } = React.useContext(AppContext);

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
      />
      <View style={{ marginVertical: 18 }}>
        <View style={styles.formCtrl}>
          <Input
            title={"Title"}
            placeholder={"Enter task title"}
            placeholderTextColor={"#242424"}
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
            />
          </View>
          <View style={styles.formCtrl}>
            <TouchInput
              title={"Estimate task time"}
              style={{ width: width / 3 }}
              onPress={() => setClockVisable(true)}
              text={`${clockData} minutes`}
              icon={APP_ICONS.CLOCK}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 20,
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
