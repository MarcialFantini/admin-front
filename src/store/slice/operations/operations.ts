import { createSlice } from "@reduxjs/toolkit";
import { OperationReducer } from "../../../../interfaces/operationInterfaces";
import { createOperation, deleteOperations, getOperations } from "./actions";

const initialState: OperationReducer = { list: [] };

const operationSlice = createSlice({
  name: "operation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createOperation.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload];
    });
    builder.addCase(getOperations.fulfilled, (state, actions) => {
      state.list = actions.payload;
    });
    builder.addCase(deleteOperations.fulfilled, (state, actions) => {
      state.list = state.list.filter((item) => item.id !== actions.payload);
    });
  },
});

export const {} = operationSlice.actions;

export const operationReducer = operationSlice.reducer;
