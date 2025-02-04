import { PagesData } from "@/types/data-meta.interface";
import { State } from "@/types/state.type";
import { UserPermission, UserRole } from "@/types/user.interface";
import { ReducerName } from "@/utils/constant";
import { createSelector } from "@reduxjs/toolkit";

export const getAllRoles = (
  state: Pick<State, ReducerName.Role>
): UserRole[] | null => state[ReducerName.Role].rolesList;
export const getUserRoles = (
  state: Pick<State, ReducerName.Role>
): UserRole[] | null => state[ReducerName.Role].userRoles;

export const getHasRoleError = (
  state: Pick<State, ReducerName.Role>
): boolean => state[ReducerName.Role].hasRoleError;
export const getRolePosting = (state: Pick<State, ReducerName.Role>): boolean =>
  state[ReducerName.Role].isRolePosting;
export const getRolesLoading = (
  state: Pick<State, ReducerName.Role>
): boolean => state[ReducerName.Role].isRoleLoading;
export const getCurrentRolePage = (
  state: Pick<State, ReducerName.Role>
): number => state[ReducerName.Role].currentPage;
export const getTotalRolePage = (
  state: Pick<State, ReducerName.Role>
): number => state[ReducerName.Role].totalPages;
export const getRolePages = createSelector(
  [getCurrentRolePage, getTotalRolePage],
  (currentPage, totalPages): PagesData => ({ currentPage, totalPages })
);

export const getAllPermissions = createSelector(
  getAllRoles,
  (roles: UserRole[] | null): UserPermission[] => {
    if (roles) {
      const allPermissions = roles.flatMap((role) => role.permissions);
      const uniquePermissions = new Set(
        allPermissions.map((permission) => JSON.stringify(permission))
      );
      return Array.from(uniquePermissions).map((permissionString) =>
        JSON.parse(permissionString)
      );
    }
    return [];
  }
);

export const getAllUserPermissions = createSelector(
  getUserRoles,
  (roles: UserRole[] | null): UserPermission[] => {
    if (roles) {
      const allPermissions = roles.flatMap((role) => role.permissions);
      const uniquePermissions = new Set(
        allPermissions.map((permission) => JSON.stringify(permission))
      );
      return Array.from(uniquePermissions).map((permissionString) =>
        JSON.parse(permissionString)
      );
    }
    return [];
  }
);
