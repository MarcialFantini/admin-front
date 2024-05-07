import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  PlaceItemInterface,
  responsePlaceGet,
} from "../../../../interfaces/placeInterfaces";
import { intense } from "@/utils/intanseAxios";

export const createPlaceThunk = createAsyncThunk(
  "create-place/admin",
  async ({ token, name }: { token: string; name: string }, thunk) => {
    try {
      const response = await intense.post(
        "place/create",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }

      const data = response.data as PlaceItemInterface;

      return thunk.fulfillWithValue(data);
    } catch (error) {
      return thunk.rejectWithValue(false);
    }
  }
);

export const getPlaceThunk = createAsyncThunk(
  "get-place/admin",
  async (token: string, thunk) => {
    try {
      const response = await intense("place/rows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = response.data as responsePlaceGet;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const deletePlaceThunk = createAsyncThunk(
  "delete-place/admin",
  async ({ id, token }: { id: string; token: string }, thunk) => {
    try {
      const response = await intense.delete("place/delete/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      return thunk.fulfillWithValue(true);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
