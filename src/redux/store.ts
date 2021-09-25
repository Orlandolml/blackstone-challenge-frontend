import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import userReducer from "./userSlice";
import todosReducer from "./todosSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
