import React from "react";
import { StyleSheet, View } from "react-native";

const Models = ({ visible, onRequestClose, children, customHeight }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.overlay}></View>
      <View style={[styles.containerVIew, { height: customHeight }]}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerVIew: {
    backgroundColor: "white",
    bottom: 0,
    position: "absolute",
    width: "100%",
    height: "50%",
    zIndex: 2,
  },
  overlay: {
    backgroundColor: "#404040b8",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});

export default Models;
