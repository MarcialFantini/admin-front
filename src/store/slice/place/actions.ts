import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../../vars/baseUrl";
import {
  PlaceItemInterface,
  responsePlaceGet,
} from "../../../../interfaces/placeInterfaces";

export const createPlaceThunk = createAsyncThunk(
  "create-place/admin",
  async (name: string, thunk) => {
    try {
      const body = JSON.stringify({ name });

      const response = await fetch(baseUrl + "place/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }

      const data = (await response.json()) as PlaceItemInterface;

      return thunk.fulfillWithValue(data);
    } catch (error) {
      return thunk.rejectWithValue(false);
    }
  }
);

export const getPlaceThunk = createAsyncThunk(
  "get-place/admin",
  async (_text: string, thunk) => {
    try {
      const response = await fetch(baseUrl + "place/rows");
      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = (await response.json()) as responsePlaceGet;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const deletePlaceThunk = createAsyncThunk(
  "delete-place/admin",
  async (id: string, thunk) => {
    try {
      const response = await fetch(baseUrl + "place/delete/" + id, {
        method: "DELETE",
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
