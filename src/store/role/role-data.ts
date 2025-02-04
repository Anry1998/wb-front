import { RoleState } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSlice } from "@reduxjs/toolkit";
import {
  addRole,
  deleteRole,
  fetchRoles,
  fetchRoleById,
  fetchUserRoles,
  updateRole,
} from "./api-actions";

const initialState: RoleState = {
  userRoles: null,
  rolesList: null,
  isRoleLoading: false,
  isRolePosting: false,
  hasRoleError: false,
  totalPages: 1,
  currentPage: 1,
};

export const roleData = createSlice({
  name: ReducerName.Role,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserRoles.fulfilled, (state, { payload }) => {
        state.userRoles = payload;
        state.isRoleLoading = false;
      })
      .addCase(fetchRoles.fulfilled, (state, { payload }) => {
        state.rolesList = payload.data;
        state.isRoleLoading = false;
        state.totalPages = payload.totalPages;
        // state.currentPage = payload.currentPage;
      })
      .addCase(fetchRoles.pending, (state) => {
        state.isRoleLoading = true;
      })
      .addCase(addRole.fulfilled, (state, { payload }) => {
        state.rolesList = state.rolesList
          ? [payload, ...state.rolesList]
          : [payload];
        state.isRolePosting = false;
        state.hasRoleError = false;
      })
      .addCase(addRole.pending, (state) => {
        state.isRolePosting = false;
        state.hasRoleError = false;
      })
      .addCase(addRole.rejected, (state) => {
        state.isRolePosting = false;
        state.hasRoleError = true;
      })
      .addCase(fetchRoleById.fulfilled, (state, { payload }) => {
        if (!state.rolesList) {
          return;
        }
        const marketplaceIndex = state.rolesList.findIndex(
          (item) => item.id === payload.id
        );
        if (marketplaceIndex !== -1) {
          state.rolesList[marketplaceIndex] = { ...payload };
        }
        state.isRolePosting = false;
        state.hasRoleError = false;
      })
      .addCase(updateRole.fulfilled, (state) => {
        state.isRolePosting = false;
        state.hasRoleError = false;
      })
      .addCase(updateRole.pending, (state) => {
        state.isRolePosting = false;
        state.hasRoleError = false;
      })
      .addCase(updateRole.rejected, (state) => {
        state.isRolePosting = false;
        state.hasRoleError = true;
      })
      .addCase(deleteRole.fulfilled, (state, { payload }) => {
        if (!state.rolesList || !payload) {
          return;
        }
        state.rolesList = state.rolesList?.filter(
          (item) => item.id !== payload
        );
        state.isRolePosting = false;
        state.hasRoleError = false;
      })
      .addCase(deleteRole.rejected, (state) => {
        state.isRolePosting = false;
        state.hasRoleError = true;
      });
  },
});
