import React from "react";

const AuthContext = React.createContext({
  token: "",
  loggedIn: false,
  signin: (authToken, id, docId) => {},
  login: (authToken, id) => {
    return [];
  },
  logout: () => {},
  username: "",
});

//wrapper component

export default AuthContext;
