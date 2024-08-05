import { Ionicons, AntDesign } from "react-native-vector-icons";

export const APP_PAGES = {
  APP: {
    LOGIN: "LOGIN",
    HOME: "HOME",
    CREATE: "CREATE",
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
};
export const TASK_DATA = [
  {
    title: "Fora - Website",
    tag: "Website",
    description:
      "1. Lorem adipisicing est occaecat anim sint eu occaecat et minim nisi 2. sint. Laborum qui cillum ad et eu sint esse duis non consequat eu 3. ullamco cupidatat veniam. Qui tempor ad esse commodo anim quis labore.",
    dueDate: "August 5th 2024",
  },
];
