import { createSlice } from "@reduxjs/toolkit";
import {
  initialStateCategory,
  status,
} from "../../../../interfaces/categoryInterfaces";
import { createCategory, deletedCategory, getCategory } from "./actions";

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

    builder.addCase(deletedCategory.fulfilled, (state, action) => {
      console.log(
        "filter ",
        state.categories.filter(
          (categories) => categories.id !== action.payload
        )
      );
      state.status = status.normal;
      state.categories = state.categories.filter(
        (categories) => categories.id !== action.payload
      );
    });
  },
});

export const {} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
