import { State } from "@/types/state.type";
import { User } from "@/types/user.interface";
import { AuthorizationStatus, ReducerName } from "@/utils/constant";

export const getAuthStatus = (state: Pick<State, ReducerName.User>): AuthorizationStatus => state[ReducerName.User].authStatus;
export const getHasAuthError = (state: Pick<State, ReducerName.User>): boolean => state[ReducerName.User].hasAuthError;
export const getAuthLoading = (state: Pick<State, ReducerName.User>): boolean => state[ReducerName.User].isAuthLoading;
export const getUser = (state: Pick<State, ReducerName.User>): User | null => state[ReducerName.User].user;
export const getUserId = (state: Pick<State, ReducerName.User>): number | null => state[ReducerName.User].user?.id ?? null;
