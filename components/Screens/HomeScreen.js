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
import { APP_ICONS, TASK_DATA } from "../../context/Settings";
import moment from "moment";
import Card from "../Card/Card";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const currentDate = moment().format("MMMM Do YYYY");

  return (
    <View style={styles.outline}>
      <Nav
        title={"Home"}
        icon={APP_ICONS.CALENDER}
        iconTwo={APP_ICONS.CREATE}
      />
      <View>
        <View>
          <Text style={styles.dateText}>{currentDate}</Text>
          {TASK_DATA.map((e, i) => {
            return (
              <Card
                key={i}
                title={e.title}
                tag={e.tag}
                description={e.description}
                dueDate={e.dueDate}
              />
            );
          })}
        </View>
        <View>
          <Text style={styles.dateText}>Due this week</Text>
          <ScrollView horizontal style={{ width: "100%" }}>
            {/* <Card width={width / 2} /> */}
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
