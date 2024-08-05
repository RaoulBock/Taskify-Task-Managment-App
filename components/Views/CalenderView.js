import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import Nav from "../Nav/Nav";
import { APP_ICONS } from "../../context/Settings";
import { AppContext } from "../../context/AppProvider";

const CalenderView = () => {
  const { dueDateData, setDueDateData } = React.useContext(AppContext);
  const [eventData, setEventData] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(moment());
  const [daysInMonth, setDaysInMonth] = React.useState([]);
  const [eventsByDate, setEventsByDate] = React.useState({});

  React.useEffect(() => {
    generateDaysInMonth();
  }, [selectedDate, eventData]);

  React.useEffect(() => {
    console.log("Selected date:", selectedDate.format("D MMM YY"));
    setDueDateData(selectedDate.format("D MMM YY"));
  }, [selectedDate]);

  const generateDaysInMonth = () => {
    const startOfMonth = selectedDate.clone().startOf("month");
    const endOfMonth = selectedDate.clone().endOf("month");
    const days = [];

    // Add empty slots for days of the previous month
    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push(null);
    }

    for (let date = startOfMonth; date <= endOfMonth; date.add(1, "days")) {
      days.push(date.clone());
    }

    setDaysInMonth(days);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day);
  };

  const handlePreviousMonth = () => {
    setSelectedDate(selectedDate.clone().subtract(1, "months"));
  };

  const handleNextMonth = () => {
    setSelectedDate(selectedDate.clone().add(1, "months"));
  };
  return (
    <>
      <Nav
        icon={APP_ICONS.LEFT}
        title={selectedDate.format("MMMM YYYY")}
        iconTwo={APP_ICONS.RIGHT}
        style={{ color: "#1d1d1d" }}
        onPress={handlePreviousMonth}
        onPressTwo={handleNextMonth}
      />

      <View style={styles.daysOfWeekContainer}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <Text key={index} style={styles.dayOfWeekText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarContainer}>
        {daysInMonth.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              day &&
                day.isSame(selectedDate, "day") &&
                styles.selectedDayContainer,
            ]}
            onPress={() => day && handleDayPress(day)}
            disabled={!day}
          >
            {day && (
              <>
                <Text
                  style={[
                    styles.dayText,
                    day.isSame(selectedDate, "day") && styles.selectedDayText,
                  ]}
                >
                  {day.date()}
                </Text>
                {eventsByDate[day.format("YYYY-MM-DD")] && (
                  <View style={styles.eventIndicator} />
                )}
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  outline: {
    padding: 16,
  },
  eventContainer: {
    flexDirection: "row",
    marginBottom: 50,
    alignItems: "flex-start", // Align items to the top
  },
  event_image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 7,
  },
  eventInfo: {
    flex: 1,
  },
  title: {
    color: "#111827",
    fontWeight: "300",
    fontSize: 18,
    flexWrap: "wrap", // Ensure text wraps properly
  },
  location: {
    color: "#6B7280",
    fontSize: 13,
    paddingVertical: 1,
    fontWeight: "500",
  },
  description: {
    color: "6B7280",
    fontSize: 12,
    fontWeight: "400",
    opacity: 0.6,
  },
  scrollView: {
    paddingBottom: 20,
  },
  specImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 20,
  },
  specTitle: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "600",
  },
  specDetails: {
    color: "#6B7280",
    fontSize: 16,
    marginBottom: 10,
  },
  specLocation: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 20,
  },
  horizontalImage: {
    width: 300,
    height: 150,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
    marginLeft: 20,
  },
  calendarHeader: {
    flexDirection: "row",

    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  monthYearText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },
  arrow: {
    fontSize: 18,
    color: "#111827",
  },
  daysOfWeekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dayOfWeekText: {
    width: "14%",
    textAlign: "center",
    fontWeight: "400",
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayContainer: {
    width: "14%",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedDayContainer: {
    backgroundColor: "#111827",
  },
  dayText: {
    fontSize: 14,
  },
  selectedDayText: {
    color: "#fff",
  },
  eventIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    marginTop: 5,
  },
});

export default CalenderView;
