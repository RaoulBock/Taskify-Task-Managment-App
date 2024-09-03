import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import Nav from "../Nav/Nav";
import { APP_ICONS, APP_PAGES } from "../../context/Settings";
import moment from "moment";
import Card from "../Card/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppProvider";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const { taskLocalData, setTaskLocalData, setNavPage } =
    React.useContext(AppContext);

  React.useEffect(() => {
    const getDataFromLocalStorage = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("taskData");

        if (jsonData !== null) {
          const data = JSON.parse(jsonData);
          setTaskLocalData(data);
        } else {
          console.log("No data found in local storage");
        }
      } catch (err) {
        console.log(`Failed to get data from local storage ${err}`);
      }
    };

    getDataFromLocalStorage();
  }, []);

  const currentDate = moment().format("MMMM Do YYYY");
  const todayDate = moment().format("DD MMM");
  const filteredDataDueToday = taskLocalData.filter(
    (e) => e.dueDate === todayDate
  );

  const today = moment();
  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");
  const dates = [];

  for (let day = startOfMonth; day <= endOfMonth; day.add(1, "days")) {
    dates.push({
      day: day.format("ddd"), // Day of the week (e.g., 'Mon')
      date: day.format("DD MMM"), // Date in 'DD MMM' format (e.g., '04 Sep')
    });
  }

  return (
    <View style={styles.outline}>
      <Nav
        title={"Home"}
        icon={APP_ICONS.CALENDER}
        iconTwo={APP_ICONS.CREATE}
        onPressTwo={() => setNavPage(APP_PAGES.APP.CREATE)}
      />

      <View>
        {/* <Text style={styles.dateText}>Manage your tasks 🗓️</Text> */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateList}
        >
          {dates.map((item, index) => (
            <View
              key={index}
              style={[
                styles.dateItem,
                item.date === todayDate && styles.currentDate,
              ]}
            >
              <Text
                style={[
                  styles.day,
                  item.date === todayDate && styles.currentDateText,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.date,
                  item.date === todayDate && styles.currentDateText,
                ]}
              >
                {item.date}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View>
        {/* <Text style={styles.tasksHeader}>Tasks for Today</Text> */}
        <ScrollView>
          {filteredDataDueToday.length > 0 ? (
            filteredDataDueToday.map((e, i) => (
              <Card
                key={i}
                title={e.title}
                description={e.description}
                priority={e.priority}
                dueDate={e.dueDate}
                style={{ backgroundColor: e.color, marginBottom: 10 }}
              />
            ))
          ) : (
            <Text style={styles.noTasks}>No tasks for today!</Text>
          )}
        </ScrollView>
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
    fontSize: 46,
    marginTop: 16,
  },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateItem: {
    alignItems: "center",
    marginRight: 20,
    padding: 10,
    borderRadius: 5,
  },
  day: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  currentDate: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  currentDateText: {
    color: "black", // Text color when the background is white
  },
  dateList: {
    marginVertical: 16,
  },
  tasksHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  noTasks: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default HomeScreen;
