import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Nav from "../Nav/Nav";
import { APP_ICONS, APP_PAGES, TASK_DATA } from "../../context/Settings";
import moment from "moment";
import Card from "../Card/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppProvider";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const { taskLocalData, setTaskLocalData, setNavPage } =
    React.useContext(AppContext);

  console.log(taskLocalData);

  React.useEffect(() => {
    const getDataFromLocalStorage = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("taskData");

        if (jsonData !== null) {
          const data = JSON.parse(jsonData);
          setTaskLocalData(data);
        } else {
          console.log("No data found in local storage");
          return;
        }
      } catch (err) {
        console.log(`Failed to get data from local storage ${err}`);
      }
    };

    getDataFromLocalStorage();
  }, []);

  // Get the start and end of the current week
  const startOfWeek = moment().startOf("week").format("MMMM Do YYYY");
  const endOfWeek = moment().endOf("week").format("MMMM Do YYYY");
  const currentDate = moment().format("MMMM Do YYYY");
  const filteredDataDueToday = taskLocalData.filter(
    (e) => e.dueDate === currentDate
  );
  const filteredDataDueThisWeek = taskLocalData.filter((e) => {
    const taskDate = moment(e.dueDate).format("MMMM Do YYYY");
    return moment(taskDate, "MMMM Do YYYY").isBetween(
      startOfWeek,
      endOfWeek,
      null,
      "[]"
    );
  });

  return (
    <View style={styles.outline}>
      <Nav
        title={"Home"}
        icon={APP_ICONS.CALENDER}
        iconTwo={APP_ICONS.CREATE}
        onPressTwo={() => setNavPage(APP_PAGES.APP.CREATE)}
      />
      <View>
        <View>
          <Text style={styles.dateText}>Due today</Text>
          <ScrollView horizontal style={{ width: "100%" }}>
            {filteredDataDueToday.map((e, i) => (
              <Card
                key={i}
                title={e.title}
                description={e.description}
                priority={e.priority}
                dueDate={e.dueDate}
                style={{ marginRight: 10, backgroundColor: e.color }}
                width={width / 2}
              />
            ))}
          </ScrollView>
        </View>
        <View>
          <Text style={styles.dateText}>All tasks</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {taskLocalData.map((e, i) => (
              <Card
                key={i}
                title={e.title}
                description={e.description}
                priority={e.priority}
                dueDate={e.dueDate}
                style={{ marginRight: 10, backgroundColor: e.color }}
                width={width / 2}
              />
            ))}
          </ScrollView>
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
  dateText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 20,
  },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
