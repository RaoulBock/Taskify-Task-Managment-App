// Card.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../../context/AppProvider";

const Card = ({
  width,
  title,
  priority,
  description,
  dueDate,
  style,
  onPress,
  isCompleted,
}) => {
  return (
    <TouchableOpacity
      style={[styles.outline, style, { width: width }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.grid}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.tag}>{priority}</Text>
      </View>
      <View>
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
        <Text style={styles.dueDate}>Due Date:</Text>
        <Text style={styles.date}>{dueDate}</Text>
        {isCompleted && (
          <Text
            style={{
              textAlign: "right",
              fontWeight: "700",
              color: "#1d1d1d", // Or any color you prefer
            }}
          >
            Completed ✅
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outline: {
    backgroundColor: "#5bdf68",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    color: "#1d1d1d",
    fontWeight: "700",
    fontSize: 14,
    flex: 1,
  },
  tag: {
    backgroundColor: "#1d1d1d",
    paddingVertical: 6,
    paddingHorizontal: 10,
    textAlign: "center",
    color: "#5bdf68",
    borderRadius: 50,
    fontSize: 12,
  },
  grid: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    marginVertical: 10,
    color: "#1d1d1d",
    fontSize: 13,
  },
  dueDate: {
    color: "#1d1d1d",
    fontWeight: "500",
    fontSize: 12,
  },
  date: {
    fontWeight: "600",
    fontSize: 18,
  },
});

export default Card;
