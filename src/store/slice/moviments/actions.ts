import { intense } from "@/utils/intanseAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseRowMovements } from "../../../../interfaces/movimentsInterfaces";

export const movementsRowGet = createAsyncThunk(
  "movements-get/admin",
  async (token: string, thunk) => {
    try {
      const response = await intense("movements/row", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
