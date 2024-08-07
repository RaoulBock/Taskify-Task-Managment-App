import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../../context/AppProvider";

const { width, height } = Dimensions.get("window");

const ClockVIew = () => {
  const { setClockData, clockData } = React.useContext(AppContext);
  const num = [...Array(61).keys()].filter((e) => e !== 0);
  const [activeNum, setActiveNum] = React.useState(clockData);
  const [activeBtn, setActiveBtn] = React.useState("/ min");
  return (
    <View style={styles.outline}>
      <View style={styles.grid}>
        {num.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[styles.numBtn, activeNum === e && styles.activeNumBtn]}
              onPress={() => {
                setActiveNum(e);
                setClockData(e);
              }}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.numBtnText,
                  activeNum === e && styles.activeNumBtnText,
                ]}
              >
                {e}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  numBtn: {
    marginHorizontal: 20,
    padding: 10,
    width: "14%",
    alignItems: "center",
    borderRadius: 5,
  },
  numBtnText: {
    color: "#1d1d1d",
    fontWeight: "500",
    fontSize: 16,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  btnText: {
    color: "#1d1d1d",
    fontWeight: "500",
    fontSize: 16,
  },
  activeNumBtn: {
    backgroundColor: "#111827",
  },
  activeNumBtnText: {
    color: "white",
  },
  activeBtn: {
    backgroundColor: "#111827",
  },
  activeBtnText: {
    color: "white",
  },
  btn: {
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
});

export default ClockVIew;
