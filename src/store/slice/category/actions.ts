import { createAsyncThunk } from "@reduxjs/toolkit";

import { CategoriesResponseInterface } from "../../../../interfaces/categoryInterfaces";
import { intense } from "@/utils/intanseAxios";

export const createCategory = createAsyncThunk(
  "create-category/admin",
  async ({ name, token }: { name: string; token: string }, thunkApi) => {
    try {
      const response = await intense.post(
        "category/create",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
  async (token: string, thunkApi) => {
    try {
      const response = await intense("category/row", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunkApi.rejectWithValue(false);
      }

      const data = response.data as CategoriesResponseInterface;

      return data.data || [];
    } catch (error) {
      return thunkApi.rejectWithValue(false);
    }
  }
);

export const deletedCategory = createAsyncThunk(
  "delete-category/admin",
  async ({ id, token }: { id: string; token: string }, thunkApi) => {
    try {
      const responseDeleted = await intense.delete("category/delete/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (responseDeleted.status !== 200) {
        return thunkApi.rejectWithValue(false);
      }

      return thunkApi.fulfillWithValue(id);
    } catch (error) {
      return thunkApi.rejectWithValue(false);
    }
  }
);
