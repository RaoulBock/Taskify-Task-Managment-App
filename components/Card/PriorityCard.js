import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/AppProvider";

const PriorityCard = ({ title, style, data, error }) => {
  const { priorityData, setPropertyData } = React.useContext(AppContext);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {data && (
        <View style={[styles.outline]}>
          {data.map((e, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.touchInput,
                  style,
                  priorityData === e && styles.isActive,
                ]}
                onPress={() => setPropertyData(e)}
                key={i}
              >
                <Text style={styles.text}>{e}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    marginBottom: 10,
    fontWeight: "200",
  },
  touchInput: {
    borderColor: "#242424",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: "#fff",
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
  },
  isActive: {
    backgroundColor: "#242424",
  },
  inputError: {
    borderColor: "red", // Red border for error state
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default PriorityCard;
