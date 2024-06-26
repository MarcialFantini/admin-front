import { createSlice } from "@reduxjs/toolkit";
import { UserStateReducer } from "../../../../interfaces/usersInterfaces";
import {
  CreateUserThunk,
  deleteUsersThunk,
  GetUsersPageThunk,
  logInUserThunk,
} from "./actions";

const initialState: UserStateReducer = { list: [], isLogin: false, token: "" };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetUsersPageThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(CreateUserThunk.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload];
    });

    builder.addCase(deleteUsersThunk.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    });

    builder.addCase(logInUserThunk.fulfilled, (state, action) => {
      state.isLogin = true;
      state.token = action.payload;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const {} = usersSlice.actions;
