import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../../vars/baseUrl";

export const createCategory = createAsyncThunk(
  "create-category/admin",
  async (name: string, thunkApi) => {
    try {
      const body = JSON.stringify({ name });
      const response = await fetch(baseUrl + "category/create", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.status !== 201) {
        return thunkApi.rejectWithValue(false);
      }

      return thunkApi.fulfillWithValue(true);
    } catch (error) {
      return thunkApi.rejectWithValue(false);
    }
  }
);

export const getCategory = createAsyncThunk(
  "get-category/admin",
  async (name: string, thunkApi) => {
    try {
      const response = await fetch(baseUrl + "category/row");

      if (response.status !== 200) {
        thunkApi.rejectWithValue(false);
      }

      const data = (await response.json()) as unknown as string[];

      return data || [];
    } catch (error) {
      return thunkApi.rejectWithValue(false);
    }
  }
);
