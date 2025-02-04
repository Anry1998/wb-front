import { Marketplace } from "@/types/company.interface";
import { PagesData } from "@/types/data-meta.interface";
import { State } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSelector } from "@reduxjs/toolkit";

export const getMarketplaces = (
  state: Pick<State, ReducerName.Marketplace>
): Marketplace[] | null => state[ReducerName.Marketplace].marketplaces;
export const selectMarketplaceId = (
  _state: Pick<State, ReducerName.Marketplace>,
  id?: number
): number | null => (id ? +id : null);
export const getHasMarketplaceError = (
  state: Pick<State, ReducerName.Marketplace>
): boolean => state[ReducerName.Marketplace].hasMarketplaceError;
export const getMarketplacePosting = (
  state: Pick<State, ReducerName.Marketplace>
): boolean => state[ReducerName.Marketplace].isMarketplacePosting;
export const getMarketplacesLoading = (
  state: Pick<State, ReducerName.Marketplace>
): boolean => state[ReducerName.Marketplace].isMarketplacesLoading;
export const getCurrentMarketplacePage = (
  state: Pick<State, ReducerName.Marketplace>
): number => state[ReducerName.Marketplace].currentPage;
export const getTotalMarketplacePage = (
  state: Pick<State, ReducerName.Marketplace>
): number => state[ReducerName.Marketplace].totalPages;
export const getMarketplacePages = createSelector(
  [getCurrentMarketplacePage, getTotalMarketplacePage],
  (currentPage, totalPages): PagesData => ({ currentPage, totalPages })
);

export const geMarketplaceById = createSelector(
  [getMarketplaces, selectMarketplaceId],
  (
    marketplaces: Marketplace[] | null,
    id: number | null
  ): Marketplace | null => {
    if (marketplaces && id) {
      return marketplaces.find((item) => item.id === id) || null;
    }
    return null;
  }
);
