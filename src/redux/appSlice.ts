import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import APIClient from "../modules/APIClient";

interface AppState {
  authChecked: boolean;
}

const initialState = { authChecked: false } as AppState;

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAuthChecked(state, action) {
      state.authChecked = action.payload;
    },
  },
});

export const { setAuthChecked } = appSlice.actions;
export default appSlice.reducer;
