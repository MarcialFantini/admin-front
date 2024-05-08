import { createSlice } from "@reduxjs/toolkit";
import { PlaceStateInterface } from "../../../../interfaces/placeInterfaces";
import { createPlaceThunk, deletePlaceThunk, getPlaceThunk } from "./actions";

const initialState: PlaceStateInterface = {
  list: [],
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPlaceThunk.fulfilled, (state, action) => {});
    builder.addCase(getPlaceThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(deletePlaceThunk.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.meta.arg.id);
    });
  },
});

export const {} = placeSlice.actions;
export const placeReducer = placeSlice.reducer;
