import React from "react";
import { APP_PAGES } from "./Settings";

export const AppContext = React.createContext({
  navPage: "",
  setNavPage: (val) => {},
  loggedInUser: null,
  setLoggedInUser: (val) => {},
});

const AppProvider = ({ children }) => {
  const [navPage, setNavPage] = React.useState(APP_PAGES.APP.HOME);
  const [loggedInUser, setLoggedInUser] = React.useState();
  const [calenderVisable, setCalenderVisable] = React.useState(false);
  const [dueDateData, setDueDateData] = React.useState();
  const [clockVisable, setClockVisable] = React.useState(false);
  const [clockData, setClockData] = React.useState("");
  const [priorityData, setPropertyData] = React.useState();
  const [taskLocalData, setTaskLocalData] = React.useState([]);
  const [specTaskData, setSpecTaskData] = React.useState();
  const [specTaskEditVisable, setSpecTaskEditVisable] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        navPage,
        setNavPage,
        loggedInUser,
        setLoggedInUser,
        calenderVisable,
        setCalenderVisable,
        dueDateData,
        setDueDateData,
        clockVisable,
        setClockVisable,
        clockData,
        setClockData,
        priorityData,
        setPropertyData,
        taskLocalData,
        setTaskLocalData,
        specTaskData,
        setSpecTaskData,
        specTaskEditVisable,
        setSpecTaskEditVisable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
