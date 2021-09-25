import { Layout } from "antd";
import React, { useEffect } from "react";
import "./App.css";
import Login from "./screens/login";
import Main from "./components/main";
import Header from "./components/header";
import APIClient from "./modules/APIClient";

import { setAuthChecked } from "./redux/appSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { removeUser } from "./redux/userSlice";

const { Content } = Layout;

function App() {
  const dispatch = useAppDispatch();

  const isAuthChecked = useAppSelector((state) => state.app.authChecked);

  useEffect(() => {
    let localStorageToken = localStorage.getItem("token");

    if (localStorageToken) {
      APIClient.setAuthenticatedInstance(localStorageToken);
      dispatch(setAuthChecked(true));
    } else {
      dispatch(removeUser());
    }
  }, []);

  return (
    <div className="app-container">
      <Header
        onExtraButtonPress={() => {
          APIClient.unsetAuthenticatedInstance();
          dispatch(setAuthChecked(false));
          dispatch(removeUser());
        }}
        showExtraButton={isAuthChecked}
      ></Header>
      <Content>{isAuthChecked ? <Main /> : <Login />}</Content>
    </div>
  );
}

export default App;
