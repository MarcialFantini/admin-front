import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateUserResponse,
  getUserResponse,
  ResponseDataLogin,
  UserForm,
} from "../../../../interfaces/usersInterfaces";

import { intense } from "@/utils/intanseAxios";

export const CreateUserThunk = createAsyncThunk(
  "create-user/admin",
  async ({ form, token }: { form: UserForm; token: string }, thunk) => {
    try {
      const response = await intense.post("users/create", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }
      const data = response.data as CreateUserResponse;
      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const GetUsersPageThunk = createAsyncThunk(
  "get-users-page/admin",
  async (
    { page, offset, token }: { page: number; offset: number; token: string },
    thunk
  ) => {
    try {
      const response = await intense(`users/page/${page}/offset/${offset}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = response.data as getUserResponse;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const deleteUsersThunk = createAsyncThunk(
  "delete-user/admin",
  async ({ id, token }: { id: string; token: string }, thunk) => {
    try {
      const response = await intense.delete("users/delete/" + id, {
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

export const logInUserThunk = createAsyncThunk(
  "login-user/admin",
  async ({ password, email }: { password: string; email: string }, thunk) => {
    try {
      const response = await intense.post("login/create", { password, email });

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const token = response.data as ResponseDataLogin;

      return thunk.fulfillWithValue(token.data.token);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const validTokenThunk = createAsyncThunk(
  "valid-token-thunk",
  async (token: string, thunk) => {
    try {
      const response = await intense.post("login/valid", {
        token,
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
