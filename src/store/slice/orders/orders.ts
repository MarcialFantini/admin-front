import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialStateOrderInterface,
  OrdersCarName,
} from "../../../../interfaces/ordersInterface";
import {
  createOrderThunk,
  deleteOrderThunk,
  getOrderSelectThunk,
  getOrderThunk,
  OrdersHomeThunk,
  updateOrderPlaceThunk,
} from "./actions";
import { setOperationsOrder } from "../operations/actions";

const initialState: InitialStateOrderInterface = {
  newOrder: [],
  list: [],
  orderSelected: {
    id: "",
    client_id: "",
    operation_id: "",
    place: "",

    details: [],
  },
  ordersHome: [],
};

export const OrdersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrdersCarName>) => {
      state.newOrder = [...state.newOrder, action.payload];
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.newOrder = state.newOrder.filter(
        (item) => item.product_id !== action.payload
      );
    },

    reset: (state) => {
      state.newOrder = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {});
    builder.addCase(createOrderThunk.rejected, (state, action) => {
      console.log(action.error);
    });

    builder.addCase(getOrderThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(getOrderSelectThunk.fulfilled, (state, action) => {
      state.orderSelected = action.payload;
    });

    builder.addCase(setOperationsOrder.fulfilled, (state, action) => {
      state.orderSelected.operation_id = action.payload.idOperation;
    });

    builder.addCase(updateOrderPlaceThunk.fulfilled, (state, action) => {
      state.orderSelected.place = action.payload;
    });

    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    });

    builder.addCase(OrdersHomeThunk.fulfilled, (state, action) => {
      state.ordersHome = action.payload;
    });
  },
});

export const orderReducer = OrdersSlice.reducer;
export const { addOrder, deleteOrder, reset } = OrdersSlice.actions;
