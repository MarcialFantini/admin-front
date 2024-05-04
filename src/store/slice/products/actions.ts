import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ProductFormInterface,
  ProductItemList,
  ProductResponseGetInterface,
} from "../../../../interfaces/productInterfaces";
import { baseUrl } from "../../../../vars/baseUrl";

export const createProductThunk = createAsyncThunk(
  "create-product/thunk",
  async (product: ProductFormInterface, thunk) => {
    try {
      const body = JSON.stringify(product);
      const response = await fetch(baseUrl + "products/create", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }

      const productCreated = (await response.json()) as ProductItemList;

      return thunk.fulfillWithValue(productCreated);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const getProductsThunk = createAsyncThunk(
  "get-product/thunk",
  async (option: { page: number; offset: number }, thunk) => {
    try {
      const response = await fetch(
        baseUrl + `products/page/${option.page}/offset/${option.offset}`
      );
      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const products = (await response.json()) as ProductResponseGetInterface;

      return thunk.fulfillWithValue(products.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const delProductsThunk = createAsyncThunk(
  "delete-product/thunk",
  async (idProduct: string, thunk) => {
    try {
      const response = await fetch(baseUrl + `products/delete/${idProduct}`, {
        method: "delete",
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
  async (name: string, thunk) => {
    try {
      const response = await fetch(baseUrl + "products/like/" + name);

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const products = (await response.json()) as ProductResponseGetInterface;

      return thunk.fulfillWithValue(products.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
