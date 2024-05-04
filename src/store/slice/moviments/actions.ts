import { intense } from "@/utils/intanseAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseRowMovements } from "../../../../interfaces/movimentsInterfaces";

export const movementsRowGet = createAsyncThunk(
  "movements-get/admin",
  async (_none, thunk) => {
    try {
      const response = await intense("movements/row");

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = response.data as ResponseRowMovements;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
