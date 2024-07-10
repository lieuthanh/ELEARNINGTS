import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./redux/spinnerSlice";
import modalSlice from "./redux/modalSlice";
import navigateSlice from "./redux/navigateSlice";
import courseSlice from "./redux/courseSlice";
import userSlice from "./redux/userSlice";
import { Provider } from "react-redux";

export let store = configureStore({
  reducer: {
    spinnerSlice,
    navigateSlice,
    courseSlice,
    userSlice,
    modalSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
