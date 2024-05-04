import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateOrderThunkReques,
  GetOrderResponseDetails,
  GetOrdersThunkResponse,
} from "../../../../interfaces/ordersInterface";
import { baseUrl } from "../../../../vars/baseUrl";
import { intense } from "@/utils/intanseAxios";

export const createOrderThunk = createAsyncThunk(
  "create-order/admin",
  async (body: CreateOrderThunkReques, thunkApi) => {
    try {
      const newDetails = body.orders.map((item) => {
        return { ...item, place_id: body.place_id };
      });
      const newBody = { idUser: body.idUser, orders: newDetails };

      const bodyStringify = await JSON.stringify(newBody);
      const response = await fetch(baseUrl + "orders/create", {
        body: bodyStringify,
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
      });

      if (response.status !== 201) {
        return thunkApi.rejectWithValue(false);
      }

      return true;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getOrderThunk = createAsyncThunk(
  "get-order/admin",
  async ({ page, limit }: { page: number; limit: number }, thunkApi) => {
    try {
      const response = await fetch(
        baseUrl + `orders/page/${page}/limit/${limit}`
      );

      if (response.status !== 200) {
        return thunkApi.rejectWithValue(response);
      }
      const data = (await response.json()) as GetOrdersThunkResponse;
      return thunkApi.fulfillWithValue(data.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getOrderSelectThunk = createAsyncThunk(
  "get-order-details/admin",
  async (idOrder: string, thunkApi) => {
    try {
      const response = await fetch(baseUrl + "orders/one/" + idOrder);

      if (response.status !== 200) {
        return thunkApi.rejectWithValue(false);
      }

      const data = (await response.json()) as GetOrderResponseDetails;

      return thunkApi.fulfillWithValue(data.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateOrderPlaceThunk = createAsyncThunk(
  "update-order-place",
  async (body: { order_id: string; place_id: string }, thunk) => {
    try {
      const response = await intense.patch("orders/place/update", body);

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      return thunk.fulfillWithValue(true);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
