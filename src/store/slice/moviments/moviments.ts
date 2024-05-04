import { createSlice } from "@reduxjs/toolkit";
import { MovementsReducer } from "../../../../interfaces/movimentsInterfaces";
import { movementsRowGet } from "./actions";

const initialState: MovementsReducer = {
  list: [],
};

export const movementsSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(movementsRowGet.fulfilled, (state, action) => {
      console.log(action.payload);
      state.list = action.payload;
    });
  },
});

export const {} = movementsSlice.actions;

export const movementsReducer = movementsSlice.reducer;
