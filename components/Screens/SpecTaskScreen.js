import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../../context/AppProvider";
import Nav from "../Nav/Nav";
import { APP_ICONS, APP_PAGES, COLORS } from "../../context/Settings";
import Button from "../Button/Button";

const SpecTaskScreen = () => {
  const { specTaskData: taskData, setNavPage } = React.useContext(AppContext);

  const [showFullText, setShowFullText] = React.useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const renderDescription = () => {
    if (taskData.description.length <= 80 || showFullText) {
      return taskData.description;
    }
    return `${taskData.description.slice(0, 80)}...`;
  };

  console.log(taskData);
  return (
    <View style={styles.outline}>
      <Nav
        title={taskData.title}
        icon={APP_ICONS.BACK}
        iconTwo={APP_ICONS.PENCIL}
        onPress={() => setNavPage(APP_PAGES.APP.HOME)}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.taskDescription}>{renderDescription()}</Text>
        {taskData.description.length > 50 && (
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
            <Text style={[styles.text, styles.assigedTo]}>Assiged to</Text>
            <Text style={styles.text}>Me</Text>
          </View>
        </View>
        <View style={styles.grid}>
          <Text>{APP_ICONS.CALENDER}</Text>
          <View>
            <Text style={[styles.text, styles.assigedTo]}>Due date</Text>
            <Text style={styles.text}>{taskData.dueDate}</Text>
          </View>
        </View>
      </View>
      <Button
        title={"Add a subtask ✏️"}
        style={{
          backgroundColor: COLORS.MAIN_BACKGROUND,
          borderWidth: 1,
          borderColor: COLORS.WHITE,
          marginBottom: 16,
        }}
        styleText={{ color: COLORS.WHITE }}
      />
      <Button title={"Mark as complete ✅"} />
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
