import { intense } from "@/utils/intanseAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  OperationCreate,
  OperationGet,
} from "../../../../interfaces/operationInterfaces";

export const createOperation = createAsyncThunk(
  "create-operation-admin",
  async (
    { body, token }: { body: { name: string }; token: string },
    thunkApi
  ) => {
    try {
      const newOperation = await intense.post<OperationCreate>(
        "operations/create",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (newOperation.status !== 201) {
        return thunkApi.rejectWithValue(false);
      }
      console.log(newOperation);
      const data = newOperation.data.data;

      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(false);
    }
  }
);

export const getOperations = createAsyncThunk(
  "get-operations-admin",
  async (token: string, thunk) => {
    try {
      const response = await intense.get<OperationGet>("operations/page", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      return thunk.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const deleteOperations = createAsyncThunk(
  "delete-operations-admin",
  async ({ id, token }: { id: string; token: string }, thunk) => {
    try {
      const response = await intense.delete("operations/delete/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }
      return thunk.fulfillWithValue(id);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const setOperationsOrder = createAsyncThunk(
  "set-operation-admin",
  async (
    {
      body,
      token,
    }: { body: { idOperation: string; idOrder: string }; token: string },
    thunkApi
  ) => {
    try {
      const response = await intense.patch("orders/operation/change", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunkApi.rejectWithValue(false);
      }

      return thunkApi.fulfillWithValue(body);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
