import React from "react";
import { APP_PAGES } from "./Settings";

export const AppContext = React.createContext({
  navPage: "",
  setNavPage: (val) => {},
  loggedInUser: null,
  setLoggedInUser: (val) => {},
});

const AppProvider = ({ children }) => {
  const [navPage, setNavPage] = React.useState(APP_PAGES.APP.LOGIN);
  const [loggedInUser, setLoggedInUser] = React.useState();

  return (
    <AppContext.Provider
      value={{ navPage, setNavPage, loggedInUser, setLoggedInUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
