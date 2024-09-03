import { Ionicons, AntDesign } from "react-native-vector-icons";

export const APP_PAGES = {
  APP: {
    LOGIN: "LOGIN",
    HOME: "HOME",
    CREATE: "CREATE",
    SPECTASK: "SPECTASK",
  },
};

export const COLORS = {
  MAIN_BACKGROUND: "#1B1B1B",
  BACKGROUND: "#313131",
  BLUE: "#b5cff8",
  WHITE: "#fff",
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
    <Ionicons name={"home-outline"} style={{ color: "#fff", fontSize: 20 }} />
  ),
  SAVE: (
    <Ionicons
      name={"checkmark-outline"}
      style={{ color: "#fff", fontSize: 20 }}
    />
  ),
  LEFT: (
    <Ionicons
      name={"chevron-back-outline"}
      style={{ color: "#fff", fontSize: 20 }}
    />
  ),
  RIGHT: (
    <Ionicons
      name={"chevron-forward-outline"}
      style={{ color: "#fff", fontSize: 20 }}
    />
  ),
  CLOCK: (
    <Ionicons name={"alarm-outline"} style={{ color: "#fff", fontSize: 20 }} />
  ),
  PENCIL: (
    <Ionicons name={"pencil-outline"} style={{ color: "#fff", fontSize: 20 }} />
  ),
};
