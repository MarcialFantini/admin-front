import { intense } from "@/utils/intanseAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  OperationCreate,
  OperationGet,
} from "../../../../interfaces/operationInterfaces";

export const createOperation = createAsyncThunk(
  "create-operation-admin",
  async (body: { name: string }, thunkApi) => {
    try {
      const newOperation = await intense.post<OperationCreate>(
        "operations/create",
        body
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
  async (_hola, thunk) => {
    try {
      const response = await intense.get<OperationGet>("operations/page");

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
  async (id: string, thunk) => {
    try {
      const response = await intense.delete("operations/delete/" + id);

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }
      return thunk.fulfillWithValue(id);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
