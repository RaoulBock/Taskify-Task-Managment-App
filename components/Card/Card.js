import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import moment from "moment";

const Card = ({ width, title, tag, description, dueDate }) => {
  return (
    <View style={[styles.outline, { width: width }]}>
      <View style={styles.grid}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tag}>{tag}</Text>
      </View>
      <View>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.dueDate}>Due Date:</Text>
        <Text style={styles.date}>{dueDate}</Text>
      </View>
    </View>
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
