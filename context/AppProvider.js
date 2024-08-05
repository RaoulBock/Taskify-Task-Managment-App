import React from "react";
import { APP_PAGES } from "./Settings";

export const AppContext = React.createContext({
  navPage: "",
  setNavPage: (val) => {},
  loggedInUser: null,
  setLoggedInUser: (val) => {},
});

const AppProvider = ({ children }) => {
  const [navPage, setNavPage] = React.useState(APP_PAGES.APP.CREATE);
  const [loggedInUser, setLoggedInUser] = React.useState();
  const [calenderVisable, setCalenderVisable] = React.useState(false);
  const [dueDateData, setDueDateData] = React.useState();

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
