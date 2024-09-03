import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Input from "../Input/Input";
import Nav from "../Nav/Nav";
import { APP_ICONS, COLORS } from "../../context/Settings";
import TouchInput from "../Input/TouchInput";
import PriorityCard from "../Card/PriorityCard";

const { width, height } = Dimensions.get("window");

const SpecEditTaskView = ({ taskData: data }) => {
  console.log(data);
  const PRIORITY_LEVEL = ["Low", "Medium", "High"];
  return (
    <View style={styles.outline}>
      <Nav
        title={"Edit your task"}
        icon={APP_ICONS.BACK}
        style={{ color: COLORS.MAIN_BACKGROUND }}
        iconTwo={APP_ICONS.SAVE}
      />
      <View style={styles.formCtrl}>
        <Input
          title={"Title"}
          placeholder={data.title}
          placeholderTextColor={"#242424"}
          styleTitle={{ color: COLORS.MAIN_BACKGROUND }}
        />
      </View>
      <View style={styles.formCtrl}>
        <Input
          title={"Desciprion"}
          placeholder={data.description}
          placeholderTextColor={"#242424"}
          styleTitle={{ color: COLORS.MAIN_BACKGROUND }}
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.formCtrl}>
        <TouchInput
          title={"Due date"}
          style={{ width: width / 2 }}
          text={data.dueDate}
          icon={APP_ICONS.CALENDER}
          styleTitle={{ color: COLORS.MAIN_BACKGROUND }}
          styleText={{ color: COLORS.MAIN_BACKGROUND }}
        />
      </View>
      <View>
        <PriorityCard
          title={"Priority"}
          data={PRIORITY_LEVEL}
          styleTitle={COLORS.MAIN_BACKGROUND}
          styleText={COLORS.MAIN_BACKGROUND}
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
