import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../shared/types";
import APIClient from "../modules/APIClient";
import { message } from "antd";

interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialState = { user: null, isLoading: false } as UserState;

const signup = createAsyncThunk(
  "user/signup",
  async (userData: User, thunkApi) => {
    try {
      const response = await APIClient.signup(userData);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const login = createAsyncThunk(
  "user/login",
  async (userData: User, thunkApi) => {
    try {
      const response = await APIClient.login(userData);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export { signup, login };
export default userSlice.reducer;
