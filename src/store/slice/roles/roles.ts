import { createSlice } from "@reduxjs/toolkit";
import {
  createRolesThunk,
  createSectionRole,
  deleteSectionsOffRole,
  delRoleThunk,
  getAllSections,
  getAllSectionsOffRole,
  getRoleThunk,
} from "./actions";
import { RolesStateReducer } from "../../../../interfaces/rolesInterfaces";

const initialState: RolesStateReducer = {
  list: [],
  sections: [],
  sectionsByRole: [],
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRolesThunk.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload];
    });
    builder.addCase(getRoleThunk.fulfilled, (state, action) => {
      state.list = action.payload.data;
    });
    builder.addCase(delRoleThunk.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    });
    builder.addCase(getAllSections.fulfilled, (state, action) => {
      state.sections = action.payload;
    });
    builder.addCase(createSectionRole.fulfilled, (state, action) => {});
    builder.addCase(getAllSectionsOffRole.fulfilled, (state, action) => {
      console.log(action.payload);
      state.sectionsByRole = action.payload;
    });
    builder.addCase(deleteSectionsOffRole.fulfilled, (state, action) => {});
  },
});

export const rolesReducer = rolesSlice.reducer;

export const {} = rolesSlice.actions;
