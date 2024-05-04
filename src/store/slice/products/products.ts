import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProductsRedux } from "../../../../interfaces/productInterfaces";
import {
  createProductThunk,
  delProductsThunk,
  getProductsLikeThunk,
  getProductsThunk,
} from "./actions";

const initialState: InitialStateProductsRedux = {
  list: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    lessCustom: (
      state,
      action: PayloadAction<{ idProduct: string; amount: number }>
    ) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.idProduct
      );

      if (index) {
        return;
      }

      state.list[index].stock = action.payload.amount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProductThunk.fulfilled, (state, action) => {});

    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(delProductsThunk.fulfilled, (state, action) => {
      state.list = state.list.filter((state) => state.id !== action.payload);
    });

    builder.addCase(getProductsLikeThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
export const { lessCustom } = productSlice.actions;
