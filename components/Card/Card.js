import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import moment from "moment";

const Card = ({ width, style }) => {
  const currentDate = moment().format("MMMM Do YYYY");

  return (
    <View style={[styles.outline, { width: width }]}>
      <View style={styles.grid}>
        <Text style={styles.title}>Fora - Website</Text>
        <Text style={styles.tag}>Website</Text>
      </View>
      <View>
        <Text style={styles.description}>
          1. Lorem adipisicing est occaecat anim sint eu occaecat et minim nisi
          2. sint. Laborum qui cillum ad et eu sint esse duis non consequat eu
          3. ullamco cupidatat veniam. Qui tempor ad esse commodo anim quis
          labore.
        </Text>
        <Text style={styles.dueDate}>Due Date:</Text>
        <Text style={styles.date}>{currentDate}</Text>
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
