import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateOrderThunkReques,
  GetOrderResponseDetails,
  GetOrdersThunkResponse,
} from "../../../../interfaces/ordersInterface";

import { intense } from "@/utils/intanseAxios";

export const createOrderThunk = createAsyncThunk(
  "create-order/admin",
  async (
    { body, token }: { body: CreateOrderThunkReques; token: string },
    thunkApi
  ) => {
    try {
      const newDetails = body.orders.map((item) => {
        return { ...item, place_id: body.place_id };
      });
      const newBody = {
        place_id: body.place_id,
        orders: newDetails,
      };

      const response = await intense.post("orders/create", newBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  async (
    { page, limit, token }: { page: number; limit: number; token: string },
    thunkApi
  ) => {
    try {
      const response = await intense(`orders/page/${page}/limit/${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunkApi.rejectWithValue(response);
      }
      const data = response.data as GetOrdersThunkResponse;
      return thunkApi.fulfillWithValue(data.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getOrderSelectThunk = createAsyncThunk(
  "get-order-details/admin",
  async ({ idOrder, token }: { idOrder: string; token: string }, thunkApi) => {
    try {
      const response = await intense("orders/one/" + idOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunkApi.rejectWithValue(false);
      }

      const data = response.data as GetOrderResponseDetails;

      return thunkApi.fulfillWithValue(data.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateOrderPlaceThunk = createAsyncThunk(
  "update-order-place",
  async (
    {
      body,
      token,
    }: { body: { order_id: string; place_id: string }; token: string },
    thunk
  ) => {
    try {
      const response = await intense.patch("orders/place/update", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      return thunk.fulfillWithValue(body.place_id);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const deleteOrderThunk = createAsyncThunk(
  "delete-order/admin",
  async ({ id, token }: { id: string; token: string }, thunk) => {
    try {
      const response = await intense.delete("orders/delete", {
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
