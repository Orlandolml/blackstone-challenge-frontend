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
import { removeTodos } from "./redux/todosSlice";

const { Content } = Layout;

function App() {
  const dispatch = useAppDispatch();

  const isAuthChecked = useAppSelector((state) => state.app.authChecked);

  useEffect(() => {
    let token = document.cookie.split(';').filter((cookie) => cookie.includes('token'))[0];

    if (token) {
      const key = token.indexOf('=') + 1;

      APIClient.setAuthenticatedInstance(token.substring(key));
      dispatch(setAuthChecked(true));
    } else {
      dispatch(removeUser());
      dispatch(removeTodos());
    }
  }, []);

  return (
    <div className="app-container">
      <Header
        onExtraButtonPress={() => {
          APIClient.unsetAuthenticatedInstance();
          dispatch(setAuthChecked(false));
          dispatch(removeUser());
          dispatch(removeTodos());
        }}
        showExtraButton={isAuthChecked}
      ></Header>
      <Content>{isAuthChecked ? <Main /> : <Login />}</Content>
    </div>
  );
}

export default App;
