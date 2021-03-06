import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./store/AuthContextProvider";
import App from "./App";

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
