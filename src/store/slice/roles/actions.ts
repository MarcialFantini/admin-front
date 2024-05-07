import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  GetRolesResponse,
  responseCategoryNormal,
  responseRolesSections,
  RolesResponseCreateInterface,
  rolesSectionsInterface,
} from "../../../../interfaces/rolesInterfaces";
import { intense } from "@/utils/intanseAxios";

export const createRolesThunk = createAsyncThunk(
  "create-role/admin",
  async ({ name, token }: { name: string; token: string }, thunk) => {
    try {
      const response = await intense.post(
        "roles/create",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }

      const data = response.data as RolesResponseCreateInterface;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const delRoleThunk = createAsyncThunk(
  "delete-role/admin",
  async ({ id, token }: { id: string; token: string }, thunk) => {
    try {
      const response = await intense.delete("roles/delete/" + id, {
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
export const getRoleThunk = createAsyncThunk(
  "get-roles/admin",
  async (token: string, thunk) => {
    try {
      const response = await intense("roles/row", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }
      const data = response.data as GetRolesResponse;

      return thunk.fulfillWithValue(data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const getAllSections = createAsyncThunk(
  "get-all-sections/admin",
  async (token: string, thunk) => {
    try {
      const response = await intense("/roles/sections/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = response.data as responseCategoryNormal;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const createSectionRole = createAsyncThunk(
  "create-sections-role/admin",
  async (
    {
      token,
      roleSectionCreate,
    }: { roleSectionCreate: rolesSectionsInterface; token: string },
    thunk
  ) => {
    try {
      const response = await intense.post(
        "/roles/sections/create",

        roleSectionCreate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }

      const data = response.data as responseCategoryNormal;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const getAllSectionsOffRole = createAsyncThunk(
  "get-all-sections-off-role/admin",
  async ({ idRole, token }: { idRole: string; token: string }, thunk) => {
    try {
      const response = await intense("/roles/sections/sections/" + idRole, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = response.data as responseRolesSections;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const deleteSectionsOffRole = createAsyncThunk(
  "delete-sections-off-role/admin",
  async ({ idRole, token }: { idRole: string; token: string }, thunk) => {
    try {
      const response = await intense.delete(
        "/roles/sections/delete/" + idRole,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = response.data as responseRolesSections;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
