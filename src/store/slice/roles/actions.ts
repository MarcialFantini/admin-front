import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../../vars/baseUrl";
import {
  GetRolesResponse,
  responseCategoryNormal,
  responseRolesSections,
  RolesResponseCreateInterface,
  rolesSectionsInterface,
} from "../../../../interfaces/rolesInterfaces";

export const createRolesThunk = createAsyncThunk(
  "create-role/admin",
  async (name: string, thunk) => {
    try {
      const body = JSON.stringify({ name });
      const response = await fetch(baseUrl + "roles/create", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }

      const data = (await response.json()) as RolesResponseCreateInterface;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const delRoleThunk = createAsyncThunk(
  "delete-role/admin",
  async (id: string, thunk) => {
    try {
      const response = await fetch(baseUrl + "roles/delete/" + id, {
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
export const getRoleThunk = createAsyncThunk(
  "get-roles/admin",
  async (num: number, thunk) => {
    try {
      const response = await fetch(baseUrl + "roles/row");
      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }
      const data = (await response.json()) as GetRolesResponse;

      return thunk.fulfillWithValue(data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const getAllSections = createAsyncThunk(
  "get-all-sections/admin",
  async (_name, thunk) => {
    try {
      const response = await fetch(baseUrl + "/roles/sections/all");

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = (await response.json()) as responseCategoryNormal;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const createSectionRole = createAsyncThunk(
  "create-sections-role/admin",
  async (roleSectionCreate: rolesSectionsInterface, thunk) => {
    try {
      const body = await JSON.stringify(roleSectionCreate);

      const response = await fetch(baseUrl + "/roles/sections/create", {
        method: "post",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) {
        return thunk.rejectWithValue(false);
      }

      const data = (await response.json()) as responseCategoryNormal;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const getAllSectionsOffRole = createAsyncThunk(
  "get-all-sections-off-role/admin",
  async (idRole: string, thunk) => {
    try {
      const response = await fetch(
        baseUrl + "/roles/sections/sections/" + idRole
      );

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = (await response.json()) as responseRolesSections;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const deleteSectionsOffRole = createAsyncThunk(
  "delete-sections-off-role/admin",
  async (idRole: string, thunk) => {
    try {
      const response = await fetch(
        baseUrl + "/roles/sections/delete/" + idRole,
        { method: "delete" }
      );

      if (response.status !== 200) {
        return thunk.rejectWithValue(false);
      }

      const data = (await response.json()) as responseRolesSections;

      return thunk.fulfillWithValue(data.data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
