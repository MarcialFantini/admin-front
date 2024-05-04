import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateUserResponse,
  getUserResponse,
  UserForm,
} from "../../../../interfaces/usersInterfaces";
import { baseUrl } from "../../../../vars/baseUrl";

export const CreateUserThunk = createAsyncThunk(
  "create-user/admin",
  async (form: UserForm, thunk) => {
    try {
      const body = JSON.stringify(form);
      const response = await fetch(baseUrl + "users/create", {
        body,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }
      const data = (await response.json()) as CreateUserResponse;
      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const GetUsersPageThunk = createAsyncThunk(
  "get-users-page/admin",
  async ({ page, offset }: { page: number; offset: number }, thunk) => {
    try {
      const response = await fetch(
        baseUrl + `users/page/${page}/offset/${offset}`
      );

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = (await response.json()) as getUserResponse;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const deleteUsersThunk = createAsyncThunk(
  "delete-user/admin",
  async (id: string, thunk) => {
    try {
      const response = await fetch(baseUrl + "users/delete/" + id, {
        method: "delete",
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
