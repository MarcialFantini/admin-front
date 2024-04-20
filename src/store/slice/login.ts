import { createSlice } from "@reduxjs/toolkit";

interface LoginInterface {
  isLogin: boolean;
}

const initialState: LoginInterface = {
  isLogin: true,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
});

export const loginReducer = loginSlice.reducer;
export const {} = loginSlice.actions;
