import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ProductFormInterface,
  ProductItemList,
  ProductResponseGetInterface,
} from "../../../../interfaces/productInterfaces";

import { intense } from "@/utils/intanseAxios";

export const createProductThunk = createAsyncThunk(
  "create-product/thunk",
  async (
    { product, token }: { product: ProductFormInterface; token: string },
    thunk
  ) => {
    try {
      const response = await intense.post("products/create", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }

      const productCreated = response.data as ProductItemList;

      return thunk.fulfillWithValue(productCreated);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const getProductsThunk = createAsyncThunk(
  "get-product/thunk",
  async (option: { page: number; offset: number; token: string }, thunk) => {
    try {
      console.log({ Authorization: `Bearer ${option.token}` });
      const response = await intense(
        `products/page/${option.page}/offset/${option.offset}`,
        {
          headers: {
            Authorization: `Bearer ${option.token}`,
          },
        }
      );
      console.log(response);
      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const products = response.data as ProductResponseGetInterface;

      return thunk.fulfillWithValue(products.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const delProductsThunk = createAsyncThunk(
  "delete-product/thunk",
  async ({ token, idProduct }: { idProduct: string; token: string }, thunk) => {
    try {
      const response = await intense.delete(`products/delete/${idProduct}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      return thunk.fulfillWithValue(idProduct);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const getProductsLikeThunk = createAsyncThunk(
  "get-products-like/admin",
  async ({ name, token }: { token: string; name: string }, thunk) => {
    try {
      const response = await intense("products/like/" + name, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const products = response.data as ProductResponseGetInterface;

      return thunk.fulfillWithValue(products.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
