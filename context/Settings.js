import { Ionicons, AntDesign } from "react-native-vector-icons";

export const APP_PAGES = {
  APP: {
    LOGIN: "LOGIN",
    HOME: "HOME",
  },
};

export const APP_ICONS = {
  BACK: (
    <Ionicons
      name={"arrow-back-outline"}
      style={{ color: "#fff", fontSize: 20 }}
    />
  ),
  EYE: (
    <Ionicons name={"eye-outline"} style={{ color: "#fff", fontSize: 20 }} />
  ),
  NOTIFICATION: (
    <Ionicons
      name={"notifications-outline"}
      style={{ color: "#fff", fontSize: 20 }}
    />
  ),
  PROFILE: (
    <Ionicons name={"person-outline"} style={{ color: "#fff", fontSize: 20 }} />
  ),
  CALENDER: (
    <Ionicons
      name={"calendar-number-outline"}
      style={{ color: "#fff", fontSize: 20 }}
    />
  ),
  CREATE: (
    <Ionicons
      name={"duplicate-outline"}
      style={{ color: "#fff", fontSize: 20 }}
    />
  ),
  HOME: (
    <Ionicons
      name={"home-outline"}
      style={{ color: "#fff", fontSize: 20 }}
    />
  ),
};
