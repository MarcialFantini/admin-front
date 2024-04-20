import { createSlice } from "@reduxjs/toolkit";
import {
  initialStateCategory,
  status,
} from "../../../../interfaces/categoryInterfaces";
import { createCategory, getCategory } from "./actions";

const initialState: initialStateCategory = {
  categories: [],
  status: status.normal,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state) => {
      state.status = status.pending;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.status = status.normal;
    });

    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.status = status.normal;
      state.categories = action.payload;
    });
  },
});

export const {} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
